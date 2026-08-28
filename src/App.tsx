import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

import { getCurrentWeather } from "./services/weatherApi";
import Forecast from "./components/Forecast";

import type { CurrentWeather as CurrentWeatherType } from "./types/weather";

// import type {
//   CurrentWeather as CurrentWeatherType,
//   WeatherForecast,
// } from "./types/weather";
function App() {
  const [city, setCity] = useState("Kyiv");
  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await getCurrentWeather(cityName);

      setWeather(data);
    } catch (error) {
      console.error(error);

      setWeather(null);
      setError("Місто не знайдено. Перевір назву та спробуй ще раз.");
    } finally {
      setLoading(false);
    }
  };
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);

  const searchWeather = () => {
    loadWeather(city);
  };

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        setLoading(true);

        const data = await getCurrentWeather("Kyiv");

        setWeather(data);
      } catch (error) {
        console.error(error);

        setError("Не вдалося завантажити погоду. Спробуй ще раз.");
      } finally {
        setLoading(false);
      }
    };

    loadDefaultWeather();
  }, []);

  return (
    <div>
      <SearchBar value={city} onChange={setCity} onSearch={searchWeather} />

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={searchWeather} />
      )}

      {!loading && !error && weather && <CurrentWeather weather={weather} />}
    </div>
  );
}

export default App;

// import { useEffect, useState } from "react";

// import SearchBar from "./components/SearchBar";
// import CurrentWeather from "./components/CurrentWeather";

// import { getCurrentWeather } from "./services/weatherApi";

// import type { CurrentWeather as CurrentWeatherType } from "./types/weather";

// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState<CurrentWeatherType | null>(null);

//   const searchWeather = async () => {
//     if (!city.trim()) return;

//     try {
//       const data = await getCurrentWeather(city);

//       setWeather(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const loadDefaultWeather = async () => {
//       try {
//         const data = await getCurrentWeather("Kyiv");

//         setWeather(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadDefaultWeather();
//   }, []);

//   return (
//     <div>
//       <SearchBar value={city} onChange={setCity} onSearch={searchWeather} />

//       {weather && <CurrentWeather weather={weather} />}
//     </div>
//   );
// }

// export default App;
