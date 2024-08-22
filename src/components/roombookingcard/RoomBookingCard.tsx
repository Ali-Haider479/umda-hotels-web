import React, { createContext, useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
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
}: RoomBookingProps) => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const today = dayjs();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentOption, setPaymentOption] = useState("full");
  const [advancePayment, setAdvancePayment] = useState(0);

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

  return (
    <Card sx={{ maxWidth: 600, margin: "16px auto", padding: 2 }}>
      <CardContent sx={{marginTop: "-30px"}}>
        <Grid container alignItems="center" spacing={1} sx={{marginLeft: isMobScreen ? "40px" : "0px"}}>
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
              <Typography variant="body2" sx={{ ml: 0.5 }} >
                4.2
              </Typography>
            </Box>
          </Grid>
          <Grid item  >
            <Typography variant="h6">Very Good</Typography>
            <Typography variant="body2" color="text.secondary">
              1566 Reviews
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1} sx={{ mt: 1, marginLeft: isMobScreen ? "40px" : "0px" }}>
          <Grid item>
            <CheckCircleIcon fontSize="small" color="success" />
          </Grid>
          <Grid item>
            <Typography variant="body2">76% guests rated 4+</Typography>
          </Grid>
          <Grid item>
            <CheckCircleIcon fontSize="small" color="success" />
          </Grid>
          <Grid item>
            <Typography variant="body2">86% guests recommend</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HighlightedDaysContext.Provider
            value={{ highlightedDays, startDate: start, endDate: end }}
          >
            <Grid container spacing={2} alignItems="center" sx={{marginLeft: isMobScreen ? "5px" : "0px"}} >
            <Grid item xs={12} md={5}>
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
            '& .MuiInputBase-root': {
              fontSize: isMobScreen ? '1.2rem' : '1rem', // Increase font size on mobile
              padding: isMobScreen ? '12px' : '8px',   // Increase padding on mobile
            },
          }}
        />
      ),
      day: CustomDay,
    }}
    minDate={today}
  />
</Grid>
<Grid item xs={12} md={5}>
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
            '& .MuiInputBase-root': {
              fontSize: isMobScreen ? '1.2rem' : '1rem', // Increase font size on mobile
              padding: isMobScreen ? '12px' : '8px',   // Increase padding on mobile
            },
          }}
        />
      ),
      day: CustomDay,
    }}
    minDate={startDate ?? undefined}
  />
</Grid>
<Grid item xs={12} md={2} sx={{ marginRight: isMobScreen ? "80px" : "0px" }}>
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
                label={`${roomState.roomName} (Price/Night: ${roomState.discountedPrice})`}
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

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Box>
            <Typography variant="subtitle1">Recommended For You</Typography>
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

        {showBookingForm ? (
          <Box sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl component="fieldset" sx={{ mb: 2 }}>
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
            )}
            <Button variant="contained" color="primary" fullWidth>
              Book Now
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
