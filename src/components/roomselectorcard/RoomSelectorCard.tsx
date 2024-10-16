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
    <>
      {isMobScreen ? (
        <Card sx={{ maxWidth: 1000, margin: "16px auto ", height: "195px" }}>
          <Grid container mb={2}>
            {/* Room Details */}
            <Grid item xs={4} md={8}>
              <Box sx={{ marginTop: "16px", marginLeft: "8px" }}>
                <Typography
                  fontSize={"14px"}
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    width: "205px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                  }}
                >
                  {room.roomName}
                </Typography>

                <Box display="flex" alignItems="center" mt={1}>
                  <BedIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize={"16px"} sx={{ mx: 1 }}>
                    x{room.bedCount}
                  </Typography>
                  <PeopleIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize={"16px"} sx={{ mx: 1 }}>
                    x{room.peopleCount}
                  </Typography>
                  <ChildCareIcon sx={{ fontSize: 16 }} />
                  <Typography fontSize={"16px"} sx={{ mx: 1 }}>
                    x{room.childCount}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Room Image */}
            <Grid
              item
              xs={4}
              md={4}
              ml={"80px"}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "120px",
                  marginTop: isMobScreen ? "16px" : "0",
                }}
              >
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: 25,
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
                    width: "135px",
                    height: "100%",
                    transition: "opacity 0.5s",
                    opacity: fadeTransition ? 0.3 : 1,
                    marginLeft: "30px",
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
                    right: -45,
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

            {/* New Row for Checkbox and Button */}
            <Grid container spacing={2} alignItems="center">
              {/* Room Checkbox */}
              <Grid item xs={8}>
                {selected.checked && (
                  <RoomCheckbox
                    rooms={selected.rooms}
                    guests={selected.guests}
                    onRoomsChange={(change) => onRoomsChange(change)}
                    onGuestsChange={(change) => onGuestsChange(change)}
                    availableRooms={room.availableRooms}
                    fontSizeSmall={true}
                  />
                )}
              </Grid>

              {/* Select Room Button */}
              <Grid item xs={4} container mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => onRoomSelection(!selected.checked)}
                  sx={{
                    backgroundColor: selected.checked ? "lightgrey" : "white",
                    fontSize: 9,
                    px: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {selected.checked ? (
                    <>
                      Selected{" "}
                      <CheckCircleIcon
                        sx={{ color: "green", fontSize: 14, ml: 1 }}
                      />
                    </>
                  ) : (
                    "Select Room"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 1000, margin: "16px auto", padding: 2 }}>
          <Grid
            container
            spacing={2}
            direction={isMobScreen ? "column" : "row"}
          >
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
                  <span
                    style={{ textDecoration: "line-through", color: "grey" }}
                  >
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
            <Grid
              item
              xs={12}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: isMobScreen ? "300px" : "220px",
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
      )}
    </>
  );
};

export default RoomSelectorCard;
