import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  // useTheme,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast"; // Importing toast

const Register = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/auth/register", { username, email, password });
      toast.success("User Registered Successfully 🎉"); // Success toast
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      toast.error(errorMessage); // Error toast
    }
  };

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#E3F2FD" }} // Light blue background
    >
      <Toaster position="top-right" reverseOrder={false} /> {/* Toast Container */}
      <Box
        width={isNotMobile ? "40%" : "90%"}
        p="2.5rem"
        borderRadius={8}
        sx={{ boxShadow: 6 }}
        backgroundColor="#FFFFFF" // White form container
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" sx={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
            Sign Up
          </Typography>
          <TextField
            label="Username"
            required
            margin="normal"
            fullWidth
            value={username}
            InputLabelProps={{ style: { fontSize: "1.1rem" } }}
            InputProps={{ style: { fontSize: "1.1rem" } }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            required
            margin="normal"
            fullWidth
            value={email}
            InputLabelProps={{ style: { fontSize: "1.1rem" } }}
            InputProps={{ style: { fontSize: "1.1rem" } }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            margin="normal"
            fullWidth
            value={password}
            InputLabelProps={{ style: { fontSize: "1.1rem" } }}
            InputProps={{ style: { fontSize: "1.1rem" } }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              color: "white",
              mt: 3,
              backgroundColor: "#1976D2", // Deep blue button
              "&:hover": { backgroundColor: "#1565C0" }, // Darker blue hover effect
            }}
          >
            Sign Up
          </Button>
          <Typography mt={3} sx={{ fontSize: "1.2rem", color: "#333" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1565C0", fontWeight: "bold" }}>
              Please Login
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
