"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import SubHeader from "@/components/ui/SubHeader";
import AboutUsGlobe from "@/public/assets/images/about-us-globe.webp";

const ContactUsPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
    emailFormat: false,
  });

  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
      emailFormat: name === "email" ? false : errors.emailFormat,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: formValues.name === "",
      email: formValues.email === "",
      message: formValues.message === "",
      emailFormat: !emailRegex.test(formValues.email),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      console.log("Form Values:", formValues);
      // You can add further form submission logic here (e.g., send data to server)
    }
  };

  return (
    <>
      <SubHeader heading={"Contact Us"} />
      <Box padding={4} paddingBottom={0}>
        {isMobScreen ? (
          <>
            <Box paddingX={4}>
              <Typography fontWeight="bold" variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We'd love to hear from you! Please fill out the form below to get
                in touch with us.
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  error={errors.name}
                  helperText={errors.name ? "Name is required" : ""}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={errors.email || errors.emailFormat}
                  helperText={
                    errors.email
                      ? "Email is required"
                      : errors.emailFormat
                      ? "Email is not valid"
                      : ""
                  }
                />
                <TextField
                  fullWidth
                  label="Message"
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  error={errors.message}
                  helperText={errors.message ? "Message is required" : ""}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </form>
            </Box>
            <Box flex={1} marginTop={4}>
              <Image
                src={AboutUsGlobe}
                alt="about us globe"
                layout="responsive"
                width={600}
                height={400}
              />
            </Box>
          </>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box flex={1} paddingRight={4}>
              <Typography fontWeight="bold" variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We'd love to hear from you! Please fill out the form below to get
                in touch with us.
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  error={errors.name}
                  helperText={errors.name ? "Name is required" : ""}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={errors.email || errors.emailFormat}
                  helperText={
                    errors.email
                      ? "Email is required"
                      : errors.emailFormat
                      ? "Email is not valid"
                      : ""
                  }
                />
                <TextField
                  fullWidth
                  label="Message"
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  error={errors.message}
                  helperText={errors.message ? "Message is required" : ""}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </form>
            </Box>
            <Box flex={1}>
              <Image
                src={AboutUsGlobe}
                alt="about us globe"
                layout="responsive"
                width={600}
                height={400}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ContactUsPage;
