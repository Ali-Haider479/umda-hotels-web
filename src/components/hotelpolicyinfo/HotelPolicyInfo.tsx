import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";

const HotelPolicyInfo = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: "32px auto", padding: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
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
          <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
            Check-in:
          </Typography>
          <Typography variant="body1" color="primary">
            02:00 pm
          </Typography>
        </Box>
        {/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ flex: 1, textAlign: "center" }}
        >
          <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
            Check-out:
          </Typography>
          <Typography variant="body1" color="primary">
            12:00 pm
          </Typography>
        </Box>
      </Box>

      <Typography>
        For futther details click here:{" "}
        <Link href={"/terms-and-conditions"} target="_blank">
          Terms & Conditions
        </Link>
      </Typography>
    </Box>
  );
};

export default HotelPolicyInfo;
