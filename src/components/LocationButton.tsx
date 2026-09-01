import { MapPin } from "lucide-react";

import "./LocationButton.css";

interface LocationButtonProps {
  onClick: () => void;
  loading?: boolean;
}

const LocationButton = ({ onClick, loading = false }: LocationButtonProps) => {
  return (
    <button
      type="button"
      className="location-button"
      onClick={onClick}
      disabled={loading}
    >
      <MapPin size={18} />

      <span>{loading ? "Getting location..." : "Use my location"}</span>
    </button>
  );
};

export default LocationButton;
