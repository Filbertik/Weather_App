import type { TemperatureUnit } from "../components/UnitToggle";

const STORAGE_KEY = "weather-temperature-unit";

export const getSavedTemperatureUnit = (): TemperatureUnit => {
  const savedUnit = localStorage.getItem(STORAGE_KEY);

  if (savedUnit === "fahrenheit") {
    return "fahrenheit";
  }

  return "celsius";
};

export const saveTemperatureUnit = (unit: TemperatureUnit): void => {
  localStorage.setItem(STORAGE_KEY, unit);
};
