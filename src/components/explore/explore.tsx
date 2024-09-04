"use client";

import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


const destinations = [
  { name: "Near me", src: "https://umdahotels.com/home_images/30.webp" },
  { name: "Islamabad", src: "https://islamabad.comsats.edu.pk/assets/img/islamabad.jpeg" },
  { name: "Ayubia", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhUMiTmldAfupPr46OVswfbo2aX8HembGvvw&s.jpeg" },
  { name: "Nathia Gali", src: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/w_400,h_250,c_fill/v1617894191/landmark_images/xdhyud9loen3emrumbvh.jpeg" }
];

const Explore = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  return (
    <>
    {isMobScreen ?   <Box >
    <Typography pl={2} pb={1} fontWeight={"bold"} gutterBottom>
      Explore your next destination
    </Typography>
    <Grid container spacing={3} marginTop={1} justifyContent="center">
      {destinations.map((destination) => (
        <Grid item key={destination.name}>
          <Box>
            <Avatar
              alt={destination.name}
              src={destination.src}
              sx={{ width: 60, height: 60, margin: 'auto' }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {destination.name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box> : null}
   </>
  );
};

export default Explore;
