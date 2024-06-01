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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login.png";
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

const Login = () => {
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.0.106:4000/api/user/login",
        formData
      );
      localStorage.setItem("user", response.data.data);
      toast.success("Login Successful");
      navigate("/booking");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  React.useEffect(() => {
    if (user) {
      navigate("/booking");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                backgroundImage: `url(${loginImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: { sm: 8 },
                borderBottomLeftRadius: { sm: 8 },
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
                  Welcome Back!
                </Typography>
                <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
                  Please login to continue
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
                    sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                    sx={{ mb: 2, "& .MuiInputBase-root": { borderRadius: 2 } }}
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
                    Login
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Register"}
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

export default Login;
