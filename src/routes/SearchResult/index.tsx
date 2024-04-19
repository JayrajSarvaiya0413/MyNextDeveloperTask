import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardData } from "../../components/Card";
import "./searchResult.css"; // Import the CSS file

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [SpecialSearchResults, setSpecialSearchResults] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("q");

    if (searchTerm) {
      // Fetch Pokémon data based on the search term
      const fetchPokemonData = async () => {
        try {
          const specificResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
          );

          // If Pokémon data is found
          if (specificResponse.status === 200) {
            setSpecialSearchResults(specificResponse.data);
          }
        } catch (error: any) {
          // If Pokémon data is not found
          if (error.response && error.response.status === 404) {
            try {
              const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20&name=${searchTerm}`
              );
              setSearchResults(response.data.results);
            } catch (err) {
              console.error("Error fetching Pokémon data:", err);
            }
          } else {
            console.error("Error fetching Pokémon data:", error);
          }
        }
      };

      fetchPokemonData();
    }
  }, [location.search]);

  const handlePokemonClick = (url: any) => {
    const segments = url.split("/");
    const id = segments[segments.length - 2];
    navigate(`/details/${id}`);
  };

  return (
    <div className="search-results-container">
      <h1>Search Related Pokemon</h1>
      <div className="search-results">
        {/* Render special search results if available */}
        {SpecialSearchResults && (
          <div className="special-search-result">
            <Card
              data={{
                title: SpecialSearchResults.name,
                imageURL: SpecialSearchResults.sprites.front_default,
                contentDescription: `Types: ${SpecialSearchResults.types
                  .map((type: any) => type.type.name)
                  .join(", ")}`,
              }}
            />
          </div>
        )}
        {/* Render regular search results */}
        {searchResults.length > 0 && (
          <div className="regular-search-results">
            <ul>
              {searchResults.map((pokemon: any) => (
                <li
                  key={pokemon.name}
                  onClick={() => handlePokemonClick(pokemon.url)}
                >
                  {pokemon.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
