"use client";
import SubHeader from "@/components/ui/SubHeader";
import { Box, List, ListItem, ListItemText, Typography, useMediaQuery } from "@mui/material";

const TermsAndConditionsPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <SubHeader heading={"Terms And Conditions"} />
      <Box paddingX={isMobScreen ? 2 : 15} paddingY={8}>
        <Typography variant="h6" fontWeight={"bold"}>
          Book with confidence - Specific Terms & Conditions:
        </Typography>
        <Typography variant="body2" paragraph>
          Bookings are non transferable. Name changes are not allowed. <br />
          The amount you have paid is used as credit towards a new booking.
          Should there be a difference in price you will need to pay the
          additional cost. <br />
          No refunds are made for any difference in cost, and no new credit is
          issued for unused amounts. <br />
          Your credit can only be used for accommodation and cannot be used for
          other services or products. <br />
          Only one change is allowed. No further changes will be allowed, no
          further credits issued, and no refunds made. <br />
          You must make the changes prior to your original travel date. <br />
          All other terms and conditions remain the same. <br />
          The "Book with Confidence" policy is a discretionary measure offered
          by Umda Hotels and can be withdrawn at any time without further
          notice.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Rate information:
        </Typography>
        <Typography variant="body2" paragraph>
          All quoted rates include Taxes. Free Wi-Fi and other amenities are
          included in all rates, unless otherwise stated. All rates are NET
          rates and are non-commissionable.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Early departure:
        </Typography>
        <Typography variant="body2" paragraph>
          If you wish to shorten your stay after you have checked-in at the
          hotel you must inform the hotel reception at least 48 hours prior to
          your departure. No refund is made for bookings within the 24-hour
          window.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          No-shows:
        </Typography>
        <Typography variant="body2" paragraph>
          It is the responsibility of the guest to inform the hotel of their
          non-arrival, even in a case of force majeure or other events outside
          of your reasonable control. If the hotel is not informed with at least
          24 hours' notice a late cancellation fee will be charged as described
          above.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Force Majeure:
        </Typography>
        <Typography variant="body2" paragraph>
          Please note that even in the event of a force majeure the hotel's
          cancellation policy still applies. Cancellations must be made in
          writing and confirmed by Umda to be valid. If you cancel by telephone,
          please ask the customer agent to send a cancellation confirmation and
          retain it for your records.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Our right to cancel:
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Fraud:</strong> Umda reserves the right to cancel bookings
          believed to be fraudulent, or are not in line with our terms &
          conditions or local law.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Non-payment:</strong> Umda reserves the right to cancel
          bookings if payment is not made for bookings when payment is required.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Breach of contract:</strong> Umda reserves the right to cancel
          bookings if you breach our contract in any other material way.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Failure to perform:</strong> Umda reserves the right to cancel
          your reservation if an event outside of our control will make it
          impossible for us to make your room available to you including, but
          not limited to, industrial action, fire, flooding, failure of power
          and electrical supplies, or force majeure.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Payment policy:
        </Typography>
        <Typography variant="body2" paragraph>
          Pre-paid bookings need to be paid with a credit/debit card,
          Easypaisa/JazzCash and in some cases we allow bank transfers. <br />
          We accept all major credit and debit cards. If you have a booking and
          you are paying for your stay upon arrival you may also pay in cash, we
          accept Rupees and US dollars. We do not accept payments in cheques.
          <br />
          Refunds for reservations or other services can only be made to the
          same payment method through which the payment was originally taken
          from.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Guarantee:
        </Typography>
        <Typography variant="body2" paragraph>
          If you do not have a prepaid booking, and you will be paying upon
          arrival, you will be required to provide Umda full payment for your
          stay. You also accept that Umda reserves the right to cancel bookings,
          without further notice, if a guarantee is not provided, or if the
          payment method is not valid.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Coupons:
        </Typography>
        <Typography variant="body2" paragraph>
          Umda gives away coupons which can be availed through our social media
          platforms or website blogs. Restrictions apply on when coupons can be
          redeemed, please see your coupon for details. <br />
          Coupons can only be redeemed in full, and must be redeemed when the
          booking is made. The same cancellation policy applies to bookings made
          with coupons as with Standard Rate bookings. In case of a no-show, or
          a late cancellation, the coupon will be redeemed in full and will not
          be valid for reuse.
          <br />
          All coupons are dated and may expire from the date of issue. <br />
          Coupons have no cash value and cannot be exchanged for cash, or used
          to pay for other services.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Check-in policy:
        </Typography>
        <Typography variant="body2" paragraph>
          Your room is available from 2pm local time. Early check-in might be
          possible, subject to availability.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Check-out policy:
        </Typography>
        <Typography variant="body2" paragraph>
          The room must be vacated by 12pm local time at the latest. Late
          check-out might be possible, subject to a surcharge.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Smoking policy:
        </Typography>
        <Typography variant="body2" paragraph>
          By law, all of our hotels are non-smoking throughout. Smoking inside
          our hotels is illegal and guests will be charged a 5,000 clean-up fee
          by the hotel.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Maximum occupancy of rooms:
        </Typography>
        <Typography variant="body2" paragraph>
          Each deluxe and standard room can accommodate maximum 2 persons. A
          maximum of 3 persons can be accommodated in the rooms if an extra
          mattress is booked, this includes children. An executive room can
          accommodate 4 persons + 1 person if an extra mattress is booked.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Minimum age of guests:
        </Typography>
        <Typography variant="body2" paragraph>
          Guests need to be at least 18 years old to make a reservation with us.
          This does not apply to children accompanied by an adult.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          ID documents:
        </Typography>
        <Typography variant="body2" paragraph>
          Every guest is required to provide a copy of their valid ID card or
          passport for check-in.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Unmarried couples:
        </Typography>
        <Typography variant="body2" paragraph>
          Umda does not allow unmarried couples with Pakistani ID cards due to
          the local laws. Guests may be required to provide proof of
          relationship if not stated in document.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Availability of the Room:
        </Typography>
        <Typography variant="body2" paragraph>
          Your room is kept until midnight on the day of arrival. We kindly ask
          you to inform the hotel if your expected arrival time is after
          midnight on the day of arrival.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Extra Mattress:
        </Typography>
        <Typography variant="body2" paragraph>
          All extra mattresses are subject to availability. Extra mattresses can
          only be placed in all rooms. A maximum of one extra mattress can be
          placed in each room. Please enquire about the availability of extra
          mattresses before making a reservation.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Children policy:
        </Typography>
        <Typography variant="body2" paragraph>
          Children 8 years old and younger stay free when using existing
          bedding, an extra mattress is required for children 12 years and
          younger when sharing a room with parents.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Special requests:
        </Typography>
        <Typography variant="body2" paragraph>
          We will strive to accommodate all special requests, including room
          allocation requests. However, all requests are subject to availability
          and cannot be guaranteed.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Group Reservation Policy:
        </Typography>
        <Typography variant="body2" paragraph>
          We are happy to accept group reservations of all sizes at all of our
          hotels. We consider a reservation of 10 rooms or more to be a group
          reservation however, we might consider a smaller number of rooms to be a
          group booking. We might also consider multiple smaller bookings made
          by the same reservation holder a group reservation. Group
          reservations, or reservations considered to be a group reservation,
          will have different cancellation policies and might be subject to
          prepayment. <br />
          To make a group reservation please contact our reservations office by
          emailing to info@umdahotels.com or by calling us at 0304-0305177.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Overbookings and relocations:
        </Typography>
        <Typography variant="body2" paragraph>
          We never willingly overbook our hotels. However, should your hotel for
          any reason become overbooked, for other reasons other than events
          outside of our reasonable control, and your room subsequently not be
          available to you we will:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Provide you with a room at a third party hotel." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Pay for reasonable transportation costs between your original hotel and your new accommodation." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Any reasonable costs over and above the original cost of your booking will be covered by Umda (meaning room rate, and transportation to your new accommodation)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Umda will not accept liability for any loss you believe you may have incurred as a result of this relocation." />
          </ListItem>
        </List>
        <Typography variant="h6" fontWeight={"bold"}>
          Transferability:
        </Typography>
        <Typography variant="body2" paragraph>
          Your booking is non-transferable. You may not resell your booking, or
          in any other way transfer your booking to a third party. You may not
          advertise, market, or in any other way offer any Umda Hotels room for
          sale. In such circumstances, the reservation will become null and void
          and Umda will not honor those reservations.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Contract:
        </Typography>
        <Typography variant="body2" paragraph>
          The contract between us is formed when we confirm your reservation. No
          contract is formed if a confirmation from us to you has not been
          received.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Applicable law:
        </Typography>
        <Typography variant="body2" paragraph>
          Our contract is governed and construed in accordance with the law of
          Pakistan and both parties submit to the exclusive jurisdiction of the
          Pakistan courts. No other law is applicable.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Our liability
        </Typography>
        <Typography variant="body2" paragraph>
          Umda does not accept liability for failure to meet any of our
          obligations to you if the failure is due to events beyond our
          reasonable control. If we fail to meet any of our obligations we shall
          only be reliable for direct losses and not for any indirect or
          consequential losses. Where we are liable to you our maximum liability
          to you shall not exceed the price of your reservation, unless
          otherwise stated by law. These terms and conditions do not affect your
          statutory rights. If any of these terms conflict with your statutory
          rights, then the statutory rights will prevail over these terms.
        </Typography>
      </Box>
    </>
  );
};

export default TermsAndConditionsPage;
