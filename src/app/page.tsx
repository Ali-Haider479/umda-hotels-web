import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@mui/material";
import SearchBar from "@/components/searchbar/SearchBar";
import WelcomeCard from "@/components/welcomecard/WelcomeCard";
import Testimonials from "@/components/testimonials/Testimonials";
import NewsLetterCard from "@/components/newsletter/NewsLetterCard";
import Features from "@/components/features/Features";
import OurHotels from "@/components/ourhotels/OurHotels";
import Explore from "@/components/explore/explore";

const Home = () => {
  return (
    <Box>
      <SearchBar />
      <Explore/>

      <Features />
      {/* <WelcomeCard /> */}
      <OurHotels />
      <Testimonials />
      <Box paddingBottom={10}>
        <NewsLetterCard />
      </Box>
    </Box>
  );
};

export default Home;
