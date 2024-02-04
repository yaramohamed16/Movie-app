//Contact
import React from "react";
import CustomAppBar from "./CustomAppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
const Contact = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar navItems={["Home", "About", "Contact"]} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
      </Box>
    </Box>
  );
};

export default Contact;
