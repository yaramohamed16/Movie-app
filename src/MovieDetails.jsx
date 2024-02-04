import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { CircularProgress, Box, TextField, Button } from "@mui/material";
import CustomAppBar from "./CustomAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

const posterURL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [emptyCommentError, setEmptyCommentError] = useState(false);
  const commentInputRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=9813ce01a72ca1bd2ae25f091898b1c7`
        );
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddCommentClick = useCallback(() => {
    setShowCommentInput(true);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  const handleCommentSubmit = useCallback(() => {
    if (comment.trim() === "") {
      // Display an error message if the comment is empty
      setEmptyCommentError(true);
      return;
    }

    const newComment = {
      id: new Date().getTime(),
      text: comment,
    };

    setComments((prevComments) => [...prevComments, newComment]);
    setComment("");
    setShowCommentInput(false);
    setEmptyCommentError(false);
  }, [comment]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar navItems={["Home", "About", "Contact"]} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={movieDetails.title}
                image={`${posterURL}${movieDetails.poster_path}`}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {movieDetails.title}
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Overview:
                </Typography>
                <Typography variant="body1" paragraph>
                  {movieDetails.overview}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Release Date: {movieDetails.release_date}
                </Typography>
              </CardContent>
            </Card>
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleAddCommentClick}
                sx={{
                  backgroundColor: "#774caf",
                  "&:hover": {
                    backgroundColor: "#6737a5",
                  },
                }}
              >
                Add Comment
              </Button>
              {showCommentInput && (
                <Box mt={2}>
                  <TextField
                    label="Your Comment"
                    variant="outlined"
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    inputRef={commentInputRef}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    mt={2}
                    sx={{
                      backgroundColor: "#774caf",
                      mt:1,
                      "&:hover": {
                        backgroundColor: "#6737a5",
                      },

                    }}
                  >
                    Submit
                  </Button>
                  {emptyCommentError && (
                    <span style={{ color: "red", marginLeft: "1rem" ,marginTop: 3}}>
                      Cannot add an empty comment.
                    </span>
                  )}
                </Box>
              )}
              {comments.length > 0 && (
                <Box mt={2}>
                  <Typography variant="h6">Comments:</Typography>
                  <ul>
                    {comments.map((c) => (
                      <li key={c.id}>{c.text}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MovieDetails;
