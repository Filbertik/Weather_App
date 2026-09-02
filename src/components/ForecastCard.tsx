import { Droplets, Umbrella, Wind } from "lucide-react";

import type { ForecastItem } from "../types/weather";
import type { TemperatureUnit } from "./UnitToggle";

import { formatTemperature } from "../utils/temperature";

interface ForecastCardProps {
  forecast: ForecastItem[];
  unit: TemperatureUnit;
}

const ForecastCard = ({ forecast, unit }: ForecastCardProps) => {
  const firstForecast = forecast[0];

  const weather = firstForecast.weather[0];

  const date = new Date(firstForecast.dt * 1000);

  const day = date.toLocaleDateString("uk-UA", {
    weekday: "short",
  });

  const formattedDate = date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
  });

  const temperatures = forecast.map((item) => item.main.temp);

  const minTemperature = formatTemperature(Math.min(...temperatures), unit);

  const maxTemperature = formatTemperature(Math.max(...temperatures), unit);

  const averageHumidity = Math.round(
    forecast.reduce((sum, item) => sum + item.main.humidity, 0) /
      forecast.length,
  );

  const maxRainProbability = Math.round(
    Math.max(...forecast.map((item) => item.pop)) * 100,
  );

  const averageWind = (
    forecast.reduce((sum, item) => sum + item.wind.speed, 0) / forecast.length
  ).toFixed(1);

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

      <p className="forecast-card__description">{weather.description}</p>

      <div className="forecast-card__temperatures">
        <strong>{maxTemperature}</strong>

        <span>{minTemperature}</span>
      </div>

      <div className="forecast-card__details">
        <div>
          <Droplets size={15} />

          <span>{averageHumidity}%</span>
        </div>

        <div>
          <Umbrella size={15} />

          <span>{maxRainProbability}%</span>
        </div>

        <div>
          <Wind size={15} />

          <span>{averageWind} m/s</span>
        </div>
      </div>
    </article>
  );
};

export default ForecastCard;

// import { Droplets, Umbrella, Wind } from "lucide-react";

// import type { ForecastItem } from "../types/weather";

// interface ForecastCardProps {
//   forecast: ForecastItem[];
// }

// const ForecastCard = ({ forecast }: ForecastCardProps) => {
//   const firstForecast = forecast[0];

//   const weather = firstForecast.weather[0];

//   const date = new Date(firstForecast.dt * 1000);

//   const day = date.toLocaleDateString("uk-UA", {
//     weekday: "short",
//   });

//   const formattedDate = date.toLocaleDateString("uk-UA", {
//     day: "numeric",
//     month: "short",
//   });

//   const temperatures = forecast.map((item) => item.main.temp);

//   const minTemperature = Math.round(Math.min(...temperatures));

//   const maxTemperature = Math.round(Math.max(...temperatures));

//   const averageHumidity = Math.round(
//     forecast.reduce((sum, item) => sum + item.main.humidity, 0) /
//       forecast.length,
//   );

//   const maxRainProbability = Math.round(
//     Math.max(...forecast.map((item) => item.pop)) * 100,
//   );

//   const averageWind = (
//     forecast.reduce((sum, item) => sum + item.wind.speed, 0) / forecast.length
//   ).toFixed(1);

//   const weatherIcon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

//   return (
//     <article className="forecast-card">
//       <div className="forecast-card__date">
//         <strong>{day}</strong>
//         <span>{formattedDate}</span>
//       </div>

//       <img
//         className="forecast-card__icon"
//         src={weatherIcon}
//         alt={weather.description}
//       />

//       <p className="forecast-card__description">{weather.description}</p>

//       <div className="forecast-card__temperatures">
//         <strong>{maxTemperature}°</strong>

//         <span>{minTemperature}°</span>
//       </div>

//       <div className="forecast-card__details">
//         <div>
//           <Droplets size={15} />

//           <span>{averageHumidity}%</span>
//         </div>

//         <div>
//           <Umbrella size={15} />

//           <span>{maxRainProbability}%</span>
//         </div>

//         <div>
//           <Wind size={15} />

//           <span>{averageWind} m/s</span>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default ForecastCard;

// // import type { ForecastItem } from "../types/weather";

// // interface ForecastCardProps {
// //   forecast: ForecastItem;
// // }

// // const ForecastCard = ({ forecast }: ForecastCardProps) => {
// //   const weather = forecast.weather[0];

// //   const date = new Date(forecast.dt * 1000);

// //   const day = date.toLocaleDateString("uk-UA", {
// //     weekday: "short",
// //   });

// //   const formattedDate = date.toLocaleDateString("uk-UA", {
// //     day: "numeric",
// //     month: "short",
// //   });

// //   const temperature = Math.round(forecast.main.temp);

// //   const weatherIcon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

// //   return (
// //     <article className="forecast-card">
// //       <div className="forecast-card__date">
// //         <strong>{day}</strong>
// //         <span>{formattedDate}</span>
// //       </div>

// //       <img
// //         className="forecast-card__icon"
// //         src={weatherIcon}
// //         alt={weather.description}
// //       />

// //       <div className="forecast-card__temperature">{temperature}°C</div>

// //       <p className="forecast-card__description">{weather.description}</p>

// //       <div className="forecast-card__humidity">
// //         💧 {forecast.main.humidity}%
// //       </div>
// //     </article>
// //   );
// // };

// // export default ForecastCard;
