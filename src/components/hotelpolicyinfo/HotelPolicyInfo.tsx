import { Box, Divider, List, ListItem, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";

const HotelPolicyInfo = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <Box sx={{ maxWidth: 800, margin: "32px auto", padding: 2 }}>
      <Typography fontSize={isMobile ? "15px" : "20px"} fontWeight="bold" gutterBottom>
        Hotel Policies
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ flex: 1, textAlign: "center" }}
        >
          <Typography fontSize={isMobile ? "13px" : "20px"}  fontWeight="bold" sx={{ mr: 1 }}>
            Check-in:
          </Typography>
          <Typography fontSize={isMobile ? "13px" : "20px"}  color="primary">
            02:00 pm
          </Typography>
        </Box>
        {/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ flex: 1, textAlign: "center" }}
        >
          <Typography fontSize={isMobile ? "13px" : "20px"}  fontWeight="bold" sx={{ mr: 1 }}>
            Check-out:
          </Typography>
          <Typography fontSize={isMobile ? "13px" : "20px"}  color="primary">
            12:00 pm
          </Typography>
        </Box>
      </Box>

    <List style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
      <ListItem style={{ display: 'list-item' }}>
        <Typography fontSize={isMobile ? '12px' : 'inherit'} marginBottom={-5}>
          For further details click here:{" "}
          <Link href={"/terms-and-conditions"} target="_blank">
            Terms & Conditions
          </Link>
        </Typography>
      </ListItem>
      <ListItem style={{ display: 'list-item' }} >
        <Typography fontSize={isMobile ? '12px' : 'inherit'} marginBottom={-5}>
          For further details click here:{" "}
          <Link href={"/cancellation-policy"} target="_blank">
            Cancellation Policy
          </Link>
        </Typography>
      </ListItem>
      <ListItem style={{ display: 'list-item' }}>
        <Typography fontSize={isMobile ? '12px' : 'inherit'}>
          For further details click here:{" "}
          <Link href={"/privacy-policy"} target="_blank">
            Privacy Policy
          </Link>
        </Typography>
      </ListItem>
    </List>
    </Box>
  );
};

export default HotelPolicyInfo;
