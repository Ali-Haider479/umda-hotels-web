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
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  useSession,
  getSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const isMobHeight = useMediaQuery("(max-height: 750px)");
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      console.log("Response", res);
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

  const handleLogIn = async () => {
    const emailError =
      formData.email.length === 0 || !validateEmail(formData.email);
    const passwordError = formData.password.length === 0;

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      console.log(res);

      if (res && res.ok) {
        setErrorMessage("");

        const session = await getSession();
        console.log(session);

        if (session && session.user.isVerified) {
          router.push("/");
        } else {
          router.push("/verify-email");
        }
      } else if (res && res.error) {
        setErrorMessage(res.error);
      }
    } else {
      // Set an appropriate error message
      setErrorMessage("Please fill in all fields correctly.");
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
              height: isMobScreen && isMobHeight ? "500px" : "700px",
              overflow: "auto",
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
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    paddingTop: 3,
                  }}
                >
                  Create an Account
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
                  onClick={handleLogIn}
                >
                  Continue
                </Button>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}

                <Link href="/forget-password" passHref>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ marginBottom: 1 }}
                  >
                    Forgot Password?
                  </Button>
                </Link>
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
                <Typography>Didn't have an Account?</Typography>
                <Link
                  href={"/signup"}
                  style={{
                    color: "black",
                    fontWeight: "bolder",
                    paddingTop: 3,
                  }}
                >
                  Create an Account
                </Link>
              </Box>
            </Card>
          </Box>
        </div>
      )}
    </>
  );
};

export default LoginPage;
