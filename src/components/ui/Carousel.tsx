"use client";
import { Box, IconButton } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import Slider, { CustomArrowProps } from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: StaticImageData[];
  width: string;
  height: string;
}

interface ArrowProps extends CustomArrowProps {}

const PreviousArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 10,
        top: "50%",
        zIndex: 1,
        color: "black",
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 10,
        top: "50%",
        zIndex: 1,
        color: "black",
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const Carousel = ({ images, width, height }: CarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };
  return (
    <Box sx={{ width, height }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{ position: "relative", height: 300 }}
            borderRadius={20}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                // objectFit: "cover",
                borderRadius: 20,
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
