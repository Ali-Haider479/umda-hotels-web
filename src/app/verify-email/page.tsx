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
  styled,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import hotelBackground from "@/public/assets/images/hotel-bg.jpg";
import UmdaLogo from "@/public/assets/icons/only-logo.png";
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  max-width: 500px;
  margin-inline: auto;

  & input {
    width: 40px;
    height: 40px;
    margin: 0 5px;
    text-align: center;
    font-size: 16px;
  }
`;

const VerifyEmailPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendButtonLoading, setResendButtonLoading] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const validateChar = (character: string, index: number): boolean => {
    const isValid = /^[0-9]$/.test(character);
    return isValid;
  };

  const handleResendCode = async () => {
    setResendButtonLoading(true);
    // Logic to resend the code
    const session = await getSession();
    console.log(session);
    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/resend-code`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.accepted) {
        setResendButtonLoading(false);
        setErrorMessage("A new code has been sent to your email.");
      }
    } catch (error) {
      setResendButtonLoading(false);
      setErrorMessage("An error occurred while verifying the code");
    }
  };

  const handleVerifyCode = async () => {
    if (value === "") {
      setErrorMessage("Please enter the verification code.");
      return;
    }

    const session = await getSession();
    console.log(session);

    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/verify-email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode: value,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage(data.message || "Failed to verify code");
      }
    } catch (error) {
      setErrorMessage("An error occurred while verifying the code");
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
            className="umda-hotel-only-logo"
          />
          <p
            className="navbar-text"
            style={{ fontSize: 21, fontWeight: "bold", color: "white" }}
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
            title={"Verify Code"}
            titleTypographyProps={{ textAlign: "center", fontWeight: "bold" }}
          />
          <Divider />
          <CardContent>
            <Box paddingBottom={5}>
              <Typography textAlign={"center"} variant="h6">
                Welcome Back
              </Typography>
              <Typography
                textAlign={"center"}
                variant="body2"
                sx={{ margin: "0 auto", maxWidth: 400 }}
              >
                Login to your account to continue your reservation at Umda
                Hotels. Please enter the verification code sent to your email
                address.
              </Typography>
            </Box>
            <MuiOtpInputStyled
              gap={2}
              value={value}
              onChange={handleChange}
              length={5}
              autoFocus
              validateChar={validateChar}
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
              onClick={handleVerifyCode}
            >
              Verify
            </Button>
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
          </CardActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              margin: "8px 0",
            }}
          >
            <Typography variant="body2">Didn't receive the code?</Typography>
            <LoadingButton
              loading={resendButtonLoading}
              loadingPosition="start"
              variant="text"
              onClick={handleResendCode}
              sx={{ paddingX: 4, paddingY: 1.5, minWidth: "auto" }}
            >
              Resend Code
            </LoadingButton>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default VerifyEmailPage;
