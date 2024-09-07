import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [loginType, setLoginType] = useState(""); // "approver" or "requester"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success"); // "success" or "error"

  const navigate = useNavigate();

  const handleClickOpen = (type) => {
    setLoginType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginType("");
  };

  const handleLogin = async () => {
    console.log("Logging in...");
    console.log("Email:", email);
    console.log("Password length:", password.length); // For debugging

    try {
      // Determine the endpoint based on login type
      const url =
        loginType === "approver"
          ? "https://srm-agri.onrender.com/auth/adminlogin"
          : "https://srm-agri.onrender.com/auth/userlogin";

      // Send both email and password in the request body
      const response = await axios.post(url, {
        email: email,
        password: password, // Add password here
      });

      if (response.data.success) {
        setSnackbarMessage("Login successful!");
        setSnackbarVariant("success");

        // Redirect based on login type
        if (loginType === "approver") {
          navigate("/admin");
        } else {
          navigate("/requester");
        }
      } else {
        setSnackbarMessage("Login failed. Please try again.");
        setSnackbarVariant("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarVariant("error");
    } finally {
      setSnackbarOpen(true);
      handleClose();
    }
  };


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="white"
      p={4}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "-40vh" }} // Adjust this value to move content up or down
      >
        <Typography
          variant="h2"
          component="h1"
          color="black"
          fontWeight="bold"
          mb={4}
          textAlign="center"
        >
          Authorize Yourself!
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "grey.800",
              },
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "16px",
            }}
            onClick={() => {
              handleClickOpen("approver");
              console.log("Approver Login");
            }}
          >
            Approver Login
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "grey.800",
              },
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "16px",
            }}
            onClick={() => {
              handleClickOpen("requester");
              console.log("Requester Login");
            }}
          >
            Requester Login
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid #e0e0e0",
            paddingBottom: "16px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {loginType === "approver" ? "Approver Login" : "Requester Login"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "12px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "12px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            paddingTop: "16px",
            paddingBottom: "8px",
          }}
        >
          <Button
            onClick={handleClose}
            color="primary"
            sx={{ borderRadius: "12px", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            color="primary"
            sx={{ borderRadius: "12px", fontWeight: "bold" }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarVariant}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
