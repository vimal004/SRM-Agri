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
} from "@mui/material";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [loginType, setLoginType] = useState(""); // "approver" or "requester"

  const handleClickOpen = (type) => {
    setLoginType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginType("");
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
            onClick={() => handleClickOpen("approver")}
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
            onClick={() => handleClickOpen("requester")}
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
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "12px" }}
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
            onClick={handleClose}
            color="primary"
            sx={{ borderRadius: "12px", fontWeight: "bold" }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
