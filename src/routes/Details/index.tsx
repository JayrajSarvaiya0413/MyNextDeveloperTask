import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardData } from "../../components/Card";
import axios from "axios";
import "./details.css"; // Import the CSS file

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonDetails(response.data); // Update to response.data
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]); // Removed pokemonDetails from dependency array

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const data: CardData = {
    title: pokemonDetails.name,
    imageURL: pokemonDetails.sprites.front_default,
    contentDescription: `Types: ${pokemonDetails.types
      .map((type: any) => type.type.name)
      .join(", ")}`,
  };

  return (
    <div>
      <h1>Details View</h1>
      <div className="details-container">
        <div className="card-container">
          <Card data={data} />
        </div>
      </div>
    </div>
  );
};

export default Details;
