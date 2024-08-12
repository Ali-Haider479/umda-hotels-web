"use client";

import { ChangeEvent, useState } from "react";
import {
  Box,
  Slider,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterSidebar = () => {
  const [budget, setBudget] = useState<[number, number]>([1000, 6000]);
  const [checkedLocalities, setCheckedLocalities] = useState<string[]>([]);
  const [isBudgetEnabled, setIsBudgetEnabled] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setBudget(newValue as [number, number]);
    }
  };

  const handleBudgetSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsBudgetEnabled(event.target.checked);
  };

  const handleLocalityToggle = (value: string) => () => {
    const currentIndex = checkedLocalities.indexOf(value);
    const newChecked = [...checkedLocalities];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedLocalities(newChecked);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const localities = ["Islamabad", "Murree", "Abbottabad", "Nathia Gali"];

  const filteredLocalities = localities.filter((locality) =>
    locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card
      sx={{
        width: 300,
        margin: "16px",
        padding: 2,
        // borderRight: "2px solid #ddd",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Applied Filters (0)
          </Typography>
          <Button variant="outlined" color="primary" size="small">
            Reset
          </Button>
        </Box>
        <Divider variant="fullWidth" sx={{ backgroundColor: "black", mt: 1 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Budget per Night for 1 Room
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="body2">Set Custom Budget Range</Typography>
            <Switch
              checked={isBudgetEnabled}
              onChange={handleBudgetSwitchChange}
            />
          </Box>
          <Slider
            value={budget}
            onChange={handleBudgetChange}
            valueLabelDisplay="auto"
            min={1000}
            max={6000}
            sx={{ mt: 2 }}
            disabled={!isBudgetEnabled}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Rs. {budget[0]}</Typography>
            <Typography>Rs. {budget[1]}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">User Rating</Typography>
          <FormControl component="fieldset">
            {[
              "4.5 ★ & above",
              "4 ★ & above",
              "3.5 ★ & above",
              "3 ★ & above",
            ].map((label, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={label}
              />
            ))}
          </FormControl>
        </Box>

        {/* <Box sx={{ mt: 2 }}>
          <FormControlLabel control={<Switch />} label="Couple Friendly" />
          <FormControlLabel control={<Switch />} label="Local ID allowed" />
        </Box> */}

        <Box sx={{ mt: 2 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Locations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <List>
                {filteredLocalities.map((value, index) => (
                  <ListItem
                    key={index}
                    dense
                    button
                    onClick={handleLocalityToggle(value)}
                  >
                    <Checkbox
                      checked={checkedLocalities.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={value} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
