import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardData } from "../../components/Card";
import axios from "axios";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  console.log("data11", id);

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

  // Moved console.log outside of useEffect
  console.log("pokemonDetails:", pokemonDetails);

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
    <>
      <h1>Pokemon Details</h1>
      <Card data={data} />
    </>
  );
};

export default Details;
