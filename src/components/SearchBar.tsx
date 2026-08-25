import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <Search size={20} />

      <input
        type="text"
        placeholder="Search city..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
