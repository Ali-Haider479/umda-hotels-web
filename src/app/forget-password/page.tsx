"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import hotelBackground from "@/public/assets/images/hotel-bg.jpg";
import UmdaLogo from "@/public/assets/icons/logo.svg";
import "../login/login.css"
import { useState } from "react";

const ForgetPasswordPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");
  const isMobHeight = useMediaQuery("(max-height: 500px)");

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
  });

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setErrors({ email: false });

    if (!email) {
      setErrors({ email: true });
      setErrorMessage("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: true });
      setErrorMessage("Invalid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccessMessage("A password reset link has been sent to your email.");
      } else {
        setErrorMessage(data.message || "Failed to send password reset link.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while sending the password reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isMobScreen ? (
        <div
          style={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${hotelBackground.src})`,
          }}
        >
          <nav className="login-navbar">
            <Link href={"/"} className="navbar-link">
              <Image
                src={UmdaLogo}
                alt="Umda Company Logo"
                className="umda-hotel-logo"
              />
              <p
                className="navbar-text"
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Umda Hotels
              </p>
            </Link>
          </nav>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 80px)", // Adjust height for mobile view
              overflow: "auto",
            }}
          >
            <Card sx={{ maxWidth: "90%", padding: 5, paddingTop: isMobHeight ? 15 : 0 }}>
              <CardHeader
                title={"Forgot Password"}
                titleTypographyProps={{ textAlign: "center" }}
              />
              <Divider />
              <CardContent>
                <Box paddingBottom={5}>
                  <Typography textAlign={"center"}>
                    Forgot your password?
                  </Typography>
                  <Typography textAlign={"center"}>
                    Enter your email to receive a password reset link.
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  helperText={
                    errors.email
                      ? email.length === 0
                        ? "Email is required"
                        : "Invalid email address"
                      : ""
                  }
                />
              </CardContent>
              <CardActions
                sx={{ justifyContent: "center", flexDirection: "column" }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ marginBottom: 2 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Continue"}
                </Button>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
                {successMessage && (
                  <Typography color="success" variant="body2">
                    {successMessage}
                  </Typography>
                )}
              </CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%", // Ensures the Box takes full width
                  margin: "8px 0", // Adjust spacing around the box
                  gap: 1,
                }}
              >
                <Typography>Already have an account?</Typography>
                <Link
                  href={"/login"}
                  style={{ color: "black", fontWeight: "bolder", paddingTop: 3 }}
                >
                  Log In
                </Link>
              </Box>
            </Card>
          </Box>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${hotelBackground.src})`,
          }}
        >
          <nav className="login-navbar">
            <Link href={"/"} className="navbar-link">
              <Image
                src={UmdaLogo}
                alt="Umda Company Logo"
                className="umda-hotel-logo"
              />
              <p
                className="navbar-text"
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Umda Hotels
              </p>
            </Link>
          </nav>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh", // Take at least full viewport height
            }}
          >
            <Card sx={{ maxWidth: "50%", padding: 5 }}>
              <CardHeader
                title={"Forgot Password"}
                titleTypographyProps={{ textAlign: "center" }}
              />
              <Divider />
              <CardContent>
                <Box paddingBottom={5}>
                  <Typography textAlign={"center"}>
                    Forgot your password?
                  </Typography>
                  <Typography textAlign={"center"}>
                    Enter your email to receive a password reset link.
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  helperText={
                    errors.email
                      ? email.length === 0
                        ? "Email is required"
                        : "Invalid email address"
                      : ""
                  }
                />
              </CardContent>
              <CardActions
                sx={{ justifyContent: "center", flexDirection: "column" }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ marginBottom: 2 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Continue"}
                </Button>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
                {successMessage && (
                  <Typography color="success" variant="body2">
                    {successMessage}
                  </Typography>
                )}
              </CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%", // Ensures the Box takes full width
                  margin: "8px 0", // Adjust spacing around the box
                  gap: 1,
                }}
              >
                <Typography>Already have an account?</Typography>
                <Link
                  href={"/login"}
                  style={{ color: "black", fontWeight: "bolder", paddingTop: 3 }}
                >
                  Log In
                </Link>
              </Box>
            </Card>
          </Box>
        </div>
      )}
    </>
  );
};

export default ForgetPasswordPage;
