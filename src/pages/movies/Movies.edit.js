import React from "react";
import { useParams } from "react-router-dom";

const MoviesEdit = () => {
  const { id } = useParams();

  console.log("params:", id);
  return <p>movie edit{id}</p>;
};
export default MoviesEdit;
