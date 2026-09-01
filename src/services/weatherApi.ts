import type { CurrentWeather, WeatherForecast } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (
  city: string,
): Promise<CurrentWeather> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(
      city,
    )}&appid=${API_KEY}&units=metric&lang=uk`,
  );

  if (!response.ok) {
    throw new Error("Місто не знайдено");
  }

  return response.json();
};

export const getWeatherForecast = async (
  city: string,
): Promise<WeatherForecast> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(
      city,
    )}&appid=${API_KEY}&units=metric&lang=uk`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати прогноз");
  }

  return response.json();
};

export const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати погоду за координатами");
  }

  return response.json();
};

export const getWeatherForecastByCoords = async (
  lat: number,
  lon: number,
): Promise<WeatherForecast> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати прогноз за координатами");
  }

  return response.json();
};
