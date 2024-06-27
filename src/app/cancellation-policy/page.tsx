"use client"
import SubHeader from "@/components/ui/SubHeader";
import { Box, Typography, useMediaQuery } from "@mui/material";

const CancellationPolicyPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  return (
    <>
      <SubHeader heading={"Cancellation Policy"} />
      <Box paddingX={isMobScreen ? 3 : 15} paddingY={8}>
        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
          GENERAL CANCELLATION POLICIES
        </Typography>
        <Typography variant="body1" paragraph>
          Below are our general cancellation policies. Please note, different
          policies might apply to your booking. Please refer to your booking
          confirmation for further details. If you are a travel agent, please
          refer to your contract or booking confirmation for our cancellation
          policies. Those policies apply to all of your bookings unless
          specifically stated in your booking confirmation.
        </Typography>
        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
          STANDARD CANCELLATION POLICY:
        </Typography>
        <Typography variant="body1" paragraph>
          For individual bookings of less than 5 rooms, and bookings not
          considered a group tour, the following cancellation policy applies:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" paragraph>
              If cancelled at least 1 week prior to arrival no cancellation fee
              will be charged.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              If cancelled within 48-24 hours before arrival date a 50%
              cancellation fee applies.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              In case of no show-up 100% will be charged and no refund will be
              provided.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
          GROUP BOOKINGS:
        </Typography>
        <Typography variant="body1" paragraph>
          For bookings of more than 5 rooms our group cancellation policy will
          apply. If your group booking comes with a pre-payment condition the
          below cancellation policy will not apply.
        </Typography>
        <Typography variant="body1" paragraph>
          Cancellation fee:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" paragraph>
              If cancelled at least 4 weeks prior to arrival no cancellation fee
              will be charged.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              If cancelled between 2-4 weeks before arrival date a 15%
              cancellation fee applies.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              If cancelled between 1 week before arrival date a 35% cancellation
              fee applies.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              If cancelled within 48-24 hours before arrival date a 50%
              cancellation fee applies.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              In case of no show-up 100% cancellation fee applies.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
          PEAK DATES POLICY:
        </Typography>
        <Typography variant="body1" paragraph>
          On some peak dates through the year, different cancellation policies
          will apply to all bookings. Please refer to your booking confirmation
          for further details. Cancellation Policies are mentioned on invoice
          sent to your email or WhatsApp.
        </Typography>
      </Box>
    </>
  );
};

export default CancellationPolicyPage;
