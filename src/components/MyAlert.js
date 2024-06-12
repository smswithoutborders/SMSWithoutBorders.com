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
        background: "#dbe8e1",
        color: "#034687",
        padding: "12px 24px",
        textAlign: "center",
        zIndex: 1000,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "8px",
        border: "2px solid #00478f",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="body1"
        component="span"
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          lineHeight: "1.5",
          marginRight: "12px",
          flex: "1",
        }}
      >
         🎉  🎉  🎉   <strong>  Evolving, not changing!  </strong>   🎉 🎉 🎉  <br />
        <strong>SMSWithoutBorders </strong> is now <strong>RelaySMS </strong> <Link href="https://blog.smswithoutborders.com/" color="#ff3d33" underline="always" target="_blank">
          Learn More
        </Link>
      </Typography>

      <IconButton size="small" onClick={handleClose}>
        <CloseIcon sx={{ color: "#090a0e" }} />
      </IconButton>
    </Box>
  ) : null;
};

export default MyAlert;
