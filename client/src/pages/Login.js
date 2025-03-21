import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/auth/login", { email, password });
      toast.success("Login Successfully 🎉");
      localStorage.setItem("authToken", true);
      navigate("/");
    } catch (err) {
      console.log(error);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
      setTimeout(() => setError(""), 5000);
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
      <Box
        width={isNotMobile ? "40%" : "90%"}
        p="2.5rem"
        borderRadius={8}
        sx={{ boxShadow: 6 }}
        backgroundColor="#FFFFFF" // White form container
      >
        <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h3"
            sx={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}
          >
            Sign In
          </Typography>
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
              backgroundColor: "#1976D2",
              "&:hover": { backgroundColor: "#1565C0" },
            }}
          >
            Sign In
          </Button>
          <Typography mt={3} sx={{ fontSize: "1.2rem", color: "#333" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1565C0", fontWeight: "bold" }}>
              Please Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
