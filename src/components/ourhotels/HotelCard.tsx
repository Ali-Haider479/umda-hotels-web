"use client";

import { Paper, Box, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";

const images = [HotelMontanaImage, HotelMontanaImage, HotelMontanaImage];

interface HotelCardProps {
  images: StaticImageData[];
  name: string;
  address: string;
  phone?: string; // Optional phone number
}

const HotelCard = ({ images, name, address, phone }: HotelCardProps) => {
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
        <Image
          src={images[0]} // Display only the first image
          alt={`hotel image`}
          layout="fill"
          objectFit="cover"
          quality={100}
          style={{
            borderRadius: 5,
          }}
        />
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
