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
  Paper,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
  }, [user, navigate]);

  useEffect(() => {
    if (isEdit) {
      const getBookings = async () => {
        const response = await axios.get(
          `http://192.168.0.106:4000/api/hall/booking?id=${id}`
        );
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

    if (new Date(formData.startTime) < new Date()) {
      toast.error("Please select a valid date and time");
      return;
    }
    if (formData.startTime > formData.endTime) {
      toast.error("Start time should be less than end time");
      return;
    }

    try {
      if (isEdit) {
        await axios.put(
          `http://192.168.0.106:4000/api/hall/booking?id=${id}`,
          formData
        );
        toast.success("Booking Updated");
      } else {
        await axios.post(
          "http://192.168.0.106:4000/api/hall/booking",
          formData
        );
        toast.success("Booking Successful");
      }
    } catch (error) {
      if (error.response?.status === 409)
        toast.error("Booked already exists in that time");
      else toast.error("Booking failed");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="md">
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
          <Typography component="h1" variant="h5">
            {isEdit ? "Edit Booking" : "Booking Form"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
                >
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      name="startTime"
                      label="Start Time"
                      onChange={(date) =>
                        setFormData({ ...formData, startTime: date })
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          sx={{
                            mb: 2,
                            "& .MuiInputBase-root": { borderRadius: 2 },
                          }}
                        />
                      )}
                      required
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      name="endTime"
                      label="End Time"
                      onChange={(date) =>
                        setFormData({ ...formData, endTime: date })
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          sx={{
                            mb: 2,
                            "& .MuiInputBase-root": { borderRadius: 2 },
                          }}
                        />
                      )}
                      required
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="purpose"
                  label="Purpose"
                  fullWidth
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                  sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                    sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
              sx={{
                mt: 3,
                mb: 2,
                padding: 1.5,
                fontSize: "1rem",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              }}
            >
              {isEdit ? "Update Booking" : "Book"}
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default BookingForm;
