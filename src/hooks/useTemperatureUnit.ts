import { useState } from "react";

import type { TemperatureUnit } from "../components/UnitToggle";

const STORAGE_KEY = "weather-temperature-unit";

const getSavedTemperatureUnit = (): TemperatureUnit => {
  const savedUnit = localStorage.getItem(STORAGE_KEY);

  if (savedUnit === "fahrenheit") {
    return "fahrenheit";
  }

  return "celsius";
};

const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    return getSavedTemperatureUnit();
  });

  const changeUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);

    localStorage.setItem(STORAGE_KEY, newUnit);
  };

  return {
    unit,
    changeUnit,
  };
};

export default useTemperatureUnit;

// import { useEffect, useState } from "react";

// import type { TemperatureUnit } from "../components/UnitToggle";

// const STORAGE_KEY = "weather-temperature-unit";

// const getSavedTemperatureUnit = (): TemperatureUnit => {
//   const savedUnit = localStorage.getItem(STORAGE_KEY);

//   if (savedUnit === "fahrenheit") {
//     return "fahrenheit";
//   }

//   return "celsius";
// };

// const useTemperatureUnit = () => {
//   const [unit, setUnit] = useState<TemperatureUnit>("celsius");

//   useEffect(() => {
//     const savedUnit = getSavedTemperatureUnit();

//     setUnit(savedUnit);
//   }, []);

//   const changeUnit = (newUnit: TemperatureUnit) => {
//     setUnit(newUnit);

//     localStorage.setItem(STORAGE_KEY, newUnit);
//   };

//   return {
//     unit,
//     changeUnit,
//   };
// };

// export default useTemperatureUnit;
