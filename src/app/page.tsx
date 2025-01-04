"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Fab, useMediaQuery } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import SearchBar from "@/components/searchbar/SearchBar";
import WelcomeCard from "@/components/welcomecard/WelcomeCard";
import Testimonials from "@/components/testimonials/Testimonials";
import NewsLetterCard from "@/components/newsletter/NewsLetterCard";
import Features from "@/components/features/Features";
import OurHotels from "@/components/ourhotels/OurHotels";
import Explore from "@/components/explore/explore";
import OnGoingOffers from "@/components/ongoingoffers/OnGoingOffers";

const Home = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");
  const handleWhatsAppClick = () => {
    // Open WhatsApp with a default message
    window.open(
      "https://wa.me/923319145021?text=Hello! I would like to know more about Umda Hotels."
    );
  };
  const handleCallClick = () => {
    // Implement your call functionality here
    window.location.href = "tel:+92-321-1111082";
  };
  return (
    <Box>
      <SearchBar />
      <Explore />

      <Features />
      <OnGoingOffers />
      {/* <WelcomeCard /> */}
      <OurHotels />
      <Testimonials />
      <Box paddingBottom={10}>
        <NewsLetterCard />
      </Box>
      <Fab
        color="success"
        aria-label="call"
        onClick={handleCallClick}
        sx={{
          position: "fixed",
          bottom: isMobScreen ? 160 : 100, // Adjust bottom padding here
          right: isMobScreen ? 19 : 24, // Position on the right side
          backgroundColor: "#E74C3C",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#C0392B",
          },
        }}
      >
        <CallIcon />
      </Fab>
      <Fab
        color="success"
        aria-label="whatsapp"
        onClick={handleWhatsAppClick}
        sx={{
          position: "fixed",
          bottom: isMobScreen ? 90 : 24, // Adjust bottom padding here
          right: isMobScreen ? 19 : 24, // Position on the right side
          backgroundColor: "#25D366",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1ebe57",
          },
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
};

export default Home;
