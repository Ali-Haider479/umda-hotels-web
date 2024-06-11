"use client";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UmdaLogo from "@/public/assets/icons/logo.svg";

import HotelsDropdownButton from "./HotelsDropdownButton";
import CallUsButton from "./CallUsButton";
import LoginSignupButton from "./LoginSignupButton";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <nav className="navbar">
        <Link href={"/"} className="navbar-link">
          <Image
            src={UmdaLogo}
            alt="Umda Company Logo"
            className="umda-hotel-logo"
          />
          <p
            className="navbar-text"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Umda Hotels
          </p>
        </Link>
        <div style={{ display: "flex" }}>
          <HotelsDropdownButton />
          <CallUsButton />
          <LoginSignupButton />
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
};

export default Navbar;