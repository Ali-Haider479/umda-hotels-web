"use client";
import SubHeader from "@/components/ui/SubHeader";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How much does it cost to stay at Umda Hotel Montana?",
    answer:
      "Our hotel rates start at 5,999 PKR per night. However, prices may vary depending on the time of year and availability.",
  },
  {
    question:
      "Are there any discounts available on hotel rates of Umda Hotel Montana in Ayubia?",
    answer:
      "Yes, there are often discounts available for hotel rooms booked in advance or for extended stays. Be sure to ask about any specials when you make your reservation.",
  },
  {
    question:
      "I'm interested in staying at Umda Hotel Montana. What can you tell me about it?",
    answer:
      "Umda Hotel Montana is one of the most popular hotels in Ayubia, and for good reason! Not only does it offer stunning views of the surrounding mountains, but it also features a variety of amenities such as a restaurant, free parking, and high speed internet. Additionally, the hotel staff is known for being incredibly friendly and helpful, so you can rest assured that you'll be well taken care of during your stay.",
  },
  {
    question: "What is the exact location of Umda Hotel Montana in Ayubia?",
    answer:
      "Umda Hotel Montana is located in the heart of Ayubia, opposite to the Ayubia chairlift. Here’s the Google Map link of the Umda Hotel Montana: https://goo.gl/maps/WmVLyLeq9n2YFGA6A",
  },
  {
    question:
      "What are the popular places to visit in Ayubia near Umda Hotel Montana?",
    answer:
      "Some of the most popular places to visit in Ayubia near Umda Hotel Montana are Pipeline Track, Ayubia National Park, Ayubia Moto Tunnel, Mushkpuri Peak, and Lalazar Wildlife Park.",
  },
  {
    question: "What are the best activities for tourists in Ayubia?",
    answer:
      "Hiking, trekking, camping, and exploring local markets are some best activities for tourists in Ayubia.",
  },
  {
    question: "What are the hotel rates in Ayubia?",
    answer:
      "The hotel rates in Ayubia vary depending on the hotel you choose to stay in. However, most hotel rooms range from $25 to $150 per night.",
  },
  {
    question: "Is it worth it to stay in a hotel in Ayubia?",
    answer:
      "Yes, it is definitely worth it to stay in a hotel in Ayubia! Not only will you be able to enjoy the beautiful scenery and amenities that the city has to offer, but you'll also be able to rest assured knowing that your hotel room is clean and comfortable.",
  },
  {
    question: "What is the cheapest hotel in Ayubia?",
    answer:
      "While there are many affordable hotels in Ayubia, the cheapest hotel is typically the one that offers the most basic amenities. If you're looking for a cheap hotel that still offers a great experience, we recommend checking out some of the budget-friendly options available at Umda Hotel Montana.",
  },
  {
    question: "What is the best time of year to book a hotel room in Ayubia?",
    answer:
      "The most popular time to visit Ayubia is during the summer months, so hotel prices will be higher during this time. If you're looking for the best deals on hotel rooms, consider booking your stay during the off-season (typically November through February).",
  },
];

const FAQsPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 950px)");

  return (
    <>
      <SubHeader heading={"Frequently Asked Questions"} />
      <Box
        paddingY={isMobScreen ? 2 : 10}
        paddingX={isMobScreen ? 2 : 30}
        paddingBottom={0}
      >
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: "#f5f5f5" }}
            >
              <Typography fontWeight={"bold"}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default FAQsPage;
