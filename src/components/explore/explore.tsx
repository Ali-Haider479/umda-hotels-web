"use client";

import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';


const destinations = [
  { name: "Near me", src: "/path/to/near_me_icon.png" },
  { name: "Islamabad", src: "/path/to/islamabad_icon.png" },
  { name: "Ayubia", src: "/path/to/ayubia_icon.png" },
  { name: "Nathia Gali", src: "/path/to/nathia_gali_icon.png" }
];

const Explore = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h6" gutterBottom>
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
    </Box>
  );
};

export default Explore;
