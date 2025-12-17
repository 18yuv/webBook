import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        placeholder="Search by title or tag..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
}