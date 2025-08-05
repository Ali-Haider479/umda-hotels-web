import { useEffect, useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Image1 from "@/public/assets/images/hotel-room-bg.jpg";
import Image2 from "@/public/assets/images/2.webp";
import Image3 from "@/public/assets/images/3.webp";
import Image4 from "@/public/assets/images/4.webp";
import Image5 from "@/public/assets/images/5.webp";
import Image6 from "@/public/assets/images/6.webp";

const defaultImages = [
  { src: Image1, alt: "Default Hotel view 1" },
  { src: Image2, alt: "Default Hotel view 2" },
  { src: Image3, alt: "Default Hotel view 3" },
  { src: Image4, alt: "Default Hotel view 4" },
  { src: Image5, alt: "Default Hotel view 5" },
  { src: Image6, alt: "Default Hotel view 6" },
];

interface HotelCarouselProps {
  cityId: string | null;
  hotelImages: string[] | undefined;
}

const HotelCarousel = ({ cityId, hotelImages }: HotelCarouselProps) => {
  const isMobile = useMediaQuery("(max-width: 950px)");
  const slidesToShow = isMobile ? 1 : 3;
  const [currentIndex, setCurrentIndex] = useState(slidesToShow);
  const [transitioning, setTransitioning] = useState(false);

  let selectedImages;
  if (hotelImages && hotelImages.length > 0) {
    console.log("props images");
    selectedImages = hotelImages.map((url, index) => ({
      src: url,
      alt: `Hotel image ${index + 1}`,
    }));
  } else {
    console.log("default images");
    selectedImages = defaultImages;
  }

  const totalSlides = selectedImages.length;
  const extendedImages = [
    ...selectedImages.slice(-slidesToShow),
    ...selectedImages,
    ...selectedImages.slice(0, slidesToShow),
  ];

  useEffect(() => {
    setCurrentIndex(slidesToShow);
  }, [cityId, slidesToShow]);

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
  }, [currentIndex, transitioning, totalSlides, slidesToShow]);

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
              position: "relative",
              height: isMobile ? "250px" : "400px",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{
                objectFit: "cover",
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
          {selectedImages.map((image, dotIndex) => (
            <img
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              src={typeof image.src === "string" ? image.src : image.src.src}
              alt={image.alt}
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
          {selectedImages.map((_, dotIndex) => (
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