import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Booking";
import ViewBookings from "./pages/ViewBookings";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/booking/:id" element={<Bookings />} />
          <Route path="/view-booking" element={<ViewBookings />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
