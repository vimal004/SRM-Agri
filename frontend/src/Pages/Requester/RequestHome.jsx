import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RequestHome = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={4}
      textAlign="center" // Ensures all text and buttons are centered
      sx={{ marginTop: "-15vh" }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        component="h1"
        color="black"
        fontWeight="bold"
        mb={4}
      >
        Request Home
      </Typography>

      {/* Buttons */}
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        {/* Request Resources Button */}
        <Link to="/requestresources" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "10px",
              "&:hover": {
                bgcolor: "#333",
              },
            }}
          >
            Request Resources
          </Button>
        </Link>

        {/* Check Approval Status Button */}
        <Link to="/checkapproval" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "10px",
              "&:hover": {
                bgcolor: "#333",
              },
            }}
          >
            Check Approval Status
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RequestHome;
