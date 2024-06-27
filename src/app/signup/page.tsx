"use client";

import Link from "next/link";
import Image from "next/image";
import "./signup.css";


import hotelBackground from "@/public/assets/images/hotel-bg.jpg";
import UmdaLogo from "@/public/assets/icons/logo.svg";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");
  const isMobHeight = useMediaQuery("(max-height: 750px)");
  const isFormHeight = useMediaQuery("(max-height:500px)")
  

  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

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
  const handleRegister = async () => {
    const firstNameError = formData.firstName.length === 0;
    const lastNameError = formData.lastName.length === 0;
    const emailError =
      formData.email.length === 0 || !validateEmail(formData.email);
    const passwordError = formData.password.length === 0;

    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError,
    });

    if (!firstNameError && !lastNameError && !emailError && !passwordError) {
      console.log("Sending data:", formData);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON response:", err);
      }

      if (res.ok) {
        router.push("/login");
      } else {
        setErrorMessage(data.message || "An error occurred");
      }
    } else {
      setErrorMessage("Please fill in all fields correctly.");
    }
  };

  return (
    <>
      {isMobScreen ? (
        <div
          style={{
            height: isFormHeight ? "max-content" :  "100vh",
            backgroundSize: "inherit",
            backgroundImage: `url(${hotelBackground.src})`,
            backgroundPosition: "cover"
          }}
        >
          <nav className="signup-navbar">
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
              height: isMobScreen && isMobHeight ? "500px" : "700px",
              overflow: "auto",
            }}
          >
            <Card sx={{ maxWidth: "90%", padding: 5 , paddingTop : isMobHeight ? 18 : 0}}>
              <CardHeader
                title={"Register"}
                titleTypographyProps={{ textAlign: "center" }}
              />
              <Divider />
              <CardContent>
                <Box paddingBottom={5}>
                  <Typography textAlign={"center"}>
                    Welcome to Umda Hotels
                  </Typography>
                  <Typography textAlign={"center"}>Create an Account!</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginBottom: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    id="first-name"
                    label="First Name"
                    variant="outlined"
                    sx={{ width: "calc(50% - 8px)" }}
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    error={errors.firstName}
                    helperText={errors.firstName ? "First Name is required" : ""}
                  />
                  <TextField
                    fullWidth
                    id="last-name"
                    label="Last Name"
                    variant="outlined"
                    sx={{ width: "calc(50% - 8px)" }}
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    error={errors.lastName}
                    helperText={errors.lastName ? "Last Name is required" : ""}
                  />
                </Box>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
                  value={formData.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                  helperText={
                    errors.email
                      ? formData.email.length === 0
                        ? "Email is required"
                        : "Invalid email address"
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
                  error={errors.password}
                  helperText={errors.password ? "Password is required" : ""}
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
                  onClick={handleRegister}
                >
                  Continue
                </Button>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
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
                {providers ? (
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<GoogleIcon />}
                    sx={{ marginTop: 2 }}
                    key={"Google"}
                    onClick={() => {
                      signIn("google");
                    }}
                  >
                    Continue with Google
                  </Button>
                ) : (
                  <CircularProgress />
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
          <nav className="signup-navbar">
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
                title={"Register"}
                titleTypographyProps={{ textAlign: "center" }}
              />
              <Divider />
              <CardContent>
                <Box paddingBottom={5}>
                  <Typography textAlign={"center"}>
                    Welcome to Umda Hotels
                  </Typography>
                  <Typography textAlign={"center"}>Create an Account!</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginBottom: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    id="first-name"
                    label="First Name"
                    variant="outlined"
                    sx={{ width: "calc(50% - 8px)" }}
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    error={errors.firstName}
                    helperText={errors.firstName ? "First Name is required" : ""}
                  />
                  <TextField
                    fullWidth
                    id="last-name"
                    label="Last Name"
                    variant="outlined"
                    sx={{ width: "calc(50% - 8px)" }}
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    error={errors.lastName}
                    helperText={errors.lastName ? "Last Name is required" : ""}
                  />
                </Box>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
                  value={formData.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                  helperText={
                    errors.email
                      ? formData.email.length === 0
                        ? "Email is required"
                        : "Invalid email address"
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
                  error={errors.password}
                  helperText={errors.password ? "Password is required" : ""}
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
                  onClick={handleRegister}
                >
                  Continue
                </Button>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
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
                {providers ? (
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<GoogleIcon />}
                    sx={{ marginTop: 2 }}
                    key={"Google"}
                    onClick={() => {
                      signIn("google");
                    }}
                  >
                    Continue with Google
                  </Button>
                ) : (
                  <CircularProgress />
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

export default SignUpPage;
