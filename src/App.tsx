import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

import { getCurrentWeather, getWeatherForecast } from "./services/weatherApi";

import type {
  CurrentWeather as CurrentWeatherType,
  WeatherForecast,
} from "./types/weather";

function App() {
  const [city, setCity] = useState("Kyiv");

  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);

  const [forecast, setForecast] = useState<WeatherForecast | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const [currentWeather, weatherForecast] = await Promise.all([
        getCurrentWeather(cityName),
        getWeatherForecast(cityName),
      ]);

      setWeather(currentWeather);
      setForecast(weatherForecast);
    } catch (error) {
      console.error(error);

      setWeather(null);
      setForecast(null);

      setError(
        "Не вдалося завантажити погоду. Перевір назву міста та спробуй ще раз.",
      );
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = () => {
    loadWeather(city);
  };

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        setLoading(true);

        const [currentWeather, weatherForecast] = await Promise.all([
          getCurrentWeather("Kyiv"),
          getWeatherForecast("Kyiv"),
        ]);

        setWeather(currentWeather);
        setForecast(weatherForecast);
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

      {!loading && !error && weather && (
        <>
          <CurrentWeather weather={weather} />

          {forecast && <Forecast forecast={forecast.list} />}
        </>
      )}
    </div>
  );
}

export default App;
