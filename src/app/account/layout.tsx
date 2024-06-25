import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar/Sidebar";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          //   backgroundColor: "#f0f0f0", // Background color for the entire page
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "80%", // Width of the centered content container
            maxWidth: 1200, // Max width to ensure it doesn't stretch too much on larger screens
            // boxShadow: 3, // Add some shadow for better visual separation
            // backgroundColor: "#fff",
            // borderRadius: "8px",
            // overflow: "hidden", // Ensure rounded corners apply to child elements
          }}
        >
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: 3,
              backgroundColor: "background.default",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AccountLayout;
