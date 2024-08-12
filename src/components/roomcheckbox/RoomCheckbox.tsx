import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface RoomCheckboxProps {
  rooms: number;
  guests: number;
  availableRooms: number;
  onRoomsChange: (change: number) => void;
  onGuestsChange: (change: number) => void;
}

const RoomCheckbox: React.FC<RoomCheckboxProps> = ({
  rooms,
  guests,
  availableRooms,
  onRoomsChange,
  onGuestsChange,
}) => {
  const isDisabled = rooms === 0 && availableRooms === 0;
  return (
    <Box display="flex" alignItems="center" gap={4} sx={{ mt: 2 }}>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ mr: 2 }}>
          Rooms
        </Typography>
        <Button
          variant="outlined"
          onClick={() => onRoomsChange(-1)}
          disabled={isDisabled || rooms <= 0}
          sx={{ minWidth: 30, color: "black", borderColor: "black" }}
        >
          -
        </Button>
        <Typography variant="body1" sx={{ mx: 2 }}>
          {rooms}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => onRoomsChange(1)}
          // disabled={rooms >= availableRooms}
          disabled={isDisabled || rooms >= availableRooms}
          sx={{ minWidth: 30, color: "black", borderColor: "black" }}
        >
          +
        </Button>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ mr: 2 }}>
          Guests
        </Typography>
        <Button
          variant="outlined"
          onClick={() => onGuestsChange(-1)}
          sx={{ minWidth: 30, color: "black", borderColor: "black" }}
        >
          -
        </Button>
        <Typography variant="body1" sx={{ mx: 2 }}>
          {guests}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => onGuestsChange(1)}
          sx={{ minWidth: 30, color: "black", borderColor: "black" }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default RoomCheckbox;
