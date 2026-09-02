import type { TemperatureUnit } from "../components/UnitToggle";

export const convertTemperature = (
  temperature: number,
  unit: TemperatureUnit,
): number => {
  if (unit === "fahrenheit") {
    return (temperature * 9) / 5 + 32;
  }

  return temperature;
};

export const formatTemperature = (
  temperature: number,
  unit: TemperatureUnit,
): string => {
  return `${Math.round(convertTemperature(temperature, unit))}°`;
};
