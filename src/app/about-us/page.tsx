import SubHeader from "@/components/ui/SubHeader";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import AboutUsGlobe from "@/public/assets/images/about-us-globe.webp";

const AboutUsPage = () => {
  return (
    <>
      <SubHeader heading={"About Us"} />
      <Box padding={4} paddingBottom={0}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1} paddingX={4}>
            <Typography fontWeight="bold" variant="h4" gutterBottom>
              Escape to the Best Hotel
            </Typography>
            <Typography variant="subtitle1">
              The Umda Hotel Montana is the best hotel in Ayubia for escaping
              the rush of city life because it is tucked away in the center of
              Murree. Surrounded by towering pine trees, the hotel offers
              stunning views of the surrounding mountains. And with a wide range
              of leisure facilities, including free parking, high-speed
              internet, and an in-house restaurant, there is plenty to keep
              guests entertained. What's more, the Umda Hotel Montana offers
              superb value for money, offering the best Ayubia hotel rates that
              are significantly lower than other hotels in the area. So if
              you're looking for the best hotel in Ayubia, look no further than
              the Umda Hotel Montana.
            </Typography>
          </Box>
          <Box flex={1}>
            <Image
              src={AboutUsGlobe}
              alt="about us globe"
              layout="responsive"
              width={600}
              height={400}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsPage;
