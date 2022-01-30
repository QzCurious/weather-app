import { Box, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import DeleteIcon from "@mui/icons-material/Delete";

const Home: NextPage = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  const handelSearch = () => {};

  return (
    <Container>
      <div>
        <Typography variant="h1">Today&apos;s Weather</Typography>
      </div>
      <form>
        <TextField value={city} onChange={(e) => setCity(e.target.value)} label="City" variant="standard" />
        <TextField value={country} onChange={(e) => setCountry(e.target.value)} label="Country" variant="standard" />
        <Button onClick={handelSearch}>Search</Button>
        <Button onClick={handleClear}>Clear</Button>
      </form>
      <WeatherCard
        city="city"
        country="country"
        weather="weather"
        desc="desc"
        temp={{ tempMin: 17, tempMax: 20, unit: "°C" }}
        humidity={99}
        time={new Date()}
      />
      <section>
        <Typography variant="h2">Search History</Typography>
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText>Johor, MY</ListItemText>
            <Box sx={{ ml: "auto" }}>03:15:02 PM</Box>
          </ListItem>
        </List>
      </section>
    </Container>
  );
};

export default Home;
