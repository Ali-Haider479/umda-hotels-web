"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import SubHeader from "@/components/ui/SubHeader";
import AboutUsGlobe from "@/public/assets/images/about-us-globe.webp";
import { LoadingButton } from "@mui/lab";

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

  const isMobScreen = useMediaQuery("(max-width: 950px)");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string>("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setButtonLoading(true);
      console.log("Form Values:", formValues);
      // You can add further form submission logic here (e.g., send data to server)
      try {
        const response = await fetch(`/api/send-mail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (response.ok) {
          setServerMessage(data.message || "Form submitted successfully.");
          setFormValues({ name: "", email: "", message: "" });
        } else {
          setServerMessage(data.message || "Failed to submit the form.");
        }

        setButtonLoading(false);
      } catch (error) {
        setServerMessage(
          "An error occurred while submitting the form. Please try again."
        );

        setButtonLoading(false);
      }
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
                We'd love to hear from you! Please fill out the form below to
                get in touch with us.
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
            <Box flex={1} marginTop={4} sx={{marginBottom: isMobScreen ? "70px" : "0px" }}>
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex={1} paddingRight={4}>
              <Typography fontWeight="bold" variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We'd love to hear from you! Please fill out the form below to
                get in touch with us.
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
                {serverMessage && (
                  <div style={{ color: "green" }}>{serverMessage}</div>
                )}
                <LoadingButton
                  loading={buttonLoading}
                  loadingIndicator="Loading…"
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Submit
                </LoadingButton>
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
