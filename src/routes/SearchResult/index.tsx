import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("q");

    if (searchTerm) {
      // Fetch Pokémon data based on the search term
      const fetchPokemonData = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20&name=${searchTerm}`
          );
          console.log("searchResults", searchResults);
          setSearchResults(response.data.results);
          //   console.log("searchResults", searchResults);
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
        }
      };

      fetchPokemonData();
    }
  }, [location.search]);

  const handlePokemonClick = (url: any) => {
    // Navigate to Details page with the selected pokemonId
    // navigate(`/details/${pokemonId}`);
    const segments = url.split("/");
    const id = segments[segments.length - 2];
    navigate(`/details/${id}`);
  };

  return (
    <div>
      <h1>Search Related Pokemon</h1>
      <div id="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((pokemon: any) => (
            <div
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.url)}
            >
              <p>{pokemon.name}</p>
            </div>
          ))
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
