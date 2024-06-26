"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const PersonalDetails = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    telephone: false,
    address: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (session && session.user && session.user.id) {
        const response = await fetch(`/api/users/${session.user.id}`);
        const data = await response.json();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          telephone: data.telephone || "",
          address: data.address || "",
        });
      }
    };
    fetchUser();
  }, [session]);

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (formData.firstName === "") {
      newErrors.firstName = true;
      valid = false;
    } else {
      newErrors.firstName = false;
    }

    if (formData.lastName === "") {
      newErrors.lastName = true;
      valid = false;
    } else {
      newErrors.lastName = false;
    }

    if (formData.email === "") {
      newErrors.email = true;
      valid = false;
    } else {
      newErrors.email = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const updateUser = async () => {
    if (!session || !session.user) {
      alert("User session not found.");
      return;
    }

    if (validateForm()) {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        telephone: formData.telephone,
        address: formData.address,
      };

      console.log(updatedData);

      try {
        const response = await fetch(`/api/users/${session.user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          alert("User information updated successfully.");
        } else {
          const data = await response.json();
          alert(`Failed to update user information: ${data.message}`);
        }
      } catch (error) {
        console.error("Error updating user information:", error);
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Personal details
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="first-name"
            label="First Name"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            error={errors.firstName}
            helperText={errors.firstName ? "First Name is required" : ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="last-name"
            label="Last Name"
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            helperText={errors.lastName ? "Last Name is required" : ""}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputMask
            mask="+\92 999 9999999"
            value={formData.telephone}
            onChange={handleChange("telephone")}
          >
            {/* @ts-ignore */}
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                id="telephone"
                label="Telephone"
                variant="outlined"
                error={errors.telephone}
                helperText={errors.telephone ? "Invalid telephone number" : ""}
              />
            )}
          </InputMask>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="address"
            label="Address"
            variant="outlined"
            value={formData.address}
            onChange={handleChange("address")}
            error={errors.address}
            helperText={errors.address ? "Invalid address" : ""}
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={updateUser}>
        Update Profile
      </Button>
    </Box>
  );
};

export default PersonalDetails;
