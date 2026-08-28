import type { ForecastItem } from "../types/weather";

import ForecastCard from "./ForecastCard";

import "./Forecast.css";

interface ForecastProps {
  forecast: ForecastItem[];
}

const Forecast = ({ forecast }: ForecastProps) => {
  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  return (
    <section className="forecast">
      <div className="forecast__header">
        <h2>5 Day Forecast</h2>

        <p>Weather forecast for the next days</p>
      </div>

      <div className="forecast__list">
        {dailyForecast.slice(0, 5).map((item) => (
          <ForecastCard key={item.dt} forecast={item} />
        ))}
      </div>
    </section>
  );
};

export default Forecast;
