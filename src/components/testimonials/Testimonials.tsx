"use client";
import { Box, Typography } from "@mui/material";
import TestimonialCard from "./TestimonialCard";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Mackie Clonts",
    image: "https://via.placeholder.com/150",
    testimonial:
      "Ernest is an incredibly talented designer. He's passionate and never settles for good enough. I worked with him for a brief time, and am extremely impressed with his design and art direction across all mediums.",
    rating: 4,
  },
  {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    testimonial:
      "John is an exceptional developer. His code quality is top-notch and he always meets deadlines. It's a pleasure to work with him.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    testimonial:
      "Jane's creativity and attention to detail are unparalleled. She brings a unique perspective to every project.",
    rating: 5,
  },
  {
    name: "Ali",
    image: "https://via.placeholder.com/150",
    testimonial: "Acha experience tha with friends... BHOT UMDA 🙂",
    rating: 5,
  },
  {
    name: "Usman",
    image: "https://via.placeholder.com/150",
    testimonial:
      "Visited the hotel with my family. Bhout achi service hai aur super affordable price hai. Will come again.",
    rating: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "60px",
  };

  return (
    <Box paddingY={10}>
      <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
        Hear From Our Customers
      </Typography>
      <Box paddingY={5} paddingX={5}>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} paddingY={3}>
              <TestimonialCard
                name={testimonial.name}
                image={testimonial.image}
                testimonial={testimonial.testimonial}
                rating={testimonial.rating}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonials;