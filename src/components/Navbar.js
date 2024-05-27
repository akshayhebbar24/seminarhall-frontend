import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const isConfirmed = window.confirm('Do you want to logout?');
    if(!isConfirmed) {
        return;
    }
    alert('Logout Successfull');
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, flexGrow: 1, justifyContent: "flex-start" }}
          >
            Seminar Hall Booking
          </IconButton>
          <Button color="inherit" onClick={() => navigate("/booking")}>
            Book Hall
          </Button>
          <Button color="inherit" onClick={() => navigate("/view-booking")}>
            View Booking
          </Button>
          <Button
            color="inherit"
            sx={{ bgcolor: "red", "&:hover": { bgcolor: "red" } }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
