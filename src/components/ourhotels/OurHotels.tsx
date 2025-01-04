"use client";
import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import HotelCard from "./HotelCard";
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";
import HotelGalaxyImage from "@/public/assets/galaxy-images/main.webp";
import HotelSafariImage from "@/public/assets/safari-images/main.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurHotels = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const hotelsArray = [
    {
      name: "Umda Hotel Montana",
      address:
        "Main ayubia chok, Ayubia Rd, opposite Chair Lift, Ayubia, 22310",
      phone: "0331 9145021",
      images: [HotelMontanaImage, HotelMontanaImage, HotelMontanaImage],
    },
    {
      name: "Umda Hotel Galaxy",
      address: "Main bazar, Nathia Gali, Abbottabad, Khyber Pakhtunkhwa 22280",
      phone: "0347 9792989",
      images: [HotelGalaxyImage, HotelGalaxyImage, HotelGalaxyImage],
    },
    {
      name: "Umda Hotel Safari",
      address: "House 13 Street 150, G 13/4, Islamabad Capital Territory 44000",
      phone: "0331 9145021",
      images: [HotelSafariImage, HotelSafariImage, HotelSafariImage],
    },
  ];

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <>
      {isMobScreen ? (
        <Box maxWidth={"90%"} mt={4} mx={2}>
          <Typography pl={1} fontSize={16} fontWeight={"bold"}>
            Our Hotels
          </Typography>
          <Slider {...sliderSettings}>
            {hotelsArray.map((hotel, index) => (
              <Box
                key={index}
                p={1}
                sx={{
                  width: "90%",
                  maxWidth: "300px",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <HotelCard
                  name={hotel.name}
                  address={hotel.address}
                  phone={hotel.phone}
                  images={hotel.images}
                  sx={{
                    width: "100%",
                    height: "200px",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box mt={2} mx={2}>
          <Typography
            textAlign={"center"}
            py={2}
            variant="h4"
            fontWeight={"bold"}
          >
            Our Hotels
          </Typography>
          <Grid container spacing={2}>
            {hotelsArray.map((hotel, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <HotelCard
                  name={hotel.name}
                  address={hotel.address}
                  phone={hotel.phone}
                  images={hotel.images}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default OurHotels;
