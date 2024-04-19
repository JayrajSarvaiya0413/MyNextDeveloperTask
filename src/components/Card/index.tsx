import React from "react";
import "./card.css"; // Import the CSS file

export interface CardData {
  title: string;
  imageURL: string;
  contentDescription: string;
}

const Card = ({ data }: { data: CardData }) => {
  console.log(data, "data");
  return (
    <div className="card-container">
      <img src={data?.imageURL} className="card-image" alt={data?.title} />
      <div className="card-content">
        <h1 className="card-title">{data?.title}</h1>
        <p className="card-description">{data?.contentDescription}</p>
      </div>
    </div>
  );
};

export { Card };
