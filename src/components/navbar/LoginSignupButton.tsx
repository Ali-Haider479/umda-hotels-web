"use client";

import { useState } from "react";
import "./Navbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";

const LoginSignupButton = () => {
  const [hover, setHover] = useState(false);

  // Determine the CSS classes to apply
  const classes = `navbar-item navbar-link flex-center ${
    hover ? "hover-effect" : ""
  }`;

  return (
    <Link
      href={"/login"}
      className={classes}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AccountCircleOutlinedIcon className="icon-spacing" fontSize="large" />
      <p className="navbar-text" style={{ paddingBlockStart: "4px", borderBottom:"1px solid black" }}>
        Login / Signup
      </p>
    </Link>
  );
};

export default LoginSignupButton;
