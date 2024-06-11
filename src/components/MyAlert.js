import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MyAlert = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return visible ? (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "#f50057", // Adjust the color as needed
        color: "white",
        padding: "8px 16px",
        textAlign: "center",
        zIndex: 1000, // Ensure it stays above other elements
      }}
    >
      <Typography variant="body1" component="span">
        This is an important announcement!
      </Typography>
      <IconButton 
        size="small" 
        onClick={handleClose} 
        sx={{ color: "white", marginLeft: "8px" }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  ) : null;
};

export default MyAlert;
