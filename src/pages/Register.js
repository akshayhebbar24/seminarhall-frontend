import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import registerImage from "../assets/register.png";
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
    h4: {
      fontWeight: 700,
    },
    h6: {
      color: "#757575",
    },
  },
});

const Register = () => {
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.cpassword) {
        toast.error("Password mismatch");
        return;
      }
      delete formData.cpassword;
      await axios.post("http://192.168.0.106:4000/api/user/register", formData);
      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) toast.error("User already exists");
      else toast.error("Registration failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (user) {
      navigate("/booking");
    }
  }, [user, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ marginTop: "100px", height: "80vh" }}
      >
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{ display: "flex", borderRadius: 2, height: "100%" }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                backgroundImage: `url(${registerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <Grid
              item
              xs={12}
              sm={6}
              component={Box}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ padding: 4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Create an Account
                </Typography>
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  Please fill in the details
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    autoFocus
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
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
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    }}
                  >
                    Register
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/" variant="body2">
                        {"Already have an account? Login"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
