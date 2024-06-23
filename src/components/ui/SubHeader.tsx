"use client";

import { Box, Typography,useMediaQuery } from "@mui/material";
import HeroImage from "@/public/assets/images/hero-image.webp";

interface SubHeaderProps {
  heading: String;
}

const SubHeader = ({ heading }: SubHeaderProps) => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  return (
    <Box
      sx={{
        backgroundImage: `url(${HeroImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: isMobScreen ? "inherit" : "cover" , 
        backgroundPosition: "center center",
        width: "100%",
        height: "auto",
      }}
    >
      <Box paddingY={"180px"}>
        <Typography
          textAlign={"center"}
          color={"white"}
          variant="h4"
          fontWeight={"bold"}
        >
          {heading}
        </Typography>
      </Box>
    </Box>
  );
};

export default SubHeader;
