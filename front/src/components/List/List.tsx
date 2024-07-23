import React from "react";
import GifCard from "../gifcard/GifCard";
import { GifCardType } from "../../helpers/gif.translator";

const List = ({ data }: { data?: GifCardType[] }) => {
  return (
    <div>
      {data?.map((gif) => (
        <GifCard key={gif.title} {...gif} />
      ))}
    </div>
  );
};

export default List;
