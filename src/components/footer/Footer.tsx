"use client";

import {
  Box,
  Typography,
  IconButton,
  Link,
  useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <Box
        sx={{
          backgroundColor: "#000", // Set the background color to black
          color: "#fff", // Set the text color to white
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobScreen ? "center" : "space-between",
            flexDirection: isMobScreen ? "column" : "row",
            width: isMobScreen ? "98%" : "100%",
            maxWidth: "1200px",
            flexWrap: "wrap",
            marginBottom: "10px", // Reduced margin bottom
            alignItems: isMobScreen ? "center" : "flex-start",
          }}
        >
          <Box sx={{ flex: "1 1 300px", padding: "10px", textAlign: isMobScreen ? "center" : "left", marginBottom: isMobScreen ? "-130px" : "0" }}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              ABOUT US
            </Typography>
            <Link
              href={"/about-us"}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Our Story
            </Link>
            <Link
              href={"/contact-us"}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Contact Us
            </Link>
            <Link
              href={"/faqs"}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              FAQs
            </Link>
          </Box>
          <Box sx={{ flex: "1 1 300px", padding: "10px", textAlign: isMobScreen ? "center" : "left", marginBottom: isMobScreen ? "-130px" : "0" }}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              ASSISTANCE
            </Typography>
            <Link
              href={"/terms-and-conditions"}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Terms & Conditions
            </Link>
            <Link
              href={"/privacy-policy"}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Privacy Policy
            </Link>
            <Link
              href={"/cancellation-policy"}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Cancellation Policy
            </Link>
          </Box>
          <Box sx={{ flex: "1 1 300px", padding: "10px", textAlign: isMobScreen ? "center" : "left" ,  marginBottom: isMobScreen ? "-130px" : "0"}}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Our Hotels
            </Typography>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Umda Hotel Montana
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Umda Hotel Horizon
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Umda Hotel Galaxy
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobScreen ? "center" : "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            flexWrap: "wrap",
            textAlign: "center",
            marginBottom: "10px", // Reduced margin bottom
          }}
        >
          <Box display="flex" justifyContent={isMobScreen ? "center" : "flex-start"} alignItems="center" mb={isMobScreen ? 2 : 0}>
            <IconButton href="#" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton href="#" color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" color="inherit">
              <YouTubeIcon />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            sx={{ flex: "1 1 100%", textAlign: "center", marginTop: "10px" }}
          >
            Copyright © 2024 by Umda: Pakistan #1 Hotel Chain. All rights
            reserved.
          </Typography>
        </Box>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Footer;
