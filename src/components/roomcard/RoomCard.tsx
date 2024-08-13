"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import RestaurantIcon from "@mui/icons-material/Restaurant";

//Images imports
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";
import HotelGalaxyImage from "@/public/assets/images/hotel-galaxy.webp";
import HotelHorizonImage from "@/public/assets/images/hotel-horizan.webp";
const images = [HotelMontanaImage, HotelGalaxyImage, HotelHorizonImage];

const amenities = [
  { text: "Free Wifi", icon: WifiIcon },
  { text: "TV", icon: TvIcon },
  { text: "Parking", icon: LocalParkingIcon },
  { text: "Air Conditioning", icon: AcUnitIcon },
  { text: "Heater", icon: FireplaceIcon },
  { text: "Restaurant", icon: RestaurantIcon },
];

const RoomCard = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeTransition, setFadeTransition] = useState(false);

  const handleNext = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeTransition(false);
    }, 500);
  };

  const handlePrev = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setFadeTransition(false);
    }, 500);
  };

  const createQueryString = (params: any) => {
    const queryString = new URLSearchParams(params).toString();
    return queryString;
  };

  const handleViewDetails = () => {
    const queryParams = {
      id: "123",
      checkInDate: "startDate",
      checkOutDate: "endDate",
      guests: 2,
    };
    const queryString = createQueryString(queryParams);
    // router.push(`/room?${queryString}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "16px auto",
        padding: 2,
        border: "2px solid #ddd",
        // transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6, // Adds a shadow on hover
        },
      }}
    >
      <Grid container spacing={2}>
        {/* Image Carousel */}
        <Grid item xs={4}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "220px",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "white",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "opacity 0.5s",
                opacity: fadeTransition ? 0.3 : 1,
              }}
            >
              <Image
                src={images[currentIndex]}
                alt={`hotel image ${currentIndex + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                style={{
                  borderRadius: 5,
                }}
              />
            </Box>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "white",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Room Information */}
        <Grid item xs={5}>
          <CardContent>
            <Typography variant="h6" component="div">
              Executive Room 301
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Umda Hotel Horizon, Islamabad
            </Typography>
            <Grid
              container
              alignItems="center"
              spacing={1}
              sx={{ margin: "0px 0px 5px 0px" }}
            >
              <Grid item>
                <Rating value={4.4} readOnly precision={0.1} />
              </Grid>
              <Grid item>
                <Typography variant="body2">(43 Ratings)</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {amenities.map((amenity, index) => (
                <Grid item xs={6} key={index}>
                  <Box display="flex" alignItems="center">
                    <amenity.icon style={{ marginRight: 8 }} />
                    <Typography variant="body2">{amenity.text}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Grid>

        {/* Price and Book Button */}
        <Grid
          item
          xs={3}
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography variant="h5" component="div" color="primary">
            Rs. 12800
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: "line-through" }}
          >
            Rs. 16000
          </Typography>
          <Typography variant="body2" color="error">
            20% off
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Incl. tax for 1 night
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: 1, width: 140 }}
            onClick={handleViewDetails}
          >
            VIEW DETAILS
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 1, width: 140 }}
          >
            BOOK NOW
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RoomCard;
