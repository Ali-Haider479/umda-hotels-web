"use client";

// import {
//   LocalizationProvider,
//   DateRangePicker,
//   DateRange,
// } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import HeroImage from "@/public/assets/images/hero-image.webp";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import useMediaQuery from '@mui/material/useMediaQuery';

const HighlightedDaysContext = createContext<{
  highlightedDays: string[];
  startDate: string | null;
  endDate: string | null;
}>({ highlightedDays: [], startDate: null, endDate: null });

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-selectedStart": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-selectedEnd": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-inRange": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const CustomDay = (props: PickersDayProps<Dayjs>) => {

  const { day, outsideCurrentMonth, ...other } = props;
  const { highlightedDays, startDate, endDate } = useContext(
    HighlightedDaysContext
  );

  const isStartDate =
    !outsideCurrentMonth && day.format("YYYY-MM-DD") === startDate;
  const isEndDate =
    !outsideCurrentMonth && day.format("YYYY-MM-DD") === endDate;
  const isInRange =
    !outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      className={
        isStartDate
          ? "Mui-selectedStart"
          : isEndDate
          ? "Mui-selectedEnd"
          : isInRange
          ? "Mui-inRange"
          : ""
      }
      selected={isStartDate || isEndDate || isInRange}
    />
  );
};

const SearchBar = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [guests, setGuests] = useState<number | string>("");

  const today = dayjs();

  const handleSearch = () => {
    // Implement search functionality here
    console.log({
      city,
      checkInDate: startDate,
      checkOutDate: endDate,
      guests,
    });
  };

  const getHighlightedDays = () => {
    if (!startDate || !endDate)
      return { highlightedDays: [], startDate: null, endDate: null };
    const dates = [];
    let current = startDate.startOf("day");
    while (current.isBefore(endDate.startOf("day"))) {
      dates.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
    return {
      highlightedDays: dates,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
  };

  const {
    highlightedDays,
    startDate: start,
    endDate: end,
  } = getHighlightedDays();

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
        {isMobScreen ? (  <Box
          bgcolor={"white"}
          borderRadius={2}
          marginTop={4}
          sx={{ width: "90%", maxWidth: 1000, py: 3, pl:5}}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HighlightedDaysContext.Provider
              value={{ highlightedDays, startDate: start, endDate: end }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10} sm={6} md={3}>
                  <Autocomplete
                    disablePortal
                    options={[
                      "Abbottabad",
                      "Islamabad",
                      "Murree",
                      "Nathia Gali",
                    ]}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="City" />
                    )}
                    key={city}
                    defaultValue={city || null}
                    onChange={(_, newValue) => {
                      setCity(newValue ?? "");
                    }}
                  />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue: Dayjs | null) => {
                          setStartDate(newValue);
                        }}
                        slots={{
                          textField: (params) => <TextField {...params} />,
                          day: CustomDay,
                        }}
                        minDate={today}
                        views={["month", "day"]}
                      />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1 }}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue: Dayjs | null) => {
                          setEndDate(newValue);
                        }}
                        slots={{
                          textField: (params) => <TextField {...params} />,
                          day: CustomDay,
                        }}
                        minDate={startDate ?? undefined} 
                        views={["month", "day"]}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={10} sm={6} md={2}>
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
                <Grid item xs={10} sm={6} md={3}>
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
            </HighlightedDaysContext.Provider>
          </LocalizationProvider>
        </Box>) : (  <Box
          bgcolor={"white"}
          borderRadius={2}
          marginTop={4}
          
          sx={{ width: "100%", maxWidth: 1000, mx: "auto", px: 2, py: 3 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HighlightedDaysContext.Provider
              value={{ highlightedDays, startDate: start, endDate: end }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10} sm={6} md={3}>
                  <Autocomplete
                    disablePortal
                    options={[
                      "Abbottabad",
                      "Islamabad",
                      "Murree",
                      "Nathia Gali",
                    ]}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="City" />
                    )}
                    key={city}
                    defaultValue={city || null}
                    onChange={(_, newValue) => {
                      setCity(newValue ?? "");
                    }}
                  />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue: Dayjs | null) => {
                          setStartDate(newValue);
                        }}
                        slots={{
                          textField: (params) => <TextField {...params} />,
                          day: CustomDay,
                        }}
                        minDate={today}
                        views={["month", "day"]}
                      />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1 }}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue: Dayjs | null) => {
                          setEndDate(newValue);
                        }}
                        slots={{
                          textField: (params) => <TextField {...params} />,
                          day: CustomDay,
                        }}
                        minDate={startDate ?? undefined} 
                        views={["month", "day"]}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={10} sm={6} md={2}>
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
                <Grid item xs={10} sm={6} md={3}>
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
            </HighlightedDaysContext.Provider>
          </LocalizationProvider>
        </Box>)}
      
      </Box>
    </Box>
  );
};

export default SearchBar;
