import type { ForecastItem } from "../types/weather";

interface ForecastCardProps {
  forecast: ForecastItem;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const weather = forecast.weather[0];

  const date = new Date(forecast.dt * 1000);

  const day = date.toLocaleDateString("uk-UA", {
    weekday: "short",
  });

  const formattedDate = date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
  });

  const temperature = Math.round(forecast.main.temp);

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <article className="forecast-card">
      <div className="forecast-card__date">
        <strong>{day}</strong>
        <span>{formattedDate}</span>
      </div>

      <img
        className="forecast-card__icon"
        src={weatherIcon}
        alt={weather.description}
      />

      <div className="forecast-card__temperature">{temperature}°C</div>

      <p className="forecast-card__description">{weather.description}</p>

      <div className="forecast-card__humidity">
        💧 {forecast.main.humidity}%
      </div>
    </article>
  );
};

export default ForecastCard;
