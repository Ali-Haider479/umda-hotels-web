import { useEffect, useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Image1 from "@/public/assets/images/hotel-room-bg.jpg";
import Image2 from "@/public/assets/images/2.webp";
import Image3 from "@/public/assets/images/3.webp";
import Image4 from "@/public/assets/images/4.webp";
import Image5 from "@/public/assets/images/5.webp";
import Image6 from "@/public/assets/images/6.webp";

const images = [
  { src: Image1, alt: "Hotel view 1" },
  { src: Image2, alt: "Hotel view 2" },
  { src: Image3, alt: "Hotel view 3" },
  { src: Image4, alt: "Hotel view 4" },
  { src: Image5, alt: "Hotel view 5" },
  { src: Image6, alt: "Hotel view 6" },
];

const HotelCarousel = () => {
  const isMobile = useMediaQuery("(max-width: 950px)");
  const slidesToShow = isMobile ? 1 : 3; // Show 1 image on mobile, 3 on larger screens
  const [currentIndex, setCurrentIndex] = useState(slidesToShow);
  const [transitioning, setTransitioning] = useState(false);

  const totalSlides = images.length;
  const extendedImages = [
    ...images.slice(-slidesToShow),
    ...images,
    ...images.slice(0, slidesToShow),
  ];

  useEffect(() => {
    if (transitioning) return;

    if (currentIndex < slidesToShow) {
      setTimeout(() => {
        setTransitioning(true);
        setCurrentIndex(totalSlides + currentIndex);
      }, 500);
    } else if (currentIndex >= totalSlides + slidesToShow) {
      setTimeout(() => {
        setTransitioning(true);
        setCurrentIndex(currentIndex - totalSlides);
      }, 500);
    }
  }, [currentIndex, transitioning]);

  const prevSlide = () => {
    setTransitioning(false);
    setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    setTransitioning(false);
    setCurrentIndex(currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setTransitioning(false);
    setCurrentIndex(index + slidesToShow);
  };

  const translateXValue = -(currentIndex * (100 / slidesToShow));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          transition: transitioning ? "none" : "transform 0.5s ease-in-out",
          transform: `translateX(${translateXValue}%)`,
        }}
      >
        {extendedImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              minWidth: `${100 / slidesToShow}%`,
              boxSizing: "border-box",
              padding: "0 0px",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: isMobile ? "250px" : "400px",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Box>
      <Button
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: isMobile ? "40%" : "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        ‹
      </Button>
      <Button
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: isMobile ? "40%" : "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        ›
      </Button>
      {isMobile ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {images.map((image, dotIndex) => (
            <img
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              src={image.src.src}
              alt={`Thumbnail ${dotIndex + 1}`}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "0 5px",
                border:
                  dotIndex === (currentIndex - slidesToShow) % totalSlides
                    ? "3px solid #1976D2"
                    : "3px solid transparent",
                transition: "border 0.3s ease",
              }}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {images.map((_, dotIndex) => (
            <Box
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  dotIndex === (currentIndex - slidesToShow) % totalSlides
                    ? "black"
                    : "grey",
                margin: "0 5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HotelCarousel;
