import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { getCurrentWeather } from "./services/weatherApi";
import type { CurrentWeather } from "./types/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);

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

      {/* {weather && (
        <div>
          <h1>{weather.name}</h1>

          <p>{weather.main.temp}°C</p>

          <p>{weather.weather[0].description}</p>
        </div>
      )} */}
    </div>
  );
}

export default App;
