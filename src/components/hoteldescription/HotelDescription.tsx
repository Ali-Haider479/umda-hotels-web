"use client";
import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const amenitiesList = [
  { name: "Flat TV", icon: <TvIcon /> },
  { name: "Heater", icon: <FireplaceIcon /> },
  { name: "Internet - Wifi", icon: <WifiIcon /> },
  { name: "Parking", icon: <LocalParkingIcon /> },
  { name: "Restaurant in Ayubia", icon: <RestaurantIcon /> },
];

interface HotelDescriptionProps {
  cityId: string | null;
}

interface Amenity {
  name: string;
  icon: JSX.Element;
}

interface HotelInfo {
  name: string;
  address: string;
  firstHeading: string;
  firstHeadingDescription: string;
  secondHeading: string;
  secondHeadingDescription: string;
  thirdHeading: string;
  thirdHeadingDescription: string;
  fourthHeading: string;
  fourthHeadingDescription: string;

  rating: number;
  reviews: number;
  amenities: Amenity[];
}

interface HotelDescriptionProps {
  cityId: string | null;
}

const hotelData: Record<string, HotelInfo> = {
  Abbottabad: {
    name: "Umda Hotel Montana",
    address: "Opposite Ayubia Chairlift, Ayubia, Abbotabad, KPK",
    firstHeading: "Umda Hotel Montana - Best Hotel in Ayubia",
    firstHeadingDescription:
      "Are you looking for the perfect hotel in Ayubia that offers the best hotel rates in Murree? Look no further than one of the best hotels in Ayubia, near Nathia Gali Murree. Umda Hotel Montana provides stunning views and plenty of activities to keep you busy, and it's the perfect place to relax and rejuvenate. So, make sure to book your stay today!",
    secondHeading: "Affordable Luxurious Hotel In Ayubia",
    secondHeadingDescription:
      "Umda Hotel Montana is the best hotel in Ayubia; therefore, don't look elsewhere. This budget hotel near Nathia Gali offers breathtaking mountain views and easy access to popular attractions in Murree. The rooms at Ayubia hotel are spacious, and the staff is friendly and helpful. There's an on-site restaurant for lunch and dinner. Wi-Fi is available throughout the property.",
    thirdHeading: "Best Hotel Rates in Murree",
    thirdHeadingDescription:
      "Umda hotel Montana offers unbeatably low hotel rates in Murree and Ayubia. For budget-minded travelers, Umda hotel Montana delivers exceptional value and lavish amenities at a fraction of the cost you'd expect to pay for hotel accommodation in either city. With comprehensive packages catering to short-term visits and extended stays, the hotel is an ideal space for business execs and leisure tourists alike.",
    fourthHeading: "Dial Ayubia Hotel Contact Number",
    fourthHeadingDescription:
      "Umda Hotel Montana is a reliable accommodation option for hotel booking. The best hotel in Ayubia takes extra measures to ensure safety and comfort in all of its facilities. Moreover, Ayubia hotel offers unbeatable rates that fit any traveler's budget. Ayubia provides excellent customer service, making them the perfect choice for lodging in Ayubia. If you are looking for the best option for your next hotel booking, dial their Ayubia hotel contact number and get in touch with their team of experts who will help you find the accommodation of your dreams.",
    rating: 4.7,
    reviews: 234,
    amenities: [
      { name: "Flat TV", icon: <TvIcon /> },
      { name: "Heater", icon: <FireplaceIcon /> },
      { name: "Internet - Wifi", icon: <WifiIcon /> },
      { name: "Parking", icon: <LocalParkingIcon /> },
      { name: "Restaurant in Ayubia", icon: <RestaurantIcon /> },
    ],
  },
  Islamabad: {
    name: "Umda Safari",
    address:
      "House 107 Street 6, E-11/2 Medical Society, Islamabad Capital Territory 44000",
    firstHeading: "Best Place to Stay in Islamabad",
    firstHeadingDescription:
      "Experience comfort and affordability at Umda Safari, a leading guest house in Islamabad! Our hotel in Islamabad offers spacious rooms and suites equipped with modern amenities. Whether for business or leisure, enjoy exceptional service from our friendly staff. Book now to take advantage of our competitive rates and discover nearby tourist attractions that showcase the beauty of Islamabad. Choose Umda Safari for your next stay and enjoy the best guest house in Islamabad!",
    secondHeading: "Tourist Attractions Islamabad",
    secondHeadingDescription:
      "Our hotel is perfect for tourists seeking adventure and culture. You can treat yourself to so many top tourist attractions nearby!",
    thirdHeading: "Book the Best Hotel in Islamabad",
    thirdHeadingDescription:
      "Islamabad is a place of beauty, and the hotel rooms in Islamabad should reflect that. Umda Safari offers stunning customer service and also some of Islamabad's most affordable hotel rooms.",
    fourthHeading: "Best Pick from the Guest Houses in Islamabad",
    fourthHeadingDescription:
      "Umda safari has long been known as one of the top guest houses in Islamabad. If you're looking for a guest house that offers quality accommodation without breaking the wallet in Islamabad, look no further than Umda Safari.",
    rating: 4.5,
    reviews: 320,
    amenities: [
      { name: "Air Conditioning", icon: <AcUnitIcon /> },
      { name: "Flat TV", icon: <TvIcon /> },
      { name: "Heater", icon: <FireplaceIcon /> },
      { name: "Internet - Wifi", icon: <WifiIcon /> },
      { name: "Parking", icon: <LocalParkingIcon /> },
      { name: "Restaurant", icon: <RestaurantIcon /> },
    ],
  },
  "Nathia Gali": {
    name: "Umda Hotel Galaxy",
    address: "Main bazar, Nathia Gali, Abbottabad, Khyber Pakhtunkhwa 22280",
    firstHeading:
      "Discover Exquisite Nathia Gali Hotels Nestled in Nature's Embrace",
    firstHeadingDescription:
      "A very warm welcome to Umda Hotel Galaxy! Located in Nathia gali Bazaar,we are one of the hotels of Nathigali with cheap rates. Are you planning a serene escape to Nathia Gali, Pakistan's breathtaking hill station? Look no further for the perfect accommodation! Our Nathia Gali hotels offer an unmatched blend of comfort, luxury, and proximity to nature, making your stay an unforgettable experience.",
    secondHeading: "Experience Nature's Tranquility",
    secondHeadingDescription:
      "Nathia Gali is renowned for its lush greenery, dense forests, and awe-inspiring views of the Mountains. When you stay at our hotels, you're not just booking a room; you're reserving a front-row seat to Mother Nature's grandeur. Wake up to the symphony of birdsong and breathe in the crisp, mountain air right from your room.",
    thirdHeading: "Adventure at Your Doorstep",
    thirdHeadingDescription:
      "Nathia Gali is a paradise for nature enthusiasts and adventure seekers. Our hotels are strategically located near popular trekking trails and markets, making it easy for you to embark on thrilling hikes. Discover pristine waterfalls, enchanting meadows, and hidden gems that will leave you in awe.",
    fourthHeading: "Book Your Stay Today",
    fourthHeadingDescription:
      "Don't miss out on the opportunity to stay in one of the finest Nathia Gali hotels. Whether you're searching for Nathia Gali hotels, best hotels in Nathia Gali, or similar keywords, you've come to the right place. Book your stay with us now and immerse yourself in the natural beauty and luxury that Nathia Gali has to offer. Escape to Nathia Gali and make memories that will last a lifetime. Your journey begins with us. Contact us today to reserve your room and experience the magic of Nathia Gali like never before.",
    rating: 4.2,
    reviews: 120,
    amenities: [
      { name: "Flat TV", icon: <TvIcon /> },
      { name: "Heater", icon: <FireplaceIcon /> },
      { name: "Internet - Wifi", icon: <WifiIcon /> },
      { name: "Parking", icon: <LocalParkingIcon /> },
      { name: "Restaurant", icon: <RestaurantIcon /> },
    ],
  },
  // Add more cities as needed
};

const HotelDescription = ({ cityId }: HotelDescriptionProps) => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  // Select the data for the current city
  const hotel = cityId && hotelData[cityId] ? hotelData[cityId] : null;

  console.log(hotel);
  if (!hotel) {
    return <Typography>No hotel information available.</Typography>;
  }

  const getStars = (rating: number) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} color="#ffc107" size={24} />); // Full star
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" size={24} />); // Half star
      } else {
        stars.push(<FaRegStar key={i} color="#ffc107" size={24} />); // Empty star
      }
    }
    return stars;
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "10px auto", padding: 2 }}>
      {isMobScreen ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: "8px" }}>
              {4.2}
            </Typography>
            {getStars(4.2)}
          </Box>
          <Box>
            <Typography fontSize={13} mt={1} sx={{ marginRight: "8px" }}>
              4.2 average based on 234 reviews.
            </Typography>
          </Box>
        </>
      ) : null}

      <Typography
        pt={3}
        sx={{
          fontSize: isMobScreen ? "18px" : "24px",
          fontWeight: "bold",
        }}
      >
        {" "}
        {hotel.name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: isMobScreen ? "12px" : "18px",
          fontWeight: "bold",
        }}
        color="text.secondary"
      >
        {hotel.address}
      </Typography>

      <Typography
        pt={3}
        sx={{
          fontSize: isMobScreen ? "18px" : "24px",
          fontWeight: "bold",
        }}
        fontWeight={"bold"}
      >
        Description
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: isMobScreen ? "14px" : "18px",
          fontWeight: "bold",
        }}
        color={"#474747"}
        pt={3}
      >
        {hotel.firstHeading}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: isMobScreen ? "12px" : "18px",
          mt: 2,
        }}
      >
        {expanded ? (
          <>
            {hotel.firstHeadingDescription}
            <br />
            <br />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color={"#474747"}
            >
              {hotel.secondHeading}
            </Typography>

            {hotel.secondHeadingDescription}
            <br />
            <br />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color={"#474747"}
            >
              {hotel.thirdHeading}
            </Typography>

            {hotel.thirdHeadingDescription}
            <br />
            <br />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color={"#474747"}
            >
              {hotel.fourthHeading}
            </Typography>

            {hotel.fourthHeadingDescription}
          </>
        ) : (
          `${hotel.firstHeadingDescription}`
        )}
      </Typography>
      <Button
        onClick={handleToggle}
        variant="contained"
        sx={{
          mt: 2,
          padding: "4px 8px",
          fontSize: "0.75rem",
          minWidth: "auto",
        }}
      >
        {expanded ? "Read Less" : "Read More"}
      </Button>

      <Typography sx={{ mt: 4 }} fontWeight={"bold"}>
        Amenities
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {hotel.amenities.map((amenity, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box display="flex" alignItems="center">
              {amenity.icon}
              <Typography variant="body1" sx={{ ml: 1, fontSize: "12px" }}>
                {amenity.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HotelDescription;
