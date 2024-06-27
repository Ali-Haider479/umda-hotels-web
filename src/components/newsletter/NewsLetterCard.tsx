"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import UmdaLogo from "@/public/assets/icons/logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NoEncryption } from "@mui/icons-material";

const NewsLetterCard = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={isMobScreen ? 0 : 4} // padding to add some spacing inside the outer box
      sx={{
        border: isMobScreen ? "1px solid #ccc" : "2px solid #ccc", // 1px border on mobile, 2px on larger screens
        borderRadius: "8px", // Border radius for rounded corners
        width: isMobScreen ? "98%" : "100%", // Width 98% on mobile, 100% on larger screens
        maxWidth: "900px", // Maximum width for the card
        margin: "0 auto", // Center the card horizontally
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobScreen ? "column" : "row"}
        alignItems="center"
        justifyContent="center"
        mt={isMobScreen ? 2 : 5}
        mb={isMobScreen ? 2 : 4} // margin bottom to add space between the two inner boxes
        width="100%"
        textAlign={isMobScreen ? "center" : "left"}
      >
        <Image
          src={UmdaLogo}
          alt="Umda Company Logo"
          className="umda-hotel-logo"
        />
        <Box textAlign={isMobScreen ? "center" : "left"} ml={isMobScreen ? 0 : 2} mt={isMobScreen ? 2 : 0}>
          <Typography variant="h6" fontWeight={"bold"}>
            Get access to exclusive deals
          </Typography>
          <Typography variant="subtitle1">
            Only the best deals reach your inbox
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={isMobScreen ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding= "30px"
      >
        <TextField
          label="Your Email"
          placeholder="e.g., john@email.com"
          sx={{ width: isMobScreen ? "50%" : "400px", mb: isMobScreen ? 2 : 0 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            height: isMobScreen ? "auto" : "100%",
            paddingTop: isMobScreen ? "12px" : "14px",
            paddingBottom: isMobScreen ? "15px" : "14px",
            width: isMobScreen ? "80%" : "auto",
            ml: isMobScreen ? 0 : 2,
          }}
        >
          Notify
        </Button>
      </Box>
    </Box>
  );
};

export default NewsLetterCard;
