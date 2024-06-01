import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h5: {
      fontWeight: 700,
    },
    h6: {
      color: "#757575",
    },
  },
});

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/booking");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getBookings = async () => {
      const response = await axios.get(
        "http://192.168.0.106:4000/api/hall/booking"
      );
      setBookings(response.data.data);
    };
    getBookings();
    // setBookings(mockBookings);
  }, []);

  const handleEdit = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleDelete = (id) => {
    toast(() => (
      <div style={{ textAlign: "center" }}>
        <p>Do you want to delete this record?</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => confirmDelete(id)}
          style={{ marginRight: "8px" }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toast.dismiss()}
        >
          No
        </Button>
      </div>
    ));
  };

  const confirmDelete = async (id) => {
    try {
      toast.dismiss();
      await axios.delete(`http://192.168.0.106:4000/api/hall/booking?id=${id}`);
      let updatedRecord = bookings.filter((booking) => booking._id !== id);
      setBookings(updatedRecord);
      toast.success("Record Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "blue";
      case "Completed":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "black";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            elevation={6}
            sx={{
              mt: 8,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                View Bookings
              </Typography>

              {bookings.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No Bookings found
                </Typography>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="bookings table">
                    <TableHead>
                      <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Purpose</TableCell>
                        <TableCell>No. of Attendees</TableCell>
                        <TableCell>Special Requirement</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings?.map((booking) => (
                        <TableRow key={booking._id}>
                          <TableCell>{booking.fullName}</TableCell>
                          <TableCell>{booking.email}</TableCell>
                          <TableCell>{booking.phone}</TableCell>
                          <TableCell>{booking.userType}</TableCell>
                          <TableCell>{formatDate(booking.startTime)}</TableCell>
                          <TableCell>{formatDate(booking.endTime)}</TableCell>
                          <TableCell>{booking.purpose}</TableCell>
                          <TableCell>{booking.noOfAttendees}</TableCell>
                          <TableCell>{booking.specialRequirement}</TableCell>
                          <TableCell
                            style={{ color: getStatusColor(booking.status) }}
                          >
                            {booking.status}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEdit(booking._id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(booking._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Paper>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default ViewBookings;
