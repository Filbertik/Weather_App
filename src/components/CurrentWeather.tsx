import { Droplets, Eye, Gauge, Wind } from "lucide-react";

import type { CurrentWeather as CurrentWeatherType } from "../types/weather";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  const weatherInfo = weather.weather[0];

  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);

  const visibility = Math.round(weather.visibility / 1000);

  const weatherIcon = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

  return (
    <section className="current-weather">
      <div className="current-weather__top">
        <div>
          <p className="current-weather__label">Current weather</p>

          <h1 className="current-weather__city">
            {weather.name}
            <span>, {weather.sys.country}</span>
          </h1>
        </div>

        <div className="current-weather__icon">
          <img src={weatherIcon} alt={weatherInfo.description} />
        </div>
      </div>

      <div className="current-weather__main">
        <div className="current-weather__temperature">
          {temperature}
          <span>°C</span>
        </div>

        <div className="current-weather__description">
          <p>{weatherInfo.description}</p>

          <span>Feels like {feelsLike}°C</span>
        </div>
      </div>

      <div className="current-weather__details">
        <div className="weather-detail">
          <div className="weather-detail__icon">
            <Droplets size={22} />
          </div>

          <div>
            <span>Humidity</span>
            <strong>{weather.main.humidity}%</strong>
          </div>
        </div>

        <div className="weather-detail">
          <div className="weather-detail__icon">
            <Wind size={22} />
          </div>

          <div>
            <span>Wind</span>
            <strong>{weather.wind.speed} m/s</strong>
          </div>
        </div>

        <div className="weather-detail">
          <div className="weather-detail__icon">
            <Eye size={22} />
          </div>

          <div>
            <span>Visibility</span>
            <strong>{visibility} km</strong>
          </div>
        </div>

        <div className="weather-detail">
          <div className="weather-detail__icon">
            <Gauge size={22} />
          </div>

          <div>
            <span>Pressure</span>
            <strong>{weather.main.pressure} hPa</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
