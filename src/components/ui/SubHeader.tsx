import { Box, Typography } from "@mui/material";
import HeroImage from "@/public/assets/images/hero-image.webp";

interface SubHeaderProps {
  heading: String;
}

const SubHeader = ({ heading }: SubHeaderProps) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${HeroImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
