"use client";
import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const iconMap: { [key: string]: React.ComponentType } = {
  TvIcon: TvIcon,
  WifiIcon: WifiIcon,
  LocalParkingIcon: LocalParkingIcon,
  RestaurantIcon: RestaurantIcon,
  FireplaceIcon: FireplaceIcon,
};

type FullRoomType = {
  _id: string;
  roomName: string;
  bedCount: number;
  peopleCount: number;
  childCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  availableRooms: number;
  roomIds: string[];
  guests: number;
  rooms: number;
  checked: boolean;
};

interface Heading {
  title: string;
  description: string;
}

interface Amenity {
  name: string;
  icon: string;
}

type BaseRoomType = Omit<FullRoomType, "guests" | "rooms" | "checked">;

interface Hotel {
  name: string;
  address: string;
  city: string;
  headings: Heading[];
  rating: number;
  reviews: number;
  amenities: Amenity[];
  mainImage: string;
  carouselImages: string[];
  rooms: BaseRoomType[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface HotelDescriptionProps {
  cityId: string | null;
  hotelData: Hotel | null;
}

const HotelDescription = ({ cityId, hotelData }: HotelDescriptionProps) => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  console.log(hotelData);
  if (!hotelData) {
    return <Typography>No hotel information available.</Typography>;
  }

  const getStars = (rating: number) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} color="#ffc107" size={24} />); // Full star
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" size={24} />); // Half star
      } else {
        stars.push(<FaRegStar key={i} color="#ffc107" size={24} />); // Empty star
      }
    }
    return stars;
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "10px auto", padding: 2 }}>
      {isMobScreen ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: "8px" }}>
              {4.2}
            </Typography>
            {getStars(4.2)}
          </Box>
          <Box>
            <Typography fontSize={13} mt={1} sx={{ marginRight: "8px" }}>
              4.2 average based on 234 reviews.
            </Typography>
          </Box>
        </>
      ) : null}

      <Typography
        pt={3}
        sx={{
          fontSize: isMobScreen ? "18px" : "24px",
          fontWeight: "bold",
        }}
      >
        {" "}
        {hotelData.name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: isMobScreen ? "12px" : "18px",
          fontWeight: "bold",
        }}
        color="text.secondary"
      >
        {hotelData.address}
      </Typography>

      <Typography
        pt={3}
        sx={{
          fontSize: isMobScreen ? "18px" : "24px",
          fontWeight: "bold",
        }}
        fontWeight={"bold"}
      >
        Description
      </Typography>

      {(expanded ? hotelData.headings : hotelData.headings.slice(0, 1)).map((heading, index) => (
        <div key={index}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: isMobScreen ? "14px" : "18px",
              fontWeight: "bold",
            }}
            color={"#474747"}
            pt={3}
          >
            {heading.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobScreen ? "12px" : "18px",
              mt: 2,
            }}
          >
            {heading.description}
          </Typography>
        </div>
      ))}
      <Button
        onClick={handleToggle}
        variant="contained"
        sx={{
          mt: 2,
          padding: "4px 8px",
          fontSize: "0.75rem",
          minWidth: "auto",
        }}
      >
        {expanded ? "Read Less" : "Read More"}
      </Button>

      <Typography sx={{ mt: 4 }} fontWeight={"bold"}>
        Amenities
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {hotelData.amenities.map((amenity, index) => {
          const IconComponent = iconMap[amenity.icon]; // Get the icon component from the map
          return (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box display="flex" alignItems="center">
                {IconComponent && <IconComponent />} {/* Render the icon if it exists */}
                <Typography variant="body1" sx={{ ml: 1, fontSize: "12px" }}>
                  {amenity.name}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HotelDescription;
