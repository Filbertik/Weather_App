import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LocationButton from "./components/LocationButton";

import {
  getCurrentWeather,
  getWeatherForecast,
  getCurrentWeatherByCoords,
  getWeatherForecastByCoords,
} from "./services/weatherApi";

import type {
  CurrentWeather as CurrentWeatherType,
  WeatherForecast,
} from "./types/weather";
import UnitToggle, { type TemperatureUnit } from "./components/UnitToggle";

function App() {
  const [city, setCity] = useState("Kyiv");

  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);

  const [forecast, setForecast] = useState<WeatherForecast | null>(null);

  const [loading, setLoading] = useState(false);

  const [locationLoading, setLocationLoading] = useState(false);

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
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Ваш браузер не підтримує визначення геолокації.");

      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const [currentWeather, weatherForecast] = await Promise.all([
            getCurrentWeatherByCoords(latitude, longitude),
            getWeatherForecastByCoords(latitude, longitude),
          ]);

          setWeather(currentWeather);
          setForecast(weatherForecast);

          setCity(currentWeather.name);
        } catch (error) {
          console.error(error);

          setWeather(null);
          setForecast(null);

          setError("Не вдалося отримати погоду для вашого місцезнаходження.");
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error(error);

        setLocationLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError(
              "Доступ до геолокації заборонено. Дозвольте доступ до місцезнаходження у браузері.",
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setError("Не вдалося визначити ваше місцезнаходження.");
            break;

          case error.TIMEOUT:
            setError("Час очікування геолокації минув. Спробуйте ще раз.");
            break;

          default:
            setError("Не вдалося отримати ваше місцезнаходження.");
        }
      },
    );
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
      <div className="search-section">
        <SearchBar value={city} onChange={setCity} onSearch={searchWeather} />

        <LocationButton onClick={getUserLocation} loading={locationLoading} />

        <UnitToggle unit={unit} onChange={setUnit} />
      </div>
      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={searchWeather} />
      )}

      {!loading && !error && weather && (
        <>
          <CurrentWeather weather={weather} unit={unit} />

          {forecast && <Forecast forecast={forecast.list} unit={unit} />}
        </>
      )}
    </div>
  );
}

export default App;
