"use client";
import { Box } from "@mui/material";
import Slider from "react-slick";

interface CarouselProps {
  images: string[];
  width: string;
  height: string;
}

const Carousel = ({ images, width, height }: CarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
