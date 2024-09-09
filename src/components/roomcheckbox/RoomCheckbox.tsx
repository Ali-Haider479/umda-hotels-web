import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

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
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const isDisabled = rooms === 0 && availableRooms === 0;

  return (
    <>
      {isMobScreen ? (
        <Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Typography
              variant="body1"
              sx={{ mr: 2, fontSize: "0.6rem" }} // Adjust font size
            >
              Rooms
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onRoomsChange(-1)}
              disabled={isDisabled || rooms <= 0}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: "0.6rem",
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              -
            </Button>
            <Typography
              variant="body1"
              sx={{ mx: 2, fontSize: "0.6rem" }} // Adjust font size
            >
              {rooms}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onRoomsChange(1)}
              disabled={isDisabled || rooms >= availableRooms}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: "0.6rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              +
            </Button>
            {availableRooms === 0 && (
              <Typography color={"red"} marginLeft={4}>
                Room Not Avaiable
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Typography
              variant="body1"
              sx={{ mr: 2, fontSize: "0.6rem" }} // Adjust font size
            >
              Guests
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onGuestsChange(-1)}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: "0.6rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              -
            </Button>
            <Typography
              variant="body1"
              sx={{ mx: 2, fontSize: isMobScreen ? "0.8rem" : "1rem" }} // Adjust font size
            >
              {guests}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onGuestsChange(1)}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: isMobScreen ? "0.8rem" : "1rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              +
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={4} sx={{ mt: 2 }}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              sx={{ mr: 2, fontSize: isMobScreen ? "0.8rem" : "1rem" }} // Adjust font size
            >
              Rooms
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onRoomsChange(-1)}
              disabled={isDisabled || rooms <= 0}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: isMobScreen ? "0.8rem" : "1rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              -
            </Button>
            <Typography
              variant="body1"
              sx={{ mx: 2, fontSize: isMobScreen ? "0.8rem" : "1rem" }} // Adjust font size
            >
              {rooms}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onRoomsChange(1)}
              disabled={isDisabled || rooms >= availableRooms}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: isMobScreen ? "0.8rem" : "1rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              +
            </Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              sx={{ mr: 2, fontSize: isMobScreen ? "0.8rem" : "1rem" }} // Adjust font size
            >
              Guests
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onGuestsChange(-1)}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: isMobScreen ? "0.8rem" : "1rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              -
            </Button>
            <Typography
              variant="body1"
              sx={{ mx: 2, fontSize: isMobScreen ? "0.8rem" : "1rem" }} // Adjust font size
            >
              {guests}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onGuestsChange(1)}
              sx={{
                minWidth: 30,
                color: "black",
                borderColor: "black",
                fontSize: isMobScreen ? "0.8rem" : "1rem", // Adjust font size
                padding: isMobScreen ? "4px" : "8px", // Adjust padding
              }}
            >
              +
            </Button>
          </Box>
          {availableRooms === 0 && (
            <Typography color={"red"}>Room Not Avaiable</Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default RoomCheckbox;
