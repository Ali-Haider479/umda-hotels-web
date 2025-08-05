"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RoomBookingCard from "@/components/roombookingcard/RoomBookingCard";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";

import Image, { StaticImageData } from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//Images imports
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";
import HotelGalaxyImage from "@/public/assets/images/hotel-galaxy.webp";
import HotelHorizonImage from "@/public/assets/images/hotel-horizan.webp";
//Montana Images
//Economy Room with Balcony
import MontanaEcoRoomWithBalconyImg1 from "@/public/assets/montana-images/economy-room-with-balcony/2.webp";
import MontanaEcoRoomWithBalconyImg2 from "@/public/assets/montana-images/economy-room-with-balcony/4.webp";
//Deluxe Room Twin Bed with Balcony
import MontanaDelxRoomWithBalconyImg1 from "@/public/assets/montana-images/deluxe-twin-bed-with-balcony/1.webp";
import MontanaDelxRoomWithBalconyImg2 from "@/public/assets/montana-images/deluxe-twin-bed-with-balcony/2.webp";
import MontanaDelxRoomWithBalconyImg3 from "@/public/assets/montana-images/deluxe-twin-bed-with-balcony/3.webp";
import MontanaDelxRoomWithBalconyImg4 from "@/public/assets/montana-images/deluxe-twin-bed-with-balcony/5.webp";
import MontanaDelxRoomWithBalconyImg5 from "@/public/assets/montana-images/deluxe-twin-bed-with-balcony/9.webp";
//Deluxe Room with Balcony
import MontanaDelxDuoBedRoomWithBalconyImg1 from "@/public/assets/montana-images/deluxe-double-bed-with-balcony/3.webp";
import MontanaDelxDuoBedRoomWithBalconyImg2 from "@/public/assets/montana-images/deluxe-double-bed-with-balcony/4.webp";
import MontanaDelxDuoBedRoomWithBalconyImg3 from "@/public/assets/montana-images/deluxe-double-bed-with-balcony/5.webp";
import MontanaDelxDuoBedRoomWithBalconyImg4 from "@/public/assets/montana-images/deluxe-double-bed-with-balcony/7.webp";
//Executive Family Room with Bunk Beds
import MontanaExeRoomImg1 from "@/public/assets/montana-images/executive-family-room/2.webp";
import MontanaExeRoomImg2 from "@/public/assets/montana-images/executive-family-room/4.webp";
import MontanaExeRoomImg3 from "@/public/assets/montana-images/executive-family-room/5.webp";
import MontanaExeRoomImg4 from "@/public/assets/montana-images/executive-family-room/6.webp";
import MontanaExeRoomImg5 from "@/public/assets/montana-images/executive-family-room/6_1.webp";

import HotelDescription from "@/components/hoteldescription/HotelDescription";
import RoomSelector from "@/components/roomselector/RoomSelector";
import HotelPolicyInfo from "@/components/hotelpolicyinfo/HotelPolicyInfo";
import HotelCarousel from "@/components/hotelcarousel/HotelCarousel";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { decrypt } from "@/utils/crypto";
dayjs.extend(isBetween);

type FullRoomType = {
  _id: string;
  roomName: string;
  bedCount: number;
  peopleCount: number;
  childCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  availableRooms: number;
  roomIds: string[];
  guests: number;
  rooms: number;
  checked: boolean;
};

interface Heading {
  title: string;
  description: string;
}

interface Amenity {
  name: string;
  icon: string;
}

type BaseRoomType = Omit<FullRoomType, "guests" | "rooms" | "checked">;

interface Hotel {
  name: string;
  address: string;
  city: string;
  headings: Heading[];
  rating: number;
  reviews: number;
  amenities: Amenity[];
  mainImage: string;
  carouselImages: string[];
  rooms: BaseRoomType[];
  createdAt?: Date;
  updatedAt?: Date;
}

const RoomContent = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const roomData = [
    {
      roomName: "Economy Room with Balcony",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 9999,
      discountedPrice: 7999,
      discountPercentage: 20,
      images: [MontanaEcoRoomWithBalconyImg1, MontanaEcoRoomWithBalconyImg2],
      availableRooms: 5,
      roomIds: ["1317801", "1317802", "1317803", "1317804", "1317805"],
    },
    {
      roomName: "Deluxe Room Twin Bed with Balcony",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 12500,
      discountedPrice: 9999,
      discountPercentage: 20,
      images: [
        MontanaDelxRoomWithBalconyImg1,
        MontanaDelxRoomWithBalconyImg2,
        MontanaDelxRoomWithBalconyImg3,
        MontanaDelxRoomWithBalconyImg4,
        MontanaDelxRoomWithBalconyImg5,
      ],
      availableRooms: 4,
      roomIds: ["1317795", "1317796", "1317797", "1317798"],
    },
    {
      roomName: "Deluxe Room with Balcony",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 12500,
      discountedPrice: 9999,
      discountPercentage: 20,
      images: [
        MontanaDelxDuoBedRoomWithBalconyImg1,
        MontanaDelxDuoBedRoomWithBalconyImg2,
        MontanaDelxDuoBedRoomWithBalconyImg3,
        MontanaDelxDuoBedRoomWithBalconyImg4,
      ],
      availableRooms: 6,
      roomIds: [
        "1317788",
        "1317789",
        "1317790",
        "1317791",
        "1317792",
        "1317794",
      ],
    },
    {
      roomName: "Executive Family Room with Bunk Beds",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 12500,
      discountedPrice: 9999,
      discountPercentage: 20,
      images: [
        MontanaExeRoomImg1,
        MontanaExeRoomImg2,
        MontanaExeRoomImg3,
        MontanaExeRoomImg4,
        MontanaExeRoomImg5,
      ],
      availableRooms: 2,
      roomIds: ["1317786", "1317787"],
    },
  ];

  const [hotelData, setHotelData] = useState<Hotel | null>(null)
  const [roomsData, setRoomsData] = useState<BaseRoomType[]>([])

  const [selectedRooms, setSelectedRooms] = useState<FullRoomType[]>([]);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [calendarId, setCalendarId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<string | null>("");
  const [reservationData, setReservationData] = useState<any>(null);

  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentOption, setPaymentOption] = useState("full");
  const [advancePayment, setAdvancePayment] = useState(0);

  const handleWhatsAppClick = () => {
    // Open WhatsApp with a default message
    if (cityId === "Islamabad") {
      window.open(
        "https://wa.me/923045416758?text=Hello! I would like to know more about Umda Hotels."
      );
    } else {
      window.open(
        "https://wa.me/923319145021?text=Hello! I would like to know more about Umda Hotels."
      );
    }
  };
  const handleCallClick = () => {
    // Implement your call functionality here
    window.location.href = "tel:+92-321-1111082";
  };

  useEffect(() => {
    const id = searchParams.get("city");
    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const guests = searchParams.get("guests");
    const encryptedToken = searchParams.get("token");
    console.log(" Token:", encryptedToken);
    // const decryptedToken = decrypt(encryptedToken);
    // console.log("Decrypted Token:", decryptedToken);
    if (id) {
      fetchHotelDetails(id)
    }
    if (encryptedToken) {
      fetchBedBookingCalendarId(encryptedToken);
    } else {
      console.error("Token is null");
      // If no token, we won't get reservation data, so stop loading after hotel data loads
      // This will be handled by the useEffect that watches roomsData
    }

    console.log("SLUG", id, checkInDate, checkOutDate, guests);
    setCityId(id);
    setStartDate(dayjs(checkInDate));
    setEndDate(dayjs(checkOutDate));
    
    // Set a timeout to stop loading after 10 seconds as a fallback
    const timeoutId = setTimeout(() => {
      setPageLoading(false);
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  // Apply reservation data when both rooms data and reservation data are available
  useEffect(() => {
    if (roomsData && roomsData.length > 0 && reservationData) {
      const updatedRoomData = updateRoomAvailability(
        roomsData,
        reservationData.items,
        reservationData.checkInDate,
        reservationData.checkOutDate
      );
      console.log("Applying reservation data to rooms:", updatedRoomData);
      setSelectedRooms(
        updatedRoomData.map((room) => ({
          ...room,
          checked: false,
          rooms: 1,
          guests: 1,
        }))
      );
      setPageLoading(false);
    } else if (roomsData && roomsData.length > 0 && !reservationData) {
      // If we have rooms data but no reservation data, still show the page
      setPageLoading(false);
    }
  }, [roomsData, reservationData]);

  const fetchHotelDetails = async (city: string) => {
    try {
      const response = await fetch(`/api/hotel/find-by-city/${city}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Parse the response body only once
      const data = await response.json();
      console.log("HOTEL", data,data[0].rooms);
      setHotelData(data[0])
      setRoomsData(data[0].rooms)
      setSelectedRooms(data[0].rooms.map((room: any) => ({
        ...room,
        checked: false,
        rooms: 1,
        guests: 1,
      })))
      
      // After hotel data is loaded, fetch room reservations if we have a calendar ID
      if (calendarId !== null) {
        fetchRoomReservationsList(calendarId);
      }
      
      // If we already have reservation data, apply it immediately
      if (reservationData) {
        const updatedRoomData = updateRoomAvailability(
          data[0].rooms,
          reservationData.items,
          reservationData.checkInDate,
          reservationData.checkOutDate
        );
        setSelectedRooms(
          updatedRoomData.map((room) => ({
            ...room,
            checked: false,
            rooms: 1,
            guests: 1,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      setPageLoading(false);
    }
  }

  console.log("selectedRooms total", selectedRooms)

  const fetchBedBookingCalendarId = async (bearerToken: string) => {
    try {
      const response = await fetch(`/api/bed-booking/calendar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bearerToken }),
      });

      // Parse the response body only once
      const data = await response.json();
      console.log(data);

      // Check if the response was not ok and handle the error
      if (!response.ok) {
        throw new Error(`Error: ${data.message || response.statusText}`);
      }

      console.log("data", data);
      const newCalendarId = data.items[0].id_calendar;
      setCalendarId(newCalendarId);
      
      // If we already have rooms data, fetch reservations immediately
      if (roomsData && roomsData.length > 0) {
        fetchRoomReservationsList(newCalendarId);
      }
    } catch (error: any) {
      console.error("Failed to fetch auth token:", error);
      setPageLoading(false);
      return error.message || error; // Return null in case of error
    }
  };

  const fetchRoomReservationsList = async (calendarId: number) => {
    try {
      const checkInDate = searchParams.get("checkInDate");
      const checkOutDate = searchParams.get("checkOutDate");
      const bearerToken = searchParams.get("token");
      const response = await fetch(`/api/bed-booking/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bearerToken,
          calendarId,
          checkInDate,
          checkOutDate,
        }),
      });

      // Parse the response body only once
      const data = await response.json();

      // Check if the response was not ok and handle the error
      if (!response.ok) {
        throw new Error(`Error: ${data.message || response.statusText}`);
      }

      console.log("data", data);
      
      // Store reservation data for later use
      setReservationData({
        items: data.items,
        checkInDate,
        checkOutDate
      });
      
      // Only update room availability if we have roomsData
      if (roomsData && roomsData.length > 0) {
        const updatedRoomData = updateRoomAvailability(
          roomsData,
          data.items,
          checkInDate,
          checkOutDate
        );
        console.log(updatedRoomData);
        setSelectedRooms(
          updatedRoomData.map((room) => ({
            ...room,
            checked: false,
            rooms: 1,
            // rooms: room.availableRooms,
            guests: 1,
          }))
        );
      }
      setPageLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch auth token:", error);
      setPageLoading(false);
      return error.message || error; // Return null in case of error
    }
  };

  const convertUnixToDate = (unixTime: string) => {
    return dayjs.unix(parseInt(unixTime)).format("YYYY-MM-DD");
  };

  // Function to update room availability
  const updateRoomAvailability = (
    roomData: any[],
    bookedRooms: any[],
    checkInDate: string | null,
    checkOutDate: string | null
  ) => {
    console.log("Update rooms", roomData, bookedRooms)
    const updatedRoomData = roomData.map((room) => {
      const availableRooms = room.roomIds.filter((roomId: string) => {
        const isBooked = bookedRooms.some((booking) => {
          if (booking.id_room === roomId) {
            const bookingStartDate = convertUnixToDate(booking.start_time);
            const bookingEndDate = convertUnixToDate(booking.end_time);

            return (
              dayjs(checkInDate).isBetween(
                bookingStartDate,
                bookingEndDate,
                "day",
                "[]"
              ) ||
              dayjs(checkOutDate).isBetween(
                bookingStartDate,
                bookingEndDate,
                "day",
                "[]"
              ) ||
              (dayjs(bookingStartDate).isBetween(
                checkInDate,
                checkOutDate,
                "day",
                "[]"
              ) &&
                dayjs(bookingEndDate).isBetween(
                  checkInDate,
                  checkOutDate,
                  "day",
                  "[]"
                ))
            );
          }
          return false;
        });

        return !isBooked;
      });
      console.log("Available Rooms", availableRooms);

      return {
        ...room,
        availableRooms: availableRooms.length,
        rooms: availableRooms,
      };
    });

    return updatedRoomData;
  };

  const handleRoomSelection = (index: number, checked: boolean) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.map((room, i) =>
        i === index ? { ...room, checked } : room
      )
    );
  };

  const handleRoomsChange = (index: number, change: number) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.map((room, i) =>
        i === index
          ? { ...room, rooms: Math.max(1, room.rooms + change) }
          : room
      )
    );
  };

  const handleGuestsChange = (index: number, change: number) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.map((room, i) =>
        i === index
          ? { ...room, guests: Math.max(1, room.guests + change) }
          : room
      )
    );
  };

  const applyDatesChange = () => {
    const checkInDate = dayjs(startDate).format("YYYY-MM-DD");
    const checkOutDate = dayjs(endDate).format("YYYY-MM-DD");

    const city = searchParams.get("city");
    const guests = searchParams.get("guests");
    const encryptedToken = searchParams.get("token");

    // Ensure the token is a string
    const token = encryptedToken ? encryptedToken : "";

    // Ensure all values are strings
    const queryParams: Record<string, string> = {
      city: city ?? "",
      checkInDate: checkInDate ?? "",
      checkOutDate: checkOutDate ?? "",
      guests: guests ?? "",
      token: token,
    };
    console.log(queryParams);

    const queryString = new URLSearchParams(queryParams).toString();

    // Assuming router.push is your method to navigate
    router.push(`/hotel?${queryString}`);
  };

  console.log(startDate, endDate);

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, room) => {
      if (room.checked) {
        return total + room.discountedPrice * room.rooms;
      }
      return total;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <>
      {pageLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <HotelCarousel cityId={cityId} hotelImages={hotelData?.carouselImages}/>
          <Grid container spacing={2} sx={{ padding: 2 }} columns={16}>
            <Grid item xs={16} md={8}>
              <HotelDescription cityId={cityId} hotelData={hotelData}/>
              <RoomSelector
                roomData={roomsData}
                selectedRooms={selectedRooms}
                onRoomSelection={handleRoomSelection}
                onRoomsChange={handleRoomsChange}
                onGuestsChange={handleGuestsChange}
              />
              {!isMobScreen && <HotelPolicyInfo />}
            </Grid>
            <Grid
              item
              md={8}
              xs={16}
              sx={{
                position: "sticky",
                top: 20,
                alignSelf: "flex-start",
                paddingBottom: isMobScreen ? "50px" : "0px",
              }}
            >
              <RoomBookingCard
                // roomData={roomsData}
                selectedRooms={selectedRooms}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onRoomSelection={handleRoomSelection}
                onRoomsChange={handleRoomsChange}
                onGuestsChange={handleGuestsChange}
                applyDatesChange={applyDatesChange}
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                advancePayment={advancePayment}
                setAdvancePayment={setAdvancePayment}
              // calendarId={calendarId}
              />
              {isMobScreen && <HotelPolicyInfo />}{" "}
              {/* Display under RoomBookingCard on mobile */}
            </Grid>
          </Grid>
          {isMobScreen && (
            <Box
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                padding: "15px 0",
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                position: "fixed",
                bottom: 0,
                width: "100%",
                boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Typography>
                Total Price:{" "}
                <strong>
                  Rs. {paymentOption === "full" ? totalPrice : advancePayment}
                </strong>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 10px",
                  fontSize: "12px",
                  textTransform: "none",
                }}
              >
                Book Now and Pay Later
              </Button>
            </Box>
          )}

          <Fab
            color="success"
            aria-label="call"
            onClick={handleCallClick}
            sx={{
              position: "fixed",
              bottom: isMobScreen ? 160 : 100, // Adjust bottom padding here
              right: isMobScreen ? 19 : 24, // Position on the right side
              backgroundColor: "#E74C3C",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#C0392B",
              },
            }}
          >
            <CallIcon />
          </Fab>
          <Fab
            color="success"
            aria-label="whatsapp"
            onClick={handleWhatsAppClick}
            sx={{
              position: "fixed",
              bottom: isMobScreen ? 90 : 24, // Adjust bottom padding here
              right: isMobScreen ? 19 : 24, // Position on the right side
              backgroundColor: "#25D366",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1ebe57",
              },
            }}
          >
            <WhatsAppIcon />
          </Fab>
        </>
      )}
    </>
  );
};

const RoomPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RoomContent />
  </Suspense>
);

export default RoomPage;
