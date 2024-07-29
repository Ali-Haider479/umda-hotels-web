"use client"
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

import PigiBankIcon from "@/public/assets/icons/pig-bank.webp";
import UmbrellaSafetyIcon from "@/public/assets/icons/umberalla.webp";
import EarthIcon from "@/public/assets/icons/location-earth.webp";

const Features = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const featuresList = [
    {
      title: "Best Hotel Rates Guaranteed",
      description: "Get the best hotel rates online and book your room now",
      icon: PigiBankIcon,
    },
    {
      title: "Trust & Safety",
      description: "Get the best hotel rates online and book your room now",
      icon: UmbrellaSafetyIcon,
    },
    {
      title: "Exclusive Location",
      description: "Get the best hotel rates online and book your room now",
      icon: EarthIcon,
    },
  ];
  return (
    <>
    {isMobScreen ? null :  <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: "20px",
        flexWrap: "wrap",
      }}
      paddingTop={5}
    >
      {featuresList.map((feature, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "16px",
          }}
          key={index}
        >
          <Image
            src={feature.icon.src}
            alt={feature.title}
            width={50}
            height={50}
          />
          <Box sx={{ marginLeft: "16px" }}>
            <Typography variant="h6" fontWeight="bold">
              {feature.title}
            </Typography>
            <Typography variant="body2">{feature.description}</Typography>
          </Box>
        </Box>
      ))}
    </Box>}
    </>
  );
};

export default Features;
