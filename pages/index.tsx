import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { currentWeather } from "../libs/openWeather/currentWeather";
import { useQuery } from "react-query";
import { fromUnixTime } from "date-fns";
import useSearchHistory from "./useSearchHistory";
import { LoadingButton } from "@mui/lab";
import React from "react";
import SearchHistory from "./SearchHistory";

const Home: NextPage = () => {
  const [city, setCity] = useState("taipei");
  const [country, setCountry] = useState("taiwan");
  const searchHistory = useSearchHistory();
  const query = useQuery("weather", () => currentWeather({ city, country }));
  const [error, setError] = useState<string | null>(null);

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = new Date();
    const res = await query.refetch();

    if (res.isSuccess) {
      searchHistory.add({ city, country, time: now.getTime() });
    }

    if (!res.isError) {
      setError(null);
    }
    setError(`Can not find ${city} ${country ? `, ${country}` : ""}`);
  };

  return (
    <Container>
      <div>
        <Typography variant="h1">Today&apos;s Weather</Typography>
      </div>
      {query.isError && (
        <Alert sx={{ my: 1 }} severity="error">
          {error}
        </Alert>
      )}
      <form onSubmit={(e) => handleSearch(e)}>
        <TextField required value={city} onChange={(e) => setCity(e.target.value)} label="City" variant="standard" />
        <TextField value={country} onChange={(e) => setCountry(e.target.value)} label="Country" variant="standard" />
        <LoadingButton loading={query.isFetching} type="submit">
          Search
        </LoadingButton>
        <Button onClick={handleClear}>Clear</Button>
      </form>
      {query.isSuccess && (
        <WeatherCard
          city={query.data.name}
          country={query.data.sys.country}
          weather={query.data.weather[0].main}
          desc={query.data.weather[0].description}
          temp={{ tempMin: query.data.main.temp_min, tempMax: query.data.main.temp_max, unit: "°C" }}
          humidity={query.data.main.humidity}
          time={fromUnixTime(query.data.dt)}
        />
      )}
      {!!searchHistory.data.length && <SearchHistory data={searchHistory.data} onDelete={searchHistory.remove} />}
    </Container>
  );
};

export default Home;
