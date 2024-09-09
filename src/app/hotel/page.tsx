"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RoomBookingCard from "@/components/roombookingcard/RoomBookingCard";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Image, { StaticImageData } from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//Images imports
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";
import HotelGalaxyImage from "@/public/assets/images/hotel-galaxy.webp";
import HotelHorizonImage from "@/public/assets/images/hotel-horizan.webp";
import HotelDescription from "@/components/hoteldescription/HotelDescription";
import RoomSelector from "@/components/roomselector/RoomSelector";
import HotelPolicyInfo from "@/components/hotelpolicyinfo/HotelPolicyInfo";
import HotelCarousel from "@/components/hotelcarousel/HotelCarousel";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { decrypt } from "@/utils/crypto";
dayjs.extend(isBetween);

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
      images: [HotelMontanaImage, HotelGalaxyImage, HotelHorizonImage],
      availableRooms: 5,
      rooms: ["1317801", "1317802", "1317803", "1317804", "1317805"],
    },
    {
      roomName: "Deluxe Room Twin Bed with Balcony",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 12500,
      discountedPrice: 9999,
      discountPercentage: 20,
      images: [HotelGalaxyImage, HotelHorizonImage, HotelMontanaImage],
      availableRooms: 4,
      rooms: ["1317795", "1317796", "1317797", "1317798"],
    },
    {
      roomName: "Deluxe Room with Balcony",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 12500,
      discountedPrice: 9999,
      discountPercentage: 20,
      images: [HotelHorizonImage, HotelMontanaImage, HotelGalaxyImage],
      availableRooms: 6,
      rooms: ["1317788", "1317789", "1317790", "1317791", "1317792", "1317794"],
    },
    {
      roomName: "Executive Family Room with Bunk Beds",
      bedCount: 2,
      peopleCount: 2,
      childCount: 1,
      originalPrice: 12500,
      discountedPrice: 9999,
      discountPercentage: 20,
      images: [HotelHorizonImage, HotelMontanaImage, HotelGalaxyImage],
      availableRooms: 2,
      rooms: ["1317786", "1317787"],
    },
  ];

  const [selectedRooms, setSelectedRooms] = useState(
    roomData.map((room) => ({
      ...room,
      checked: false,
      rooms: 1,
      guests: 1,
    }))
  );

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [calendarId, setCalendarId] = useState("");

  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("city");
    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const guests = searchParams.get("guests");
    const encryptedToken = searchParams.get("token");
    console.log(" Token:", encryptedToken);
    // const decryptedToken = decrypt(encryptedToken);
    // console.log("Decrypted Token:", decryptedToken);
    if (encryptedToken) {
      fetchBedBookingCalendarId(encryptedToken);
    } else {
      console.error("Token is null");
    }

    console.log("SLUG", id, checkInDate, checkOutDate, guests);
    setStartDate(dayjs(checkInDate));
    setEndDate(dayjs(checkOutDate));
  }, [searchParams]);

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
      fetchRoomReservationsList(data.items[0].id_calendar);
      setCalendarId(data.items[0].id_calendar);
    } catch (error: any) {
      console.error("Failed to fetch auth token:", error);
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
      console.log(data);

      // Check if the response was not ok and handle the error
      if (!response.ok) {
        throw new Error(`Error: ${data.message || response.statusText}`);
      }

      console.log("data", data);
      const updatedRoomData = updateRoomAvailability(
        roomData,
        data.items,
        checkInDate,
        checkOutDate
      );
      console.log(updatedRoomData);
      setSelectedRooms(
        updatedRoomData.map((room) => ({
          ...room,
          checked: false,
          rooms: room.availableRooms,
          guests: 1,
        }))
      );
      setPageLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch auth token:", error);
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
    const updatedRoomData = roomData.map((room) => {
      const availableRooms = room.rooms.filter((roomId: string) => {
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
          <HotelCarousel />
          <Grid container spacing={2} sx={{ padding: 2 }} columns={16}>
            <Grid item xs={16} md={8}>
              <HotelDescription />
              <RoomSelector
                roomData={roomData}
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
                roomData={roomData}
                selectedRooms={selectedRooms}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onRoomSelection={handleRoomSelection}
                onRoomsChange={handleRoomsChange}
                onGuestsChange={handleGuestsChange}
                applyDatesChange={applyDatesChange}
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
                Total Price: <strong>Rs. 9999</strong>
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
