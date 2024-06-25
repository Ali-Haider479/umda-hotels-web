"use client";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

const VerifyAccountAlert = () => {
  const { data: sessionContent } = useSession();
  const [message, setMessage] = useState<string>("");
  const [resendButtonLoading, setResendButtonLoading] = useState(false);
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
        setMessage("A new code has been sent to your email.");
      }
    } catch (error) {
      setResendButtonLoading(false);
      setMessage("An error occurred while verifying the code");
    }
  };
  if (sessionContent) {
    return <></>;
  } else {
    return (
      <Box
        sx={{
          backgroundColor: "#ffebee",
          border: "1px solid #ff1744",
          borderRadius: "4px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="bold"
          color="#d32f2f"
        >
          Verify Your Account
        </Typography>
        <Typography variant="body1" textAlign="center" marginBottom="8px">
          Your account is not verified yet. Please verify your email address to
          get full access to all features.
        </Typography>
        <Typography variant="body2" textAlign="center" marginBottom="16px">
          If you didn't receive the verification email, you can request a new
          one by clicking the button below.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            loading={resendButtonLoading}
            loadingPosition="start"
            variant="contained"
            color="primary"
            onClick={handleResendCode}
            sx={{ paddingX: 4, paddingY: 1.5, minWidth: "auto" }}
          >
            Resend Code
          </LoadingButton>
        </Box>
        {message && (
          <Typography
            color="textSecondary"
            variant="body2"
            textAlign="center"
            marginTop="16px"
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }
};

export default VerifyAccountAlert;
