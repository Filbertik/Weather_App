import type { ForecastItem } from "../types/weather";
import type { TemperatureUnit } from "./UnitToggle";

import ForecastCard from "./ForecastCard";

import "./Forecast.css";

interface ForecastProps {
  forecast: ForecastItem[];
  unit: TemperatureUnit;
}

const Forecast = ({ forecast, unit }: ForecastProps) => {
  const groupedForecast = forecast.reduce<Record<string, ForecastItem[]>>(
    (groups, item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(item);

      return groups;
    },
    {},
  );

  const dailyForecast = Object.values(groupedForecast).slice(0, 5);

  return (
    <section className="forecast">
      <div className="forecast__header">
        <div>
          <h2>5 Day Forecast</h2>

          <p>Detailed weather forecast for the next days</p>
        </div>
      </div>

      <div className="forecast__list">
        {dailyForecast.map((dayForecast) => (
          <ForecastCard
            key={dayForecast[0].dt}
            forecast={dayForecast}
            unit={unit}
          />
        ))}
      </div>
    </section>
  );
};

export default Forecast;

// import type { ForecastItem } from "../types/weather";

// import ForecastCard from "./ForecastCard";

// import "./Forecast.css";

// interface ForecastProps {
//   forecast: ForecastItem[];
// }

// const Forecast = ({ forecast }: ForecastProps) => {
//   const groupedForecast = forecast.reduce<Record<string, ForecastItem[]>>(
//     (groups, item) => {
//       const date = item.dt_txt.split(" ")[0];

//       if (!groups[date]) {
//         groups[date] = [];
//       }

//       groups[date].push(item);

//       return groups;
//     },
//     {},
//   );

//   const dailyForecast = Object.values(groupedForecast).slice(0, 5);

//   return (
//     <section className="forecast">
//       <div className="forecast__header">
//         <div>
//           <h2>5 Day Forecast</h2>

//           <p>Detailed weather forecast for the next days</p>
//         </div>
//       </div>

//       <div className="forecast__list">
//         {dailyForecast.map((dayForecast) => (
//           <ForecastCard key={dayForecast[0].dt} forecast={dayForecast} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Forecast;

// // import type { ForecastItem } from "../types/weather";

// // import ForecastCard from "./ForecastCard";

// // import "./Forecast.css";

// // interface ForecastProps {
// //   forecast: ForecastItem[];
// // }

// // const Forecast = ({ forecast }: ForecastProps) => {
// //   const dailyForecast = forecast.filter((item) =>
// //     item.dt_txt.includes("12:00:00"),
// //   );

// //   return (
// //     <section className="forecast">
// //       <div className="forecast__header">
// //         <h2>5 Day Forecast</h2>

// //         <p>Weather forecast for the next days</p>
// //       </div>

// //       <div className="forecast__list">
// //         {dailyForecast.slice(0, 5).map((item) => (
// //           <ForecastCard key={item.dt} forecast={item} />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Forecast;
