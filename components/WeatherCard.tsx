import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";

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
  icon: string;
}

const WeatherCard = ({ city, country, weather, desc, temp, humidity, time, icon }: Props) => {
  return (
    <Box sx={{ p: 2, width: "22rem", backgroundColor: "#cde7e1", borderRadius: "1rem" }} component="section">
      <Stack direction="column">
        <Stack direction="row">
          <div>
            <Typography variant="caption">
              {city}, {country}
            </Typography>
            <Typography variant="h4">{weather}</Typography>
          </div>
          <Image src={icon} alt={desc} width={80} height={80} />
        </Stack>

        <Stack sx={{ display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: "1.4em" }}>
          <Typography variant="body2">Description:</Typography>
          <Typography variant="body2">{desc}</Typography>

          <Typography variant="body2">Temperature:</Typography>
          <Typography variant="body2">
            {temp?.tempMin}~{temp?.tempMax}
            {temp?.unit}
          </Typography>

          <Typography variant="body2">Humidity:</Typography>
          <Typography variant="body2">{humidity}%</Typography>

          <Typography variant="body2">Time:</Typography>
          <Typography variant="body2">{format(time, "yyyy-MM-dd hh:mm aa")}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WeatherCard;
