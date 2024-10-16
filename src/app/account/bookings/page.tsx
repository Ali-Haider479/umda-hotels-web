"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

// Row component to display booking details and collapse for room information
function Row({ booking }: { booking: any }) {
  const [open, setOpen] = useState(false);

  // Function to render user-friendly strings
  const formatEnum = (value: string, type: string) => {
    switch (type) {
      case "paymentType":
        return value === "onSite" ? "On-Site" : "Online";
      case "paymentStatus":
        return value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
      case "bookingStatus":
        return value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
      default:
        return value;
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {booking.rooms.map((room: any) => room.roomName).join(", ")}
        </TableCell>
        <TableCell align="right">
          {dayjs(booking.checkInDate).format("YYYY-MM-DD")}
        </TableCell>
        <TableCell align="right">
          {dayjs(booking.checkOutDate).format("YYYY-MM-DD")}
        </TableCell>
        <TableCell align="right">{booking.totalPrice}</TableCell>
        <TableCell align="right">{booking.referenceNo}</TableCell>
        <TableCell align="right">
          {formatEnum(booking.paymentType, "paymentType")}
        </TableCell>
        <TableCell align="right">
          {formatEnum(booking.paymentStatus, "paymentStatus")}
        </TableCell>
        <TableCell align="right">
          {formatEnum(booking.bookingStatus, "bookingStatus")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Rooms Information
              </Typography>
              <Table size="small" aria-label="rooms">
                <TableHead>
                  <TableRow>
                    <TableCell>Room Name</TableCell>
                    <TableCell align="right">Guests</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {booking.rooms.map((room: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{room.roomName}</TableCell>
                      <TableCell align="right">{room.guests}</TableCell>
                      <TableCell align="right">
                        {room.discountedPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const BookingsPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session || !session.user?.isAdmin) return;
      try {
        const response = await fetch(`/api/booking`); // Replace with your dynamic user ID
        const data = await response.json();
        console.log(data);
        setBookings(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Room Name</TableCell>
              <TableCell align="right">Check-in Date</TableCell>
              <TableCell align="right">Check-out Date</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Reference No.</TableCell>
              <TableCell align="right">Payment Type</TableCell>
              <TableCell align="right">Payment Status</TableCell>
              <TableCell align="right">Booking Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <Row key={index} booking={booking} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingsPage;
