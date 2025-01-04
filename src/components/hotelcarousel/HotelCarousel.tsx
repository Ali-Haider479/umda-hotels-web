import { useEffect, useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Image1 from "@/public/assets/images/hotel-room-bg.jpg";
import Image2 from "@/public/assets/images/2.webp";
import Image3 from "@/public/assets/images/3.webp";
import Image4 from "@/public/assets/images/4.webp";
import Image5 from "@/public/assets/images/5.webp";
import Image6 from "@/public/assets/images/6.webp";
//Montana
import MontanaImage1 from "@/public/assets/montana-images/upper-slider/2_1.webp";
import MontanaImage2 from "@/public/assets/montana-images/upper-slider/2.webp";
import MontanaImage3 from "@/public/assets/montana-images/upper-slider/3.webp";
import MontanaImage4 from "@/public/assets/montana-images/upper-slider/4.webp";
import MontanaImage5 from "@/public/assets/montana-images/upper-slider/5.webp";
import MontanaImage6 from "@/public/assets/montana-images/upper-slider/8.webp";
//Galaxy
import GalaxyImage1 from "@/public/assets/galaxy-images/upper-slider/1.webp";
import GalaxyImage2 from "@/public/assets/galaxy-images/upper-slider/2.webp";
import GalaxyImage3 from "@/public/assets/galaxy-images/upper-slider/3.webp";
import GalaxyImage4 from "@/public/assets/galaxy-images/upper-slider/4.webp";
import GalaxyImage5 from "@/public/assets/galaxy-images/upper-slider/5.webp";
import GalaxyImage6 from "@/public/assets/galaxy-images/upper-slider/6.webp";

//Safari
import SafariImage1 from "@/public/assets/safari-images/upper-slider/1.webp";
import SafariImage2 from "@/public/assets/safari-images/upper-slider/2.webp";
import SafariImage3 from "@/public/assets/safari-images/upper-slider/4.jpg";
import SafariImage4 from "@/public/assets/safari-images/upper-slider/5.jpg";
import SafariImage5 from "@/public/assets/safari-images/upper-slider/9.jpg";
import SafariImage6 from "@/public/assets/safari-images/upper-slider/9.webp";
import SafariImage7 from "@/public/assets/safari-images/upper-slider/10.webp";
import SafariImage8 from "@/public/assets/safari-images/upper-slider/19.webp";

const montanaSilderImages = [
  { src: MontanaImage1, alt: "Montana Hotel view 1" },
  { src: MontanaImage2, alt: "Montana Hotel view 2" },
  { src: MontanaImage3, alt: "Montana Hotel view 3" },
  { src: MontanaImage4, alt: "Montana Hotel view 4" },
  { src: MontanaImage5, alt: "Montana Hotel view 5" },
  { src: MontanaImage6, alt: "Montana Hotel view 6" },
];

const galaxySilderImages = [
  { src: GalaxyImage6, alt: "Galaxy Hotel view 6" },
  { src: GalaxyImage1, alt: "Galaxy Hotel view 1" },
  { src: GalaxyImage2, alt: "Galaxy Hotel view 2" },
  // { src: GalaxyImage3, alt: "Galaxy Hotel view 3" },
  { src: GalaxyImage4, alt: "Galaxy Hotel view 4" },
  { src: GalaxyImage5, alt: "Galaxy Hotel view 5" },
];

const safariSilderImages = [
  { src: SafariImage1, alt: "Safari Hotel view 1" },
  { src: SafariImage2, alt: "Safari Hotel view 2" },
  { src: SafariImage3, alt: "Safari Hotel view 3" },
  { src: SafariImage4, alt: "Safari Hotel view 4" },
  { src: SafariImage5, alt: "Safari Hotel view 5" },
  { src: SafariImage6, alt: "Safari Hotel view 6" },
];

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
}

const HotelCarousel = ({ cityId }: HotelCarouselProps) => {
  console.log(cityId);
  const isMobile = useMediaQuery("(max-width: 950px)");
  const slidesToShow = isMobile ? 1 : 3; // Show 1 image on mobile, 3 on larger screens
  const [currentIndex, setCurrentIndex] = useState(slidesToShow);
  const [transitioning, setTransitioning] = useState(false);

  // Select images based on cityId
  let selectedImages = defaultImages;

  if (cityId === "Abbottabad") {
    selectedImages = montanaSilderImages;
  } else if (cityId === "Islamabad") {
    selectedImages = safariSilderImages;
  } else if (cityId === "Nathia Gali") {
    selectedImages = galaxySilderImages;
  }

  const totalSlides = selectedImages.length;
  const extendedImages = [
    ...selectedImages.slice(-slidesToShow),
    ...selectedImages,
    ...selectedImages.slice(0, slidesToShow),
  ];

  useEffect(() => {
    // Reset currentIndex when cityId or slidesToShow changes
    setCurrentIndex(slidesToShow);
  }, [cityId, slidesToShow, slidesToShow]);

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
          {selectedImages.map((image, dotIndex) => (
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
