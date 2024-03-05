import React from "react";

const Search = (props:any) => {
  return (
    <input
      onChange={({ target: { value } }) => props.search(value)}
      type="text"
      placeholder="Название школы..."
    />
  );
};

export default Search;
