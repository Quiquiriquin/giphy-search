import React from "react";
import { GifCardType } from "../../helpers/gif.translator";

const GifCard = ({ title, url }: GifCardType) => {
  return (
    <img src={url} alt="title" style={{ width: "300px", height: "220px" }} />
  );
};

export default GifCard;
