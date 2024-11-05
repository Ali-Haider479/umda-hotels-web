import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

interface RoomCheckboxProps {
  rooms: number;
  guests: number;
  availableRooms: number;
  onRoomsChange: (change: number) => void;
  onGuestsChange: (change: number) => void;
  fontSizeSmall?: boolean;
}

const RoomCheckbox: React.FC<RoomCheckboxProps> = ({
  rooms,
  guests,
  availableRooms,
  onRoomsChange,
  onGuestsChange,
  fontSizeSmall,
}) => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const isDisabled = rooms === 0 && availableRooms === 0;

  return (
    <>
      {isMobScreen ? (
        <Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Box display="flex" alignItems="center" mr={fontSizeSmall ? 1 : 4}>
              <Typography
                variant="body1"
                sx={{
                  ml: fontSizeSmall ? 1 : 2,
                  mr: fontSizeSmall ? 1 : 2,
                  fontSize: fontSizeSmall ? "0.6rem" : "0.6rem",
                  fontWeight: fontSizeSmall ? "bold" : "normal",
                }} // Adjust font size
              >
                Rooms
              </Typography>
              <Button
                variant="outlined"
                onClick={() => onRoomsChange(-1)}
                disabled={isDisabled || rooms <= 0}
                sx={{
                  minWidth: fontSizeSmall ? "25px" : "30px",
                  //  minHeight: fontSizeSmall ? "5px" : "20px",
                  color: "black",
                  borderColor: "black",
                  fontSize: "0.6rem",
                  lineHeight: fontSizeSmall ? "12px" : "15px",
                  padding: "4px", // Adjust padding
                }}
              >
                -
              </Button>
              <Typography
                variant="body1"
                sx={{
                  ml: fontSizeSmall ? 0.5 : 2,
                  mr: fontSizeSmall ? 0.5 : 2,
                  fontSize: fontSizeSmall ? "0.6rem" : "0.6rem",
                }} // Adjust font size
              >
                {rooms}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => onRoomsChange(1)}
                disabled={isDisabled || rooms >= availableRooms}
                sx={{
                  lineHeight: fontSizeSmall ? "12px" : "15px",

                  minWidth: fontSizeSmall ? "25px" : "30px",
                  color: "black",
                  borderColor: "black",
                  fontSize: isMobScreen ? "0.8rem" : "1rem", // Adjust font size
                  padding: isMobScreen ? "4px" : "8px", // Adjust padding
                }}
              >
                +
              </Button>
            </Box>

            {/* Guests Section */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                sx={{
                  mr: fontSizeSmall ? 0.5 : 2,
                  fontSize: fontSizeSmall ? "0.6rem" : "0.6rem",
                  fontWeight: fontSizeSmall ? "bold" : "normal",
                }} // Adjust font size
              >
                Guests
              </Typography>
              <Button
                variant="outlined"
                onClick={() => onGuestsChange(-1)}
                sx={{
                  lineHeight: fontSizeSmall ? "12px" : "15px",

                  minWidth: fontSizeSmall ? "25px" : "30px",
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
                sx={{
                  ml: fontSizeSmall ? 0.5 : 2,
                  mr: fontSizeSmall ? 0.5 : 2,
                  fontSize: isMobScreen ? "0.8rem" : "1rem",
                }} // Adjust font size
              >
                {guests}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => onGuestsChange(1)}
                sx={{
                  lineHeight: fontSizeSmall ? "12px" : "15px",

                  minWidth: fontSizeSmall ? "25px" : "30px",
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
          {availableRooms !== 0 && !fontSizeSmall ? (
            <Typography color="green" sx={{ fontSize: "1rem", mt: 1 }}>
              Rooms {availableRooms} Available
            </Typography>
          ) : null}

          {availableRooms === 0 && (
            <Typography color="red" sx={{ fontSize: "1rem", mt: 1 }}>
              Room Not Available
            </Typography>
          )}
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
          {availableRooms !== 0 && !fontSizeSmall ? (
            <Typography color="green" sx={{ fontSize: "1rem", mt: 1 }}>
              Rooms {availableRooms} Available
            </Typography>
          ) : null}
          {availableRooms === 0 && (
            <Typography color={"red"}>Room Not Avaiable</Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default RoomCheckbox;
