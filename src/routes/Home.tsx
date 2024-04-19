import React, { useCallback, useEffect, useState } from "react";
import { Search } from "../components/Search";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [pokemonData, setPokemonData] = useState<any>([]);
  const [randomPokemon, setRandomPokemon] = useState<any>(null);

  const fetchAPI = useCallback(async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      if (response) {
        setPokemonData(response?.data?.results);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const fetchPokemonDetails = useCallback(async (pokemonUrl: string) => {
    try {
      const response = await axios.get(pokemonUrl);
      if (response) {
        setRandomPokemon(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  useEffect(() => {
    const storedPokemon = JSON.parse(
      localStorage.getItem("randomPokemon") || "null"
    );
    const storedDate = localStorage.getItem("randomPokemonDate");

    // Check if stored Pokemon is from today, if not, choose a new random Pokemon
    const today = new Date().toISOString().split("T")[0];
    if (storedPokemon && storedDate === today) {
      setRandomPokemon(storedPokemon);
    } else if (pokemonData.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      const randomPokemonUrl = pokemonData[randomIndex].url;
      fetchPokemonDetails(randomPokemonUrl);
      localStorage.setItem("randomPokemonDate", today);
    }
  }, [pokemonData, fetchPokemonDetails]);

  useEffect(() => {
    // Save the chosen random Pokemon to localStorage
    if (randomPokemon) {
      localStorage.setItem("randomPokemon", JSON.stringify(randomPokemon));
    }
  }, [randomPokemon]);

  return (
    <div>
      <h1>Homepage</h1>
      <div>
        <Search />
      </div>
      <div id="random-pokemon">
        {randomPokemon && (
          <div>
            <div className="card-container">
              {randomPokemon.sprites && randomPokemon.sprites.front_default && (
                <img
                  className="card-image"
                  src={randomPokemon.sprites.front_default}
                  alt={randomPokemon.name}
                />
              )}
              <div className="card-content">
                <h1 className="card-title">{randomPokemon.name}</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
