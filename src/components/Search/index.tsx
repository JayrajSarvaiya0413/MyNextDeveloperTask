import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="q"
          placeholder="Search for a Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Search
        </button>
      </form>
    </div>
  );
};

export { Search };
