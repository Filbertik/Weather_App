import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";

import { getCurrentWeather } from "./services/weatherApi";

import type { CurrentWeather as CurrentWeatherType } from "./types/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);

  const searchWeather = async () => {
    if (!city.trim()) return;

    try {
      const data = await getCurrentWeather(city);

      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        const data = await getCurrentWeather("Kyiv");

        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDefaultWeather();
  }, []);

  return (
    <div>
      <SearchBar value={city} onChange={setCity} onSearch={searchWeather} />

      {weather && <CurrentWeather weather={weather} />}
    </div>
  );
}

export default App;
