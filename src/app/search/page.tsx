"use client";

import FilterSidebar from "@/components/filtersidebar/FilterSidebar";
import RoomCard from "@/components/roomcard/RoomCard";
import SearchBar from "@/components/searchbar/SearchBar";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState("Popularity");

  useEffect(() => {
    const city = searchParams.get("city");
    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const guests = searchParams.get("guests");

    console.log("SEARCH PAGE", {
      city,
      checkInDate,
      checkOutDate,
      guests,
    });
  }, [searchParams]);

  const handleSortChange = (event: any) => {
    setSortValue(event.target.value as string);
  };

  return (
    <Box>
      <SearchBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          px: 38,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TuneIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mr: 8 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Sort By:
          </Typography>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortValue}
            onChange={handleSortChange}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value={"Popularity"}>Popularity</MenuItem>
            <MenuItem value={"LowToHigh"}>Price: Low to High</MenuItem>
            <MenuItem value={"HighToLow"}>Price: High to Low</MenuItem>
          </Select>
        </Box>
      </Box>
      <Grid container spacing={4} sx={{ px: 35 }}>
        <Grid item xs={12} md={3}>
          <FilterSidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RoomCard />
            </Grid>
            <Grid item xs={12}>
              <RoomCard />
            </Grid>
            <Grid item xs={12}>
              <RoomCard />
            </Grid>
            <Grid item xs={12}>
              <RoomCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const SearchPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchContent />
  </Suspense>
);

export default SearchPage;
