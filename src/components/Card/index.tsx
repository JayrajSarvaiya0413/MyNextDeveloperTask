import React from "react";

export interface CardData {
  title: string;
  imageURL: string;
  contentDescription: string;
}

const Card = ({ data }: { data: CardData }) => {
  console.log(data, "data");
  return (
    <div>
      <h1>{data?.title}</h1>
      <img src={data?.imageURL} className="card-image" alt={data?.title} />
      <p>{data?.contentDescription}</p>
    </div>
  );
};

export { Card };
