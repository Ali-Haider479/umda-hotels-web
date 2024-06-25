"use client";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import EmailIcon from "@mui/icons-material/Email";

const Sidebar = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: 240,
        borderRight: "1px solid #ddd",
        padding: "16px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
          Main Menu
        </Typography>
      </Box>
      <List>
        {[
          {
            text: "My Profile",
            icon: <AccountCircleIcon />,
            path: "/account/my-profile",
          },
          {
            text: "Booking History",
            icon: <HistoryIcon />,
            path: "/account/booking-history",
          },
          { text: "Email Notifications", icon: <EmailIcon />, path: "#" },
        ].map((item, index) => (
          <ListItem button key={index} onClick={() => router.push(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
