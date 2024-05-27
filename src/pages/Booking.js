import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "",
    startTime: "",
    endTime: "",
    purpose: "",
    noOfAttendees: "",
    specialRequirement: "",
    status: "Booked",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (isEdit) {
      const getBookings = async () => {
        const response = await axios.get(
          `http://localhost:4000/api/hall/booking?id=${id}`
        );
        console.log(response.data.data);
        setFormData(response.data.data);
      };
      getBookings();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (isEdit) {
      try {
        await axios.put(
          `http://localhost:4000/api/hall/booking?id=${id}`,
          formData
        );
        alert("Booking Updated");
      } catch (error) {
        console.error(error);
      }
    } else {
      if (new Date(formData.startTime) < new Date()) {
        alert("Please select a valid date and time");
        return;
      }
      if(formData.startTime > formData.endTime) {
        alert("Start time should be less than end time");
        return;
      }
      try {
        await axios.post("http://localhost:4000/api/hall/booking", formData);
        alert("Booking Successfull");
      } catch (error) {
        if(error.response.status === 409) alert('Booked already exists in that time');
        else alert('Booking failed');
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {isEdit ? "Edit Booking" : "Booking Form"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="userType"
                  label="User Type"
                  select
                  fullWidth
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="startTime"
                  label="Start Time"
                  type="datetime-local"
                  fullWidth
                  value={formData.startTime}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  disabled = {isEdit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="endTime"
                  label="End Time"
                  type="datetime-local"
                  fullWidth
                  value={formData.endTime}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  disabled = {isEdit}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="purpose"
                  label="Purpose"
                  fullWidth
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="noOfAttendees"
                  label="Number of Attendees"
                  type="number"
                  fullWidth
                  value={formData.noOfAttendees}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="specialRequirement"
                  label="Special Requirement"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.specialRequirement}
                  onChange={handleChange}
                />
              </Grid>
              {isEdit && (
                <Grid item xs={12}>
                  <TextField
                    name="status"
                    label="Status"
                    select
                    fullWidth
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Booked">Booked</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </TextField>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {isEdit ? "Update Booking" : "Book"}
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BookingForm;
