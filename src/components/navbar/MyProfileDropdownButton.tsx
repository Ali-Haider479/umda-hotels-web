"use client";
import { useState } from "react";
import "./Navbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfileDropdownButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Determine the CSS classes to apply
  const classes = `navbar-item flex-center ${hover ? "hover-effect" : ""}`;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={classes}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div onClick={handleClick} className="flex-center">
        <AccountCircleOutlinedIcon className="icon-spacing" fontSize="large" />
        <p className="navbar-text">My Account</p>
        <ArrowDropDownIcon />
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableAutoFocusItem
        // PaperProps={{
        //   style: {
        //     marginLeft: "15px", // Move the menu to the right by 5px
        //   },
        // }}
      >
        <MenuItem onClick={() => router.push("/account/my-profile")}>
          <PersonOutlinedIcon fontSize="small" sx={{ marginRight: 2 }} />
          <Typography>My Profile</Typography>
        </MenuItem>
        {session?.user.isAdmin ? (
          <MenuItem onClick={() => router.push("/account/bookings")}>
            <HistoryOutlinedIcon fontSize="small" sx={{ marginRight: 2 }} />
            <Typography>Bookings</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => router.push("/account/booking-history")}>
            <HistoryOutlinedIcon fontSize="small" sx={{ marginRight: 2 }} />
            <Typography>Booking History</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => signOut()}>
          <LogoutOutlinedIcon fontSize="small" sx={{ marginRight: 2 }} />
          <Typography>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyProfileDropdownButton;
