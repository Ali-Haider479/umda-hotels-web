"use client";

import Link from "next/link";
import Image from "next/image";
import "./login.css";

import hotelBackground from "@/public/assets/images/hotel-bg.jpg";
import UmdaLogo from "@/public/assets/icons/logo.svg";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const isMobHeight = useMediaQuery("(max-height: 750px)");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (prop: string) => (event: { target: { value: any } }) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  return (
    <>
    {isMobScreen ? (<div
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
          height : isMobScreen && isMobHeight ? "500px"  : "700px",
          overflow:"auto"
        }}
      >
        <Card sx={{ maxWidth: "70%", padding: 5 }}>
          <CardHeader
            title={"Login"}
            titleTypographyProps={{ textAlign: "center" }}
          />
          <Divider />
          <CardContent>
            <Box paddingBottom={5}>
              <Typography textAlign={"center"}>Welcome Back</Typography>
              <Typography textAlign={"center"}>
                Login to your Account!
              </Typography>
            </Box>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              sx={{ marginBottom: "16px" }}
              value={formData.email}
              onChange={handleChange("email")}
              error={
                !validateEmail(formData.email) && formData.email.length > 0
              }
              helperText={
                !validateEmail(formData.email) && formData.email.length > 0
                  ? "Invalid email address"
                  : ""
              }
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: "16px" }}
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
            >
              Continue
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%", // Ensures the Box takes full width
                margin: "8px 0", // Adjust spacing around the box
              }}
            >
              <Divider sx={{ flexGrow: 1 }} />{" "}
              {/* This allows the divider to grow and fill the space */}
              <Typography sx={{ mx: 2 }}>or</Typography>{" "}
              {/* Margin on both sides of the text */}
              <Divider sx={{ flexGrow: 1 }} />{" "}
              {/* This allows the divider to grow and fill the space */}
            </Box>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<GoogleIcon />}
              sx={{ marginTop: 2 }}
            >
              Continue with Google
            </Button>
          </CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%", // Ensures the Box takes full width
              margin: "8px 15px", // Adjust spacing around the box
              gap: 1,
            }}
          >
            <Typography>Didn't have an Account?</Typography>
            <Link
              href={"/signup"}
              style={{ color: "black", fontWeight: "bolder", paddingTop: 3 }}
            >
              Create an Account
            </Link>
          </Box>
        </Card>
      </Box>
    </div>) : (<div
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
            title={"Login"}
            titleTypographyProps={{ textAlign: "center" }}
          />
          <Divider />
          <CardContent>
            <Box paddingBottom={5}>
              <Typography textAlign={"center"}>Welcome Back</Typography>
              <Typography textAlign={"center"}>
                Login to your Account!
              </Typography>
            </Box>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              sx={{ marginBottom: "16px" }}
              value={formData.email}
              onChange={handleChange("email")}
              error={
                !validateEmail(formData.email) && formData.email.length > 0
              }
              helperText={
                !validateEmail(formData.email) && formData.email.length > 0
                  ? "Invalid email address"
                  : ""
              }
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: "16px" }}
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
            >
              Continue
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%", // Ensures the Box takes full width
                margin: "8px 0", // Adjust spacing around the box
              }}
            >
              <Divider sx={{ flexGrow: 1 }} />{" "}
              {/* This allows the divider to grow and fill the space */}
              <Typography sx={{ mx: 2 }}>or</Typography>{" "}
              {/* Margin on both sides of the text */}
              <Divider sx={{ flexGrow: 1 }} />{" "}
              {/* This allows the divider to grow and fill the space */}
            </Box>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<GoogleIcon />}
              sx={{ marginTop: 2 }}
            >
              Continue with Google
            </Button>
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
            <Typography>Didn't have an Account?</Typography>
            <Link
              href={"/signup"}
              style={{ color: "black", fontWeight: "bolder", paddingTop: 3 }}
            >
              Create an Account
            </Link>
          </Box>
        </Card>
      </Box>
    </div>)}
    </>
  );
};

export default LoginPage;