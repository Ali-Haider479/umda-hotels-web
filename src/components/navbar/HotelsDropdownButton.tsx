"use client";
import { useState } from "react";
import "./Navbar.css";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const HotelsDropdownButton = () => {
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
        <CottageOutlinedIcon className="icon-spacing" fontSize="large" />
        <p className="navbar-text">Our Hotels</p>
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
        PaperProps={{
          style: {
            marginLeft: "15px", // Move the menu to the right by 5px
          },
        }}
      >
        <MenuItem onClick={handleClose}>Umda Hotel Montana</MenuItem>
        <MenuItem onClick={handleClose}>Umda Hotel Galaxy</MenuItem>
        <MenuItem onClick={handleClose}>Umda Hotel Horizan</MenuItem>
      </Menu>
    </div>
  );
};

export default HotelsDropdownButton;