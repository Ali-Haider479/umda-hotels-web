import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import UmdaLogo from "@/public/assets/icons/logo.svg";

const NewsLetterCard = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      p={4} // padding to add some spacing inside the outer box
      sx={{
        border: "2px solid #ccc", // Add border
        borderRadius: "8px", // Add border radius for rounded corners
        paddingY: "0px",
        paddingX: "24px",
        width: "100%",
        maxWidth: "900px", // Set a maximum width for the card
        margin: "0 auto", // Center the card horizontally
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt={5}
        mb={4} // margin bottom to add space between the two inner boxes
        width="100%"
      >
        <Image
          src={UmdaLogo}
          alt="Umda Company Logo"
          className="umda-hotel-logo"
        />
        <Box textAlign="center" ml={2}>
          <Typography variant="h6" fontWeight={"bold"}>
            Get access to exclusive deals
          </Typography>
          <Typography variant="subtitle1">
            Only the best deals reach your inbox
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <TextField
          label="Your Email"
          placeholder="e.g., john@email.com"
          sx={{ width: "400px" }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            height: "100%",
            paddingTop: "14px",
            paddingBottom: "14px",
            ml: 2,
          }}
        >
          Notify
        </Button>
      </Box>
    </Box>
  );
};

export default NewsLetterCard;
