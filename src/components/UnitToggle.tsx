import "./UnitToggle.css";

export type TemperatureUnit = "celsius" | "fahrenheit";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

const UnitToggle = ({ unit, onChange }: UnitToggleProps) => {
  return (
    <div className="unit-toggle">
      <button
        type="button"
        className={unit === "celsius" ? "active" : ""}
        onClick={() => onChange("celsius")}
      >
        °C
      </button>

      <button
        type="button"
        className={unit === "fahrenheit" ? "active" : ""}
        onClick={() => onChange("fahrenheit")}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
