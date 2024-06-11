import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@mui/material";
import SearchBar from "@/components/searchbar/SearchBar";
import WelcomeCard from "@/components/welcomecard/WelcomeCard";
import Testimonials from "@/components/testimonials/Testimonials";

const Home = () => {
  return (
    <Box>
      <SearchBar />
      <WelcomeCard />
      <Testimonials />
    </Box>
  );
};

export default Home;
