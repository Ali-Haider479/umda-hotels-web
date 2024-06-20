import { Avatar, Box, Divider, Paper, Rating, Typography } from "@mui/material";

interface TestimonialCardProps {
  name: string;
  image: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard = ({
  name,
  image,
  testimonial,
  rating,
}: TestimonialCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "white",
        maxWidth: 600,
        mx: "auto",
        marginY: 5,
        // marginX: 2,
      }}
    >
      <Box display="flex" alignItems="flex-start" marginBottom={2}>
        <Typography
          variant="h1"
          color="primary"
          sx={{ fontSize: "5rem", lineHeight: 0.8, marginRight: 2 }}
        >
          &ldquo;
        </Typography>
        <Typography variant="body1" color="textPrimary" sx={{ flexGrow: 1 }}>
          {testimonial}
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar
            src={image}
            alt={name}
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
        </Box>
        <Rating value={rating} readOnly size="medium" />
      </Box>
    </Paper>
  );
};

export default TestimonialCard;
