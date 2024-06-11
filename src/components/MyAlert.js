import React, { useState } from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
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
        background: "linear-gradient(90deg, #ff4081, #f50057)",
        color: "white",
        padding: "12px 24px",
        textAlign: "center",
        zIndex: 1000,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography 
        variant="body1" 
        component="span" 
        sx={{ 
          fontFamily: "'Roboto', sans-serif",
          fontSize: "1rem",
          fontWeight: 500,
          marginRight: "8px"
        }}
      >
        We have rebranded! SMSWithoutBorders is now RelaySMS. Visit our new website at{" "}
        <Link href="https://relaysms.com" color="inherit" underline="always" target="_blank">
          relaysms.com
        </Link>.
      </Typography>
      <IconButton 
        size="small" 
        onClick={handleClose} 
        sx={{ 
          color: "white", 
          padding: "4px" 
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  ) : null;
};

export default MyAlert;
