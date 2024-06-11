"use client";

import {
  LocalizationProvider,
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import HeroImage from "@/public/assets/images/hero-image.webp";
import React from "react";
import { Dayjs } from "dayjs";

const SearchBar = () => {
  const [city, setCity] = useState<string>("");
  const [dates, setDates] = useState<DateRange<Dayjs>>([null, null]);
  const [guests, setGuests] = useState<number | string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSearch = () => {
    // Implement search functionality here
    console.log({
      city,
      checkInDate: dates[0],
      checkOutDate: dates[1],
      guests,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${HeroImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        width: "100%",
        height: "auto",
      }}
    >
      <Box paddingY={"100px"}>
        <Typography
          textAlign={"center"}
          color={"white"}
          variant="h4"
          fontWeight={"bold"}
        >
          Where do you wanna go ?
        </Typography>
        <Box
          bgcolor={"white"}
          borderRadius={2}
          marginTop={4}
          sx={{ width: "100%", maxWidth: 1000, mx: "auto", px: 2, py: 3 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DateRangePicker
                  localeText={{ start: "Check-in", end: "Check-out" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSearch}
                  size="large"
                  sx={{
                    height: "100%",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;
