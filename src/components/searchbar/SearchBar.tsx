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
  CircularProgress,
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import { encrypt } from "@/utils/crypto";
import "./search.css";

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

const dateFormat = "MM-DD-YYYY";

const SearchBar = () => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state
  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [guests, setGuests] = useState<number | string>("");
  const [errors, setErrors] = useState({
    city: false,
    startDate: false,
    endDate: false,
    guests: false,
  });

  const today = dayjs();

  const validateInputs = () => {
    const newErrors = {
      city: !city,
      startDate: !startDate,
      endDate: !endDate,
      guests: !guests,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const createQueryString = (params: any) => {
    const queryString = new URLSearchParams(params).toString();
    return queryString;
  };

  const getAuthToken = async () => {
    try {
      const response = await fetch(`/api/bed-booking/auth-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      // Parse the response body only once
      const data = await response.json();

      // Check if the response was not ok and handle the error
      if (!response.ok) {
        throw new Error(`Error: ${data.message || response.statusText}`);
      }

      console.log("data", data);
      return data.encryptedToken; // Return the encrypted token if successful
    } catch (error) {
      console.error("Failed to fetch auth token:", error);
      return null; // Return null in case of error
    }
  };

  const handleSearch = async () => {
    console.log({
      city,
      checkInDate: startDate,
      checkOutDate: endDate,
      guests,
    });
    if (validateInputs()) {
      setLoading(true); // Start loading
      try {
        const encryptedToken = await getAuthToken(); // Get the encrypted token
        console.log(encryptedToken);

        const queryParams = {
          city,
          checkInDate: startDate ? startDate.format("YYYY-MM-DD") : "",
          checkOutDate: endDate ? endDate.format("YYYY-MM-DD") : "",
          guests: guests.toString(),
          token: encodeURIComponent(encryptedToken),
        };
        const queryString = new URLSearchParams(queryParams).toString();

        // Navigate to the results page
        router.push(`/hotel?${queryString}`);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false); // Stop loading after search is complete
      }
    }
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
    <Box>
      <Box paddingY={"10px"}>
        {isMobScreen ? (
          <Box
            bgcolor={"white"}
            borderRadius={2}
            marginTop={0}
            sx={{ width: "92%", mr: "auto", ml: "auto" }}
          >
            <Typography
              textAlign={"left"}
              color={"black"}
              paddingBottom={2}
              fontSize={16}
              fontWeight={"bold"}
            >
              Where do you wanna go ?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <HighlightedDaysContext.Provider
                value={{ highlightedDays, startDate: start, endDate: end }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        "Abbottabad",
                        "Islamabad",
                        // "Murree",
                        "Nathia Gali",
                      ]}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          error={errors.city}
                          helperText={
                            errors.city ? "Please select a city." : ""
                          }
                        />
                      )}
                      key={city}
                      defaultValue={city || null}
                      onChange={(_, newValue) => {
                        setCity(newValue ?? "");
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(newValue: Dayjs | null) => {
                            setStartDate(newValue);
                          }}
                          format={dateFormat} // Specify date format
                          slots={{
                            textField: (params) => (
                              <TextField
                                {...params}
                                error={errors.startDate}
                                helperText={
                                  errors.startDate
                                    ? "Please select a start date."
                                    : ""
                                }
                              />
                            ),
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
                          format={dateFormat} // Specify date format
                          slots={{
                            textField: (params) => (
                              <TextField
                                {...params}
                                error={errors.endDate}
                                helperText={
                                  errors.endDate
                                    ? "Please select an end date."
                                    : ""
                                }
                              />
                            ),
                            day: CustomDay,
                          }}
                          minDate={startDate ?? undefined}
                          views={["month", "day"]}
                        />
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      select
                      fullWidth
                      label="Guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      error={errors.guests}
                      helperText={
                        errors.guests
                          ? "Please select the number of guests."
                          : ""
                      }
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
                        backgroundColor: "#5391FA",
                      }}
                      disabled={loading} // Disable button when loading
                      startIcon={
                        loading ? <CircularProgress size={20} /> : null
                      }
                    >
                      {loading ? "Searching..." : "Search"}
                    </Button>
                  </Grid>
                </Grid>
              </HighlightedDaysContext.Provider>
            </LocalizationProvider>
          </Box>
        ) : (
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
                            // "Murree",
                            "Nathia Gali",
                          ]}
                          fullWidth
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="City"
                              error={errors.city}
                              helperText={
                                errors.city ? "Please select a city." : ""
                              }
                            />
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
                              format={dateFormat} // Specify date format
                              slots={{
                                textField: (params) => (
                                  <TextField
                                    {...params}
                                    error={errors.startDate}
                                    helperText={
                                      errors.startDate
                                        ? "Please select a start date."
                                        : ""
                                    }
                                  />
                                ),
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
                              format={dateFormat} // Specify date format
                              slots={{
                                textField: (params) => (
                                  <TextField
                                    {...params}
                                    error={errors.endDate}
                                    helperText={
                                      errors.endDate
                                        ? "Please select an end date."
                                        : ""
                                    }
                                  />
                                ),
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
                          error={errors.guests}
                          helperText={
                            errors.guests
                              ? "Please select the number of guests."
                              : ""
                          }
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
                          // color="primary"
                          fullWidth
                          onClick={handleSearch}
                          size="large"
                          sx={{
                            height: "100%",
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            backgroundColor: "#5391FA",
                          }}
                          disabled={loading} // Disable button when loading
                          startIcon={
                            loading ? <CircularProgress size={20} /> : null
                          }
                        >
                          {loading ? "Searching..." : "Search"}
                        </Button>
                      </Grid>
                    </Grid>
                  </HighlightedDaysContext.Provider>
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
