"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  console.log(pathname);
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
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {/* <Box sx={{ flex: "1 1 300px", padding: "10px" }}>
            <Box>
              <Image
                src={UmdaLogo}
                alt="Umda Company Logo"
                className="umda-hotel-logo"
              />
              <p style={{ fontSize: 20, fontWeight: "bold" }}>Umda Hotels</p>
              <Typography variant="h6" fontWeight="bold">
                Pakistan's leading chain of hotels
              </Typography>
            </Box>
          </Box> */}
          <Box sx={{ flex: "1 1 300px", padding: "10px" }}>
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
          <Box sx={{ flex: "1 1 300px", padding: "10px" }}>
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
          <Box sx={{ flex: "1 1 300px", padding: "10px" }}>
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
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            flexWrap: "wrap",
          }}
        >
          <Box display="flex" alignItems="center">
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
          {/* <Box display="flex" alignItems="center">
            <Image
              src="/path/to/canada-flag-icon.png"
              alt="Canada"
              width={24}
              height={16}
            />
            <Typography variant="body2" sx={{ marginLeft: "8px" }}>
              Canada (CAD $)
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: "8px" }}>
              English
            </Typography>
          </Box> */}
          {/* <Box display="flex" alignItems="center" sx={{ marginTop: "10px" }}>
            <Image src="/path/to/payment-icon1.png" alt="Payment Method 1" width={24} height={16} />
            <Image src="/path/to/payment-icon2.png" alt="Payment Method 2" width={24} height={16} />
            <Image src="/path/to/payment-icon3.png" alt="Payment Method 3" width={24} height={16} />
            <Image src="/path/to/payment-icon4.png" alt="Payment Method 4" width={24} height={16} />
            <Image src="/path/to/payment-icon5.png" alt="Payment Method 5" width={24} height={16} />
            <Image src="/path/to/payment-icon6.png" alt="Payment Method 6" width={24} height={16} />
            <Image src="/path/to/payment-icon7.png" alt="Payment Method 7" width={24} height={16} />
          </Box> */}
        </Box>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Footer;
