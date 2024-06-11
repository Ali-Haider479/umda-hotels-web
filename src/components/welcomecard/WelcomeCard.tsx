"use client";
import { Box, Grid, Typography } from "@mui/material";
import Carousel from "../ui/Carousel";

const WelcomeCard = () => {
  const imageArray = [
    "https://via.placeholder.com/600x300?text=Slide+1",
    "https://via.placeholder.com/600x300?text=Slide+2",
    "https://via.placeholder.com/600x300?text=Slide+3",
  ];

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        textAlign={"center"}
        paddingTop={5}
      >
        Welcome to Umda Hotels
      </Typography>
      <Grid
        container
        spacing={25}
        alignItems="center"
        justifyContent="center"
        paddingTop={5}
        px={10}
      >
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Umda Guest House, in Khaira Gali, is a home designed and decorated
            by a Wood Artisan. Completely unique and artistic creations and
            fixtures are a signature of RockyMist. It is tucked away in peaceful
            mountain resort overlooking the Great Murree Mountains and valleys.
            Totally serene and peaceful. You can enjoy snow in Winters and nifty
            weather in summers. Just an hour and a half drive from the capital
            city Islamabad and only half an hour away from the highest peaks of
            Murree and its skiing resort, Malam Jabba. A fantastic prestigious
            location amongst the hills and greens with springs, flora and fauna.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Carousel images={imageArray} width="100%" height="300px" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeCard;
