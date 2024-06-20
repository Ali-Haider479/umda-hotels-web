import { Box, Typography, Grid } from "@mui/material";
import HotelCard from "./HotelCard";
import HotelMontanaImage from "@/public/assets/images/hotel-montana.webp";
import HotelGalaxyImage from "@/public/assets/images/hotel-galaxy.webp";
import HotelHorizonImage from "@/public/assets/images/hotel-horizan.webp";

const OurHotels = () => {
  const hotelsArray = [
    {
      name: "Umda Hotel Montana",
      address:
        "Main ayubia chok, Ayubia Rd, opposite Chair Lift, Ayubia, 22310",
      phone: "0331 9145021",
      images: [HotelMontanaImage, HotelMontanaImage, HotelMontanaImage],
    },
    {
      name: "Umda Hotel Galaxy",
      address: "Main bazar, Nathia Gali, Abbottabad, Khyber Pakhtunkhwa 22280",
      phone: "0347 9792989",
      images: [HotelGalaxyImage, HotelGalaxyImage, HotelGalaxyImage],
    },
    {
      name: "Umda Hotel Horizon",
      address: "House 13 Street 150, G 13/4, Islamabad Capital Territory 44000",
      phone: "0331 9145021",
      images: [HotelHorizonImage, HotelHorizonImage, HotelHorizonImage],
    },
  ];

  return (
    <Box paddingY={10}>
      <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
        Our Hotels
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {hotelsArray.map((hotel, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <HotelCard
              name={hotel.name}
              address={hotel.address}
              phone={hotel.phone}
              images={hotel.images}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurHotels;
