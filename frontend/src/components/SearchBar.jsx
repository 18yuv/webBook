import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        placeholder="Search bookmarks by title or tag..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
}