"use client";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface BookingData {
  _id: string;
  referenceNo: string;
  fullName: string;
  telephone: string;
  email: string;
  rooms: {
    roomName: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    roomsBooked: number;
    guests: number;
  }[];
  totalPrice: number;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  bookingStatus: string;
  paymentType: string;
  paymentStatus: string;
}

const BookingConfirmedContent = () => {
  // const searchParams = useSearchParams();
  const { id } = useParams(); // Extract the booking _id from the URL
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      //   const id = searchParams.get("city");
      try {
        console.log("data");
        const response = await fetch(`/api/booking/${id}`); // Make GET request to retrieve booking details
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setBookingData(data);
        } else {
          setError(data.message || "Failed to retrieve booking data.");
        }
      } catch (error) {
        setError("An error occurred while fetching booking data.");
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingData) {
    return <div>No booking data available</div>;
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        marginX: "auto",
        marginY: "50px", // Added vertical margin
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Booking Confirmed Icon and Text */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <CheckCircleIcon sx={{ color: "green", fontSize: 40 }} />
        <Typography variant="h6" fontWeight="bold" ml={1}>
          Booking Confirmed
        </Typography>
      </Box>

      {/* Booking ID and Date */}
      <Card
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          mb: 2,
        }}
      >
        <CardContent>
          <Typography variant="body2">
            Congratulations! You have successfully booked your stay at Umda.
          </Typography>
          <Typography variant="body2" mt={1}>
            <strong>Booking ID:</strong> {bookingData.referenceNo}
          </Typography>
          <Typography variant="body2">
            <strong>Booked On:</strong>{" "}
            {new Date(bookingData.bookingDate).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Booking Details
      </Typography>
      <Divider />
      <Box my={2}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Rooms:
        </Typography>
        {bookingData.rooms.map((room, index) => (
          <Box display="flex" justifyContent="space-between" key={index} mb={1}>
            <Typography variant="body2">{room.roomName}</Typography>
            <Typography variant="body2" fontWeight="bold">
              x{room.roomsBooked}
            </Typography>
          </Box>
        ))}
        <Typography variant="body2">
          <strong>Check-in:</strong>{" "}
          {new Date(bookingData.checkInDate).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Check-out:</strong>{" "}
          {new Date(bookingData.checkOutDate).toLocaleString()}
        </Typography>
      </Box>

      {/* Payment Summary */}
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Payment Summary
      </Typography>
      <Divider />
      <Box my={2}>
        {/* Subtotal */}
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          <strong>Total Price:</strong> Rs.{" "}
          {bookingData.totalPrice.toLocaleString()}
        </Typography>

        {/* Payment Type */}
        <Typography variant="body2" gutterBottom>
          <strong>Payment Type:</strong>{" "}
          {bookingData.paymentType === "onSite" ? "On Site" : "Online"}
        </Typography>

        {/* Payment Status */}
        <Typography variant="body2" fontWeight="bold">
          <strong>Payment Status:</strong>{" "}
          {bookingData.paymentStatus.charAt(0).toUpperCase() +
            bookingData.paymentStatus.slice(1)}
        </Typography>
      </Box>
    </Box>
  );
};

const BookingConfirmedPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BookingConfirmedContent />
  </Suspense>
);

export default BookingConfirmedPage;
