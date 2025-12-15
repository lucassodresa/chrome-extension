import React, { useEffect, useState } from "react";
import {
  fetchOpenWeatherData,
  getWeatherIconSrc,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import "./WeatherCard.css";

export const WeatherCardContainer: React.FC<{ onDelete?: () => void }> = ({
  children,
  onDelete,
}) => (
  <Box mx="4px" my="16px">
    <Card>
      <CardContent>{children}</CardContent>
      <CardActions>
        {onDelete && (
          <Button color="secondary" onClick={onDelete}>
            <Typography className="weatherCard-body">Delete</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  </Box>
);

type WeatherCardState = "loading" | "error" | "ready";

export const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((error) => {
        setCardState("error");
        console.log(error);
      });
  }, [city, tempScale]);

  const formatTemperature = (temperature: number) => Math.round(temperature);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState === "loading"
            ? "Loading..."
            : "Error: could not retrieve weather data for this city."}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justify="space-around">
        <Grid item>
          <Typography className="weatherCard-title" variant="h5">
            {weatherData.name}
          </Typography>
          <Typography className="weatherCard-temp">
            {formatTemperature(weatherData.main.temp)}
          </Typography>
          <Typography className="weatherCard-body">
            Feels like: {formatTemperature(weatherData.main.feels_like)}
          </Typography>
        </Grid>

        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
              <Typography className="weatherCard-body">
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};
