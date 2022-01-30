import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";

interface Temperature {
  unit: string;
  tempMin: number;
  tempMax: number;
}

interface Props {
  country: string;
  city: string;
  weather: string;
  desc: string;
  temp: Temperature;
  humidity: number;
  time: Date;
}

const WeatherCard = ({ city, country, weather, desc, temp, humidity, time }: Props) => {
  return (
    <section>
      <Stack direction="column">
        <p>
          {city}, {country}
        </p>
        <p>{weather}</p>
        <Box sx={{ display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: "1.4em" }}>
          <span>Description:</span>
          <span>{desc}</span>

          <span>Temperature:</span>
          <span>
            {temp?.tempMin}~{temp?.tempMax}
            {temp?.unit}
          </span>

          <span>Humidity:</span>
          <span>{humidity}%</span>

          <span>Time:</span>
          <span>{format(time, "yyyy-MM-dd hh:mm aa")}</span>
        </Box>
      </Stack>
    </section>
  );
};

export default WeatherCard;
