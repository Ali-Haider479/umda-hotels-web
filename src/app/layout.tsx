import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Provider from "@/components/Provider";
import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";

import { ReactNode } from "react";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Umda Hotels",
  description: "Hotel Booking Managment App",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={undefined}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
