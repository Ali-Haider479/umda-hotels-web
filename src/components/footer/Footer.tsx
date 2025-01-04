"use client";

import {
  Box,
  Typography,
  IconButton,
  Link,
  useMediaQuery,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ConstructionIcon from "@mui/icons-material/Construction";
import PhoneIcon from "@mui/icons-material/Phone";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SecurityIcon from "@mui/icons-material/Security";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  console.log(pathname);

  if (
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/hotel"
  ) {
    return (
      <>
        {isMobScreen ? (
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "5px 0",
              border: "1px solid #fff",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              position: "fixed",
              bottom: 0,
              width: "100%",
              boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "2px",
              }}
            >
              <IconButton href="/" color="inherit">
                <InfoIcon />
              </IconButton>
              <Typography variant="caption">Home</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "2px",
                marginRight: "0px",
              }}
            >
              <IconButton href="/contact-us" color="inherit">
                <PhoneIcon />
              </IconButton>
              <Typography variant="caption">Contact</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "2px",
                marginRight: "10px",
              }}
            >
              <IconButton href="/faqs" color="inherit">
                <QuestionAnswerIcon />
              </IconButton>
              <Typography variant="caption">FAQs</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "2px",
                marginRight: "15px",
              }}
            >
              <IconButton href="/login" color="inherit">
                <SecurityIcon />
              </IconButton>
              <Typography variant="caption">Account</Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                maxWidth: "1200px",
                flexWrap: "wrap",
                marginBottom: "10px",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{ flex: "1 1 300px", padding: "10px", textAlign: "left" }}
              >
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
              <Box
                sx={{ flex: "1 1 300px", padding: "10px", textAlign: "left" }}
              >
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
              <Box
                sx={{ flex: "1 1 300px", padding: "10px", textAlign: "left" }}
              >
                {/* <Typography variant="body1" fontWeight="bold" gutterBottom>
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
                  Umda Hotel Safari
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  variant="body2"
                  display="block"
                  gutterBottom
                >
                  Umda Hotel Galaxy
                </Link> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: "1200px",
                flexWrap: "wrap",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
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
                sx={{
                  flex: "1 1 100%",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Copyright © 2024 by Umda: Pakistan #1 Hotel Chain. All rights
                reserved.
              </Typography>
            </Box>
          </Box>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Footer;
