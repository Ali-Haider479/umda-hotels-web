import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BedIcon from "@mui/icons-material/Bed";
import PeopleIcon from "@mui/icons-material/People";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import Image, { StaticImageData } from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RoomCheckbox from "../roomcheckbox/RoomCheckbox";
import { useMediaQuery } from "@mui/material";

interface RoomData {
  roomName: string;
  bedCount: number;
  peopleCount: number;
  childCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: StaticImageData[];
  availableRooms: number;
}

interface RoomSelectorCardProps {
  room: RoomData;
  selected: { checked: boolean; rooms: number; guests: number };
  onRoomSelection: (checked: boolean) => void;
  onRoomsChange: (rooms: number) => void;
  onGuestsChange: (guests: number) => void;
}

const RoomSelectorCard: React.FC<RoomSelectorCardProps> = ({
  room,
  selected,
  onRoomSelection,
  onRoomsChange,
  onGuestsChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeTransition, setFadeTransition] = useState(false);
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  const handleNext = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % room.images.length);
      setFadeTransition(false);
    }, 500);
  };

  const handlePrev = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length
      );
      setFadeTransition(false);
    }, 500);
  };

  return (
    <Card sx={{ maxWidth: 1000, margin: "16px auto", padding: 2 }}>
      <Grid container spacing={2} direction={isMobScreen ? "column" : "row"}>
        {/* Room Information */}
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {room.roomName}
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <BedIcon />
              <Typography variant="body2" sx={{ mx: 1 }}>
                x{room.bedCount}
              </Typography>
              <PeopleIcon />
              <Typography variant="body2" sx={{ mx: 1 }}>
                x{room.peopleCount}
              </Typography>
              <ChildCareIcon />
              <Typography variant="body2" sx={{ mx: 1 }}>
                x{room.childCount}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <span style={{ textDecoration: "line-through", color: "grey" }}>
                Rs. {room.originalPrice}
              </span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                {" "}
                Rs. {room.discountedPrice}
              </span>{" "}
              per night{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                {room.discountPercentage}% off!
              </span>
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onRoomSelection(!selected.checked)}
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                width: "150px",
                backgroundColor: selected.checked ? "lightgrey" : "white",
                borderColor: "grey",
              }}
            >
              {selected.checked ? (
                <>
                  Selected <CheckCircleIcon sx={{ color: "green" }} />
                </>
              ) : (
                "Select Room"
              )}
            </Button>
            {selected.checked && (
              <RoomCheckbox
                rooms={selected.rooms}
                guests={selected.guests}
                onRoomsChange={(change) => onRoomsChange(change)}
                onGuestsChange={(change) => onGuestsChange(change)}
                availableRooms={room.availableRooms}
              />
            )}
          </CardContent>
        </Grid>

        {/* Room Image */}
        <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: isMobScreen ? "200px" : "220px",
              marginTop: isMobScreen ? "16px" : "0",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "white",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "opacity 0.5s",
                opacity: fadeTransition ? 0.3 : 1,
              }}
            >
              <Image
                src={room.images[currentIndex]}
                alt={`hotel image ${currentIndex + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                style={{
                  borderRadius: 5,
                }}
              />
            </Box>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "white",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RoomSelectorCard;
