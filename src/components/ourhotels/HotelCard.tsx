"use client";

import { Paper, Box, Typography, SxProps, useMediaQuery } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";

interface HotelCardProps {
  images: StaticImageData[];
  name: string;
  address: string;
  phone?: string; // Optional phone number
  sx?: SxProps; // Add this line to accept custom styles
}

const HotelCard = ({ images, name, address, phone, sx }: HotelCardProps) => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  return (
    <>
    {isMobScreen ?   <Paper
      elevation={3}
      sx={{
        padding: isMobScreen ? 1 : 2, // Adjust padding for mobile screens
        borderRadius: 2,
        backgroundColor: "white",
        width: '100%',
        maxWidth: isMobScreen ? '90%' : '300px', // Adjust max width for mobile screens
        height: 'auto',
        mx: "auto",
        marginY: 2,
        marginLeft: "60px",
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: isMobScreen ? "150px" : "200px", // Adjust image height for mobile screens
          marginBottom: 1,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Image
          src={images[0]} // Display only the first image
          alt={`hotel image`}
          layout="fill"
          objectFit="cover"
          quality={100}
          style={{
            borderRadius: '8px',
          }}
          
        />
      </Box>
      <Typography variant={isMobScreen ? "body1" : "h6"} textAlign={"center"} fontWeight={"bold"} noWrap>
        {name}
      </Typography>
      <Typography variant={isMobScreen ? "body2" : "body1"} textAlign={"center"} noWrap>
        {address}
      </Typography>
      {phone && (
        <Typography variant={isMobScreen ? "body2" : "body1"} textAlign={"center"} noWrap>
          {phone}
        </Typography>
      )}
    </Paper> :     <Paper
    elevation={3}
    sx={{
      padding: 3,
      borderRadius: 2,
      backgroundColor: "white",
      maxWidth: 500,
      mx: "auto",
      marginY: 5,
      ...sx, // Apply custom styles from sx
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
        alt={"hotel image"}
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
  </Paper>}
  </>
  );
};

export default HotelCard;
