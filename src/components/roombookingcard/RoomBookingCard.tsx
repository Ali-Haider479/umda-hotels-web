import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import { DatePicker } from "@mui/x-date-pickers";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import RoomCheckbox from "../roomcheckbox/RoomCheckbox";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import InputMask from "react-input-mask";

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

interface RoomState {
  name: string;
  checked: boolean;
  rooms: number;
  guests: number;
  price: number;
  availableRooms: number;
}

interface RoomData {
  roomName: string;
  bedCount: number;
  peopleCount: number;
  childCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: StaticImageData[]; // Assuming images are URLs or paths to the images
  availableRooms: number;
}

interface RoomBookingProps {
  roomData: RoomData[];
  selectedRooms: {
    checked: boolean;
    rooms: number;
    guests: number;
    discountedPrice: number;
    availableRooms: number;
    roomName: string;
  }[];
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  onRoomSelection: (index: number, checked: boolean) => void;
  onRoomsChange: (index: number, change: number) => void;
  onGuestsChange: (index: number, change: number) => void;
  applyDatesChange: () => void;
  paymentOption: string;
  setPaymentOption: (value: string) => void;
  advancePayment: number;
  setAdvancePayment: (value: number) => void;
}

const RoomBookingCard = ({
  roomData,
  selectedRooms,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onRoomSelection,
  onRoomsChange,
  onGuestsChange,
  applyDatesChange,
  paymentOption,
  setPaymentOption,
  advancePayment,
  setAdvancePayment,
}: RoomBookingProps) => {
  const { data: session } = useSession();
  console.log("Session", session);
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const today = dayjs();
  const router = useRouter();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [telephoneError, setTelephoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  // const [paymentOption, setPaymentOption] = useState("full");
  // const [advancePayment, setAdvancePayment] = useState(0);

  useEffect(() => {
    if (session?.user) {
      setFullName(`${session.user.firstName} ${session.user.lastName}`);
      setFirstName(session.user.firstName ?? ""); // Default to an empty string if undefined
      setLastName(session.user.lastName ?? ""); // Default to an empty string if undefined
      setTelephone(session.user.telephone ?? ""); // Default to an empty string if undefined
      setEmail(session.user.email ?? ""); // Default to an empty string if undefined
    }
  }, [session]);

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, room) => {
      if (room.checked) {
        return total + room.discountedPrice * room.rooms;
      }
      return total;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const calculateAdvancePayment = (totalPrice: number) => {
    // Assuming 30% of the total price is required as an advance payment
    return totalPrice * 0.3;
  };

  const handlePaymentOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedOption = event.target.value;
    setPaymentOption(selectedOption);
    if (selectedOption === "advance") {
      setAdvancePayment(calculateAdvancePayment(totalPrice));
    } else {
      setAdvancePayment(0);
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

  // Validate the telephone number format
  const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
    if (!/^\+92 \d{3} \d{7}$/.test(e.target.value)) {
      setTelephoneError(true);
    } else {
      setTelephoneError(false);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBookNow = async () => {
    // Check if any required fields are empty
    if (!firstName || !lastName || !telephone || !email) {
      setFormError("All fields are required.");
      return;
    }

    // Check if the telephone is valid
    if (telephoneError) {
      setFormError("Please enter a valid telephone number.");
      return;
    }

    // Check if the email is valid
    if (!validateEmail(email)) {
      setEmailError(true);
      setFormError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(false);
    }

    // Check if at least one room is selected (checked = true)
    const isRoomSelected = selectedRooms.some((room) => room.checked === true);

    if (!isRoomSelected) {
      setFormError("You must select at least one room to proceed.");
      return;
    }

    const userId = session?.user?.id; // Get user ID if available from session

    // If all validations pass, submit the form
    setFormError("");
    setLoading(true); // Start loading

    // Prepare booking data
    const bookingData = {
      userId,
      firstName,
      lastName,
      telephone,
      email,
      selectedRooms,
      startDate,
      endDate,
      totalPrice,
      paymentType: "onSite",
    };

    try {
      // Make the POST request to the booking API endpoint
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/booking-confirmed/${data._id}`);
        // Handle successful booking
        console.log("Booking successful:", data);
        // You can add a success message or redirect to a confirmation page
      } else {
        // Handle error response
        setFormError(data.message || "An error occurred while booking.");
        console.error("Booking failed:", data);
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again later.");
      console.error("Booking error:", error);
    } finally {
      setLoading(false); // Stop loading after request is complete
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "16px auto", padding: 2 }}>
      <CardContent sx={{ marginTop: "-30px" }}>
        {!isMobScreen ? (
          <Box>
            {" "}
            <Grid
              container
              alignItems="center"
              spacing={1}
              sx={{ marginLeft: "0px" }}
            >
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
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    4.2
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h6">Very Good</Typography>
                <Typography variant="body2" color="text.secondary">
                  1566 Reviews
                </Typography>
              </Grid>
            </Grid>{" "}
            <Grid container alignItems="center" pb={2} spacing={1}>
              <Grid item>
                <CheckCircleIcon fontSize="small" color="success" />
              </Grid>
              <Grid item>
                <Typography fontSize={"20px"}>76% guests rated 4+</Typography>
              </Grid>
              <Grid item>
                <CheckCircleIcon fontSize="small" color="success" />
              </Grid>
              <Grid item>
                <Typography fontSize={"20px"}>86% guests recommend</Typography>
              </Grid>
            </Grid>{" "}
            <Divider sx={{ my: 2 }} />
          </Box>
        ) : null}
        {/* <Divider sx={{ my: 2 }} /> */}

        <Box sx={{ paddingTop: isMobScreen ? 5 : 0 }} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HighlightedDaysContext.Provider
            value={{ highlightedDays, startDate: start, endDate: end }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ marginLeft: isMobScreen ? "5px" : "0px" }}
            >
              {!isMobScreen ? (
                <>
                  {" "}
                  <Grid item xs={12} md={5} ml={isMobScreen ? 5 : 0}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue: Dayjs | null) => {
                        setStartDate(newValue);
                      }}
                      slots={{
                        textField: (params) => (
                          <TextField
                            {...params}
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: isMobScreen ? "1rem" : "1rem", // Adjust font size if needed
                                padding: isMobScreen ? "8px" : "8px", // Adjust padding
                                width: isMobScreen ? "100%" : "auto", // Decrease width on mobile
                                height: isMobScreen ? "auto" : "auto", // Adjust height if needed
                              },
                            }}
                          />
                        ),
                        day: CustomDay,
                      }}
                      minDate={today}
                    />
                  </Grid>
                  <Grid item xs={12} md={5} ml={isMobScreen ? 5 : 0}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue: Dayjs | null) => {
                        setEndDate(newValue);
                      }}
                      slots={{
                        textField: (params) => (
                          <TextField
                            {...params}
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: isMobScreen ? "1rem" : "1rem", // Adjust font size if needed
                                padding: isMobScreen ? "8px" : "8px", // Adjust padding
                                width: isMobScreen ? "100%" : "auto", // Decrease width on mobile
                                height: isMobScreen ? "auto" : "auto", // Adjust height if needed
                              },
                            }}
                          />
                        ),
                        day: CustomDay,
                      }}
                      minDate={startDate ?? undefined}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {" "}
                  <Typography textAlign={"left"} ml={-2} fontWeight={"bold"}>
                    Guest Details
                  </Typography>
                  <Box display="flex">
                    <Grid mt={2} item xs={12} md={5} ml={isMobScreen ? -3 : 0}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue: Dayjs | null) => {
                          setStartDate(newValue);
                        }}
                        slots={{
                          textField: (params) => (
                            <TextField
                              {...params}
                              sx={{
                                "& .MuiInputBase-root": {
                                  fontSize: isMobScreen ? "1rem" : "1rem", // Adjust font size if needed
                                  padding: isMobScreen ? "8px" : "8px", // Adjust padding
                                  width: isMobScreen ? "100%" : "auto", // Decrease width on mobile
                                  height: isMobScreen ? "40px" : "auto", // Adjust height if needed
                                },
                              }}
                            />
                          ),
                          day: CustomDay,
                        }}
                        minDate={today}
                      />
                    </Grid>
                    <Grid item mt={2} xs={12} md={5} ml={isMobScreen ? 5 : 0}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue: Dayjs | null) => {
                          setEndDate(newValue);
                        }}
                        slots={{
                          textField: (params) => (
                            <TextField
                              {...params}
                              sx={{
                                "& .MuiInputBase-root": {
                                  fontSize: isMobScreen ? "1rem" : "1rem", // Adjust font size if needed
                                  padding: isMobScreen ? "8px" : "8px", // Adjust padding
                                  width: isMobScreen ? "100%" : "auto", // Decrease width on mobile
                                  height: isMobScreen ? "40px" : "auto", // Adjust height if needed
                                },
                              }}
                            />
                          ),
                          day: CustomDay,
                        }}
                        minDate={startDate ?? undefined}
                      />
                    </Grid>
                  </Box>{" "}
                </>
              )}

              {!isMobScreen ? (
                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{ marginRight: isMobScreen ? "80px" : "0px" }}
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    width="100%"
                    height={"52px"}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={applyDatesChange}
                      sx={{
                        width: isMobScreen ? "80%" : "auto", // Increase width to full on mobile view
                        // fontSize: isMobScreen ? "1.2rem" : "1rem", // Optional: Increase font size on mobile view
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{ marginRight: isMobScreen ? "80px" : "0px" }}
                >
                  <Box pl={2} width="100%" height={"52px"}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={applyDatesChange}
                    >
                      Apply
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </HighlightedDaysContext.Provider>
        </LocalizationProvider>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ maxWidth: 600, margin: "16px auto" }}>
          {selectedRooms.map((roomState, index) => (
            <Box key={roomState.roomName} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roomState.checked}
                    onChange={() => onRoomSelection(index, !roomState.checked)}
                    name={roomState.roomName}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    sx={{ fontSize: isMobScreen ? "0.875rem" : "1rem" }} // Responsive font size
                  >
                    {`${roomState.roomName}`}
                  </Typography>
                }
              />
              {roomState.checked && (
                <RoomCheckbox
                  rooms={roomState.rooms}
                  guests={roomState.guests}
                  onRoomsChange={(change) => onRoomsChange(index, change)}
                  onGuestsChange={(change) => onGuestsChange(index, change)}
                  availableRooms={roomState.availableRooms}
                />
              )}
            </Box>
          ))}
        </Box>
        {isMobScreen ? (
          <Box display="flex" justifyContent="space-between">
            {" "}
            <Typography fontSize={18} fontWeight="bold" mt={0.5}>
              Total Price
            </Typography>
            <Typography variant="h5" color="primary">
              Rs. {totalPrice}
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Box>
              <Typography fontSize={isMobScreen ? "14px" : "18px"}>
                Recommended For You
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Rooms:{" "}
                {selectedRooms
                  .filter((room) => room.checked)
                  .reduce((total, room) => total + room.rooms, 0)}{" "}
                | Total Guests:{" "}
                {selectedRooms
                  .filter((room) => room.checked)
                  .reduce((total, room) => total + room.guests, 0)}
              </Typography>
            </Box>
            <Typography variant="h5" color="primary">
              Rs. {totalPrice}
            </Typography>
          </Box>
        )}

        {showBookingForm ? (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {/* First Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ mb: isMobScreen ? 0.5 : 2 }}
                  disabled={session?.user ? true : false}
                />
              </Grid>

              {/* Last Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ mb: 2 }}
                  disabled={session?.user ? true : false}
                />
              </Grid>
            </Grid>
            <InputMask
              mask="+\92 999 9999999"
              value={telephone}
              onChange={handleTelephoneChange}
            >
              {/* @ts-ignore */}
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  fullWidth
                  id="telephone"
                  label="Telephone"
                  variant="outlined"
                  error={telephoneError} // Show error state
                  helperText={telephoneError ? "Invalid telephone number" : ""} // Show helper text if there's an error
                  sx={{ mb: 2 }}
                />
              )}
            </InputMask>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              disabled={session?.user ? true : false}
            />
            {/* <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Payment Option</FormLabel>
              <RadioGroup
                aria-label="payment"
                value={paymentOption}
                onChange={handlePaymentOptionChange}
                name="payment-option"
              >
                <FormControlLabel
                  value="full"
                  control={<Radio />}
                  label="Pay Full"
                />
                <FormControlLabel
                  value="advance"
                  control={<Radio />}
                  label="Pay Advance"
                />
              </RadioGroup>
            </FormControl>
            {paymentOption === "advance" && (
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                Advance Payment: Rs. {advancePayment}
              </Typography>
            )} */}

            {/* Error Message Display */}
            {formError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {formError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBookNow}
              disabled={loading} // Disable button when loading
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setShowBookingForm(true)}
          >
            Continue Booking
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomBookingCard;
