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

// import type { CurrentWeather } from "../types/weather";

// const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// const BASE_URL = "https://api.openweathermap.org/data/2.5";

// export const getCurrentWeather = async (
//   city: string,
// ): Promise<CurrentWeather> => {
//   const response = await fetch(
//     `${BASE_URL}/weather?q=${encodeURIComponent(
//       city,
//     )}&appid=${API_KEY}&units=metric&lang=uk`,
//   );

//   if (!response.ok) {
//     throw new Error("Місто не знайдено");
//   }

//   return response.json();
// };

// // const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// // const BASE_URL = "https://api.openweathermap.org/data/2.5";

// // export const getCurrentWeather = async (city: string) => {
// //   const response = await fetch(
// //     `${BASE_URL}/weather?q=${encodeURIComponent(
// //       city,
// //     )}&appid=${API_KEY}&units=metric&lang=uk`,
// //   );

// //   if (!response.ok) {
// //     throw new Error("Місто не знайдено");
// //   }

// //   return response.json();
// // };
