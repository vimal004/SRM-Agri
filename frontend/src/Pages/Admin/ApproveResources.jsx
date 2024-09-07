import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const ApproveResources = () => {
  const [resourceRequests, setResourceRequests] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch resource requests when component mounts
  useEffect(() => {
    axios
      .get("https://srm-agri.onrender.com/resource/all")
      .then((response) => {
        setResourceRequests(response.data); // Assuming the response returns an array of resource requests
      })
      .catch((error) => {
        console.error("Error fetching resource requests:", error);
        setSnackbarMessage("Failed to fetch resource requests.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  }, []);

  const handleApprove = (id) => {
    axios
      .post(`https://srm-agri.onrender.com/resource/approve/${id}`)
      .then((response) => {
        setSnackbarMessage("Request approved successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setResourceRequests((prev) =>
          prev.filter((request) => request._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error approving request:", error);
        setSnackbarMessage("Failed to approve request.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleReject = (id) => {
    axios
      .post(`https://srm-agri.onrender.com/resource/reject/${id}`)
      .then((response) => {
        setSnackbarMessage("Request rejected successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setResourceRequests((prev) =>
          prev.filter((request) => request._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
        setSnackbarMessage("Failed to reject request.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Approve Resource Requests
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", padding: "20px", borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field Number</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Crop</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Men Count</TableCell>
              <TableCell>Women Count</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceRequests.length > 0 ? (
              resourceRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.fieldNumber}</TableCell>
                  <TableCell>{request.area}</TableCell>
                  <TableCell>{request.crop}</TableCell>
                  <TableCell>{request.details}</TableCell>
                  <TableCell>{request.menCount}</TableCell>
                  <TableCell>{request.womenCount}</TableCell>
                  <TableCell>{request.count}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 2 }}
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align="center" variant="body1">
                    No resource requests available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApproveResources;
