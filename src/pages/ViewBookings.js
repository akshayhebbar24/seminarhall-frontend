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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    userName: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    userType: "Faculty",
    startTime: "2023-06-01T10:00",
    endTime: "2023-06-01T12:00",
    purpose: "Meeting",
    noOfAttendees: 5,
    specialRequirement: "Projector",
    status: "Booked",
  },
  {
    id: 2,
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
    userType: "Student",
    startTime: "2023-06-02T14:00",
    endTime: "2023-06-02T16:00",
    purpose: "Conference",
    noOfAttendees: 20,
    specialRequirement: "Microphone",
    status: "Completed",
  },
  {
    id: 2,
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
    userType: "Student",
    startTime: "2023-06-02T14:00",
    endTime: "2023-06-02T16:00",
    purpose: "Conference",
    noOfAttendees: 20,
    specialRequirement: "Microphone",
    status: "Cancelled",
  },
];

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/booking");
    }
  }, [user]);

  useEffect(() => {
    const getBookings = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/hall/booking"
      );
      setBookings(response.data.data);
    };
    getBookings();
    // setBookings(mockBookings);
  }, []);

  const handleEdit = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete?");
      if (!isConfirmed) {
        return;
      }
      await axios.delete(`http://localhost:4000/api/hall/booking?id=${id}`);
      let updatedRecord = bookings.filter((booking) => booking._id !== id);
      setBookings(updatedRecord);
      alert("Record Deleted");
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
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          <TableContainer component={Paper}>
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
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ViewBookings;
