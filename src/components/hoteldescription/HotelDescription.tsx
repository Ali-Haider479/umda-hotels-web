"use client";
import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const amenitiesList = [
  { name: "Flat TV", icon: <TvIcon /> },
  { name: "Heater", icon: <FireplaceIcon /> },
  { name: "Internet - Wifi", icon: <WifiIcon /> },
  { name: "Parking", icon: <LocalParkingIcon /> },
  { name: "Restaurant in Ayubia", icon: <RestaurantIcon /> },
];

const HotelDescription = () => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  return (

    <Box sx={{ maxWidth: 800, margin: "32px auto", padding: 2 }}>
    {isMobScreen ? (
  <Box>
    <Grid container alignItems="center"  spacing={1} pb={2}>
      <Grid item>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: 1,
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarIcon fontSize="small" />
          <Typography >
            4.2
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Typography fontSize={"14px"} pl={2}>Very Good</Typography>
        <Typography fontSize={"12px"}  pl={2} color="text.secondary">
          1566 Reviews
        </Typography>
      </Grid>
    </Grid>
    <Grid container alignItems="center" pb={2} spacing={1}>
      <Grid item>
        <CheckCircleIcon fontSize="small" color="success" />
      </Grid>
      <Grid item>
        <Typography fontSize={"12px"}>76% guests rated 4+</Typography>
      </Grid>
      <Grid item>
        <CheckCircleIcon fontSize="small" color="success" />
      </Grid>
      <Grid item>
        <Typography fontSize={"12px"}>86% guests recommend</Typography>
      </Grid>
    </Grid>
  </Box>
) : null}

      
<Typography
  pt={3}
  sx={{ 
    fontSize: isMobScreen ? '18px' : '24px',
    fontWeight: 'bold'
  }}
>        Umda Hotel Montana
      </Typography>
      <Typography variant="subtitle1"    sx={{ 
    fontSize: isMobScreen ? '12px' : '18px',
    fontWeight: 'bold'
  }} color="text.secondary">
        Umda Hotel Montana, Opposite Ayubia Chairlift, Ayubia, Abbotabad, KPK
      </Typography>

      <Typography pt={3}    sx={{ 
    fontSize: isMobScreen ? '18px' : '24px',
    fontWeight: 'bold'
  }}fontWeight={"bold"}>
        Description
      </Typography>
      <Typography
        variant="subtitle1"
    
        sx={{ 
          fontSize: isMobScreen ? '14px' : '18px',
          fontWeight: 'bold'
        }}
        color={"#474747"}
        pt={3}
      >
        Umda Hotel Montana - Best Hotel in Ayubia
      </Typography>
      <Typography variant="body1"   sx={{ 
    fontSize: isMobScreen ? '12px' : '18px',
    mt: 2 
  }}>
        {expanded ? (
          <>
            Are you looking for the perfect hotel in Ayubia that offers the best
            hotel rates in Murree? Look no further than one of the best hotels
            in Ayubia, near Nathia Gali Murree. Umda Hotel Montana provides
            stunning views and plenty of activities to keep you busy, and it's
            the perfect place to relax and rejuvenate. So, make sure to book
            your stay today!
            <br />
            <br />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color={"#474747"}
            >
              Affordable Luxurious Hotel In Ayubia
            </Typography>
            Umda Hotel Montana is the best hotel in Ayubia; therefore, don't
            look elsewhere. This budget hotel near Nathia Gali offers
            breathtaking mountain views and easy access to popular attractions
            in Murree. The rooms at Ayubia hotel are spacious, and the staff is
            friendly and helpful. There's an on-site restaurant for lunch and
            dinner. Wi-Fi is available throughout the property.
            <br />
            <br />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color={"#474747"}
            >
              Best Hotel Rates in Murree
            </Typography>
            Umda hotel Montana offers unbeatably low hotel rates in Murree and
            Ayubia. For budget-minded travelers, Umda hotel Montana delivers
            exceptional value and lavish amenities at a fraction of the cost
            you'd expect to pay for hotel accommodation in either city. With
            comprehensive packages catering to short-term visits and extended
            stays, the hotel is an ideal space for business execs and leisure
            tourists alike.
            <br />
            <br />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color={"#474747"}
            >
              Dial Ayubia Hotel Contact Number
            </Typography>
            Umda Hotel Montana is a reliable accommodation option for hotel
            booking. The best hotel in Ayubia takes extra measures to ensure
            safety and comfort in all of its facilities. Moreover, Ayubia hotel
            offers unbeatable rates that fit any traveler's budget. Ayubia
            provides excellent customer service, making them the perfect choice
            for lodging in Ayubia. If you are looking for the best option for
            your next hotel booking, dial their Ayubia hotel contact number and
            get in touch with their team of experts who will help you find the
            accommodation of your dreams.
          </>
        ) : (
          `Are you looking for the perfect hotel in Ayubia that offers the best hotel rates in Murree? Look no further than one of the best hotels in Ayubia, near Nathia Gali Murree. Umda Hotel Montana provides stunning views and plenty of activities to keep you busy, and it's the perfect place to relax and rejuvenate. So, make sure to book your stay today!`
        )}
      </Typography>
      <Button 
  onClick={handleToggle} 
  variant="contained" 
  sx={{ 
    mt: 2, 
    padding: "4px 8px", 
    fontSize: "0.75rem", 
    minWidth: "auto" 
  }}
>
  {expanded ? "Read Less" : "Read More"}
</Button>


      <Typography  sx={{ mt: 4 }} fontWeight={"bold"}>
        Amenities
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
  {amenitiesList.map((amenity, index) => (
    <Grid item xs={6} sm={4} md={3} key={index}>
      <Box display="flex" alignItems="center">
        {amenity.icon}
        <Typography variant="body1" sx={{ ml: 1, fontSize: "12px" }}>
          {amenity.name}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>

    </Box>
  );
};

export default HotelDescription;
