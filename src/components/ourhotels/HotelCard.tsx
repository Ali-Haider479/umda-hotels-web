"use client";

import { useState } from "react";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";

const images = [HotelMontanaImage, HotelMontanaImage, HotelMontanaImage];

interface HotelCardProps {
  images: StaticImageData[];
  name: string;
  address: string;
  phone?: string; // Optional phone number
}

const HotelCard = ({ images, name, address, phone }: HotelCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeTransition, setFadeTransition] = useState(false);

  const handleNext = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeTransition(false);
    }, 500);
  };

  const handlePrev = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setFadeTransition(false);
    }, 500);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "white",
        maxWidth: 500,
        mx: "auto",
        marginY: 5,
        // marginX: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          marginBottom: 2,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 10,
            top: "50%",
            zIndex: 1,
            color: "white",
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "opacity 0.5s",
            opacity: fadeTransition ? 0.3 : 1,
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`hotel image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            style={{
              borderRadius: 5,
            }}
          />
        </Box>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            zIndex: 1,
            color: "white",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
        {name}
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        {address}
      </Typography>
    </Paper>
  );
};

export default HotelCard;
