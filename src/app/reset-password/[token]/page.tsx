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
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import hotelBackground from "@/public/assets/images/hotel-bg.jpg";
import UmdaLogo from "@/public/assets/icons/logo.svg";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface User {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  address?: string;
  image?: string;
  newsletterSub?: boolean;
  isAdmin?: boolean;
  isVerified?: boolean;
  verificationCode?: number;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResetPasswordPage = ({ params }: any) => {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.token }),
        });

        if (!res.ok) {
          throw new Error("Failed to verify token");
        }

        const data = await res.json();
        console.log("Token verified:", data);
        setUserData(data);
      } catch (error) {
        console.error("Token verification error:", error);
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [params.token]);

  const handlePasswordChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData({ ...passwordData, [prop]: event.target.value });
    };
  const togglePasswordVisibility = (
    fieldName: "confirmPassword" | "newPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const validatePasswordForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (passwordData.confirmPassword === "") {
      newErrors.confirmPassword = true;
      valid = false;
    } else {
      newErrors.confirmPassword = false;
    }

    if (passwordData.newPassword === "") {
      newErrors.newPassword = true;
      valid = false;
    } else {
      newErrors.newPassword = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.newPassword = true;
      newErrors.confirmPassword = true;
      setErrorMessage("Passwords do not match");
      valid = false;
    } else {
      setErrorMessage("");
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validatePasswordForm()) return;

    if (!userData) {
      setErrorMessage("User data is not available. Please try again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.token,
          userId: userData._id,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccessMessage(
        "Password has been reset successfully. Redirecting to the login page..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            title={"Reset Password"}
            titleTypographyProps={{ textAlign: "center" }}
          />
          <Divider />
          {tokenValid ? (
            <CardContent>
              <Box paddingBottom={5}>
                <Typography textAlign={"center"}>
                  Enter your new password to access your account.
                </Typography>
              </Box>
              <TextField
                fullWidth
                id="newPassword"
                label="New Password"
                variant="outlined"
                type={showPassword.newPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange("newPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => togglePasswordVisibility("newPassword")}
                      >
                        {showPassword.newPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.newPassword}
                helperText={
                  errors.newPassword ? "New Password is required" : ""
                }
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange("confirmPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? "Confirm Password is required" : ""
                }
                sx={{ marginBottom: "16px" }}
              />
            </CardContent>
          ) : (
            <CardContent>
              <Typography color="error" textAlign="center">
                Invalid or expired token. Please request a new password reset.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Link href={"/forget-password"}>
                  <Button variant="contained" color="primary">
                    Forget Password
                  </Button>
                </Link>
              </Box>
            </CardContent>
          )}
          {tokenValid && (
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
                <Typography color="green" variant="body2">
                  {successMessage}
                </Typography>
              )}
            </CardActions>
          )}
        </Card>
      </Box>
    </div>
  );
};

export default ResetPasswordPage;
