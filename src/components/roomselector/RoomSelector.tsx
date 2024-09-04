import { Box, Typography } from "@mui/material";
import RoomSelectorCard from "../roomselectorcard/RoomSelectorCard";

import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";
import HotelGalaxyImage from "@/public/assets/images/hotel-galaxy.webp";
import HotelHorizonImage from "@/public/assets/images/hotel-horizan.webp";
import { StaticImageData } from "next/image";

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

interface RoomSelectorProps {
  roomData: RoomData[];
  selectedRooms: { checked: boolean; rooms: number; guests: number }[];
  onRoomSelection: (index: number, checked: boolean) => void;
  onRoomsChange: (index: number, rooms: number) => void;
  onGuestsChange: (index: number, guests: number) => void;
}

const RoomSelector = ({
  roomData,
  selectedRooms,
  onRoomSelection,
  onRoomsChange,
  onGuestsChange,
}: RoomSelectorProps) => {
  return (
    <Box sx={{ maxWidth: 800, margin: "32px auto", padding: 2 }}>
      <Typography  fontWeight={"bold"}>
        Choose your room
      </Typography>
      {roomData.map((room, index) => (
        <RoomSelectorCard
          key={index}
          room={room}
          selected={selectedRooms[index]}
          onRoomSelection={(checked) => onRoomSelection(index, checked)}
          onRoomsChange={(rooms) => onRoomsChange(index, rooms)}
          onGuestsChange={(guests) => onGuestsChange(index, guests)}
        />
      ))}
    </Box>
  );
};

export default RoomSelector;
