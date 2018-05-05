import React from "react";
import PropTypes from "prop-types";

import "./Search.css";
import searchIcon from "./searchIcon.png";

const Search = props => {
  const { value, onChange, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        autoFocus
        size="50"
      />
      <img className="search-searchIcon" src={searchIcon} alt="search" />
    </form>
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Search;
