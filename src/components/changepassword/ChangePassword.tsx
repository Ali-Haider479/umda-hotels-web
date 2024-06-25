"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ChangePassword = () => {
  const { data: session } = useSession();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const handlePasswordChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData({ ...passwordData, [prop]: event.target.value });
    };
  const togglePasswordVisibility = (
    fieldName: "currentPassword" | "newPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const validatePasswordForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (passwordData.currentPassword === "") {
      newErrors.currentPassword = true;
      valid = false;
    } else {
      newErrors.currentPassword = false;
    }

    if (passwordData.newPassword === "") {
      newErrors.newPassword = true;
      valid = false;
    } else {
      newErrors.newPassword = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const updatePassword = async () => {
    if (!session || !session.user) {
      alert("User session not found.");
      return;
    }

    if (validatePasswordForm()) {
      const passwordUpdateData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };

      try {
        const response = await fetch(`/api/users/${session.user.id}/password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordUpdateData),
        });

        if (response.ok) {
          alert("Password updated successfully.");
        } else {
          const data = await response.json();
          alert(`Failed to update password: ${data.message}`);
        }
      } catch (error) {
        console.error("Error updating password:", error);
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" fontWeight={"bold"} gutterBottom>
        Change Password
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="currentPassword"
            label="Current Password"
            variant="outlined"
            type={showPassword.currentPassword ? "text" : "password"}
            value={passwordData.currentPassword}
            onChange={handlePasswordChange("currentPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                  >
                    {showPassword.currentPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.currentPassword}
            helperText={
              errors.currentPassword ? "Current Password is required" : ""
            }
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
            helperText={errors.newPassword ? "New Password is required" : ""}
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={updatePassword}>
        Update Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
