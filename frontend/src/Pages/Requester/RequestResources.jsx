import React, { useState } from "react";
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
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const RequestResources = () => {
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Initialize with an empty string
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleAddRow = () => {
    setRecords([
      ...records,
      {
        fieldNumber: "",
        area: "",
        crop: "",
        details: "",
        menCount: 0,
        womenCount: 0,
        count: 0,
        date: selectedDate, // Use the selected date for each record
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRecords = [...records];
    updatedRecords[index][field] = value;

    // Automatically update the total count when menCount or womenCount changes
    if (field === "menCount" || field === "womenCount") {
      updatedRecords[index].count =
        parseInt(updatedRecords[index].menCount, 10) +
        parseInt(updatedRecords[index].womenCount, 10);
    }

    setRecords(updatedRecords);
  };

  const handleSendRequest = () => {
    axios
      .post("https://srm-agri.onrender.com/resource/add", records)
      .then((response) => {
        console.log(response.data);
        setSnackbarMessage("Request sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true); // Open Snackbar on success
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMessage("Failed to send request. Try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true); // Open Snackbar on error
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Request Resources
        </Typography>
      </Box>

      {/* Date Picker */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Select Date</Typography>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} // Update selected date
          variant="outlined"
          size="small"
          sx={{ width: "200px", mt: 1 }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
          onClick={handleAddRow}
        >
          + Add Row
        </Button>
      </Box>

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
              <TableCell>Details of Operation</TableCell>
              <TableCell>Men Count</TableCell>
              <TableCell>Women Count</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={record.fieldNumber}
                    onChange={(e) =>
                      handleInputChange(index, "fieldNumber", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={record.area}
                    onChange={(e) =>
                      handleInputChange(index, "area", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={record.crop}
                    onChange={(e) =>
                      handleInputChange(index, "crop", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={record.details}
                    onChange={(e) =>
                      handleInputChange(index, "details", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={record.menCount}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "menCount",
                        parseInt(e.target.value, 10)
                      )
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={record.womenCount}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "womenCount",
                        parseInt(e.target.value, 10)
                      )
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={record.count}
                    variant="outlined"
                    size="small"
                    disabled // Total is calculated, so disable input here
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
          onClick={handleSendRequest}
        >
          Send Request
        </Button>
      </Box>

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

export default RequestResources;
