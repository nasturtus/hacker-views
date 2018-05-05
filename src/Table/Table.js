import React from "react";
import PropTypes from "prop-types";

import { imgUrls } from "../Utils";
import "../App/App.css";
import "./Table.css";

const Table = props => {
  const {
    hits,
    page,
    nbPages,
    filterCallback,
    searchTerm,
    loadMoreStories
  } = props; // object destructuring

  const loadMoreStoriesButton = page < nbPages - 1 && (
    <button
      onClick={() => {
        loadMoreStories(searchTerm, page + 1);
      }}
    >
      Load More
    </button>
  );

  return (
    <div>
      <h3 className="table-results-header">
        Page {page + 1} of {nbPages}
      </h3>

      <div className="table-flexbox">
        {hits.filter(filterCallback(searchTerm)).map((item, index) => (
          <div key={item.objectID} className="table-flexbox-column">
            <div className="table-grid-panel-thumbnail">
              <a href={imgUrls[index]} target="_blank">
                <img
                  className="table-image"
                  src={imgUrls[index]}
                  alt="greatviews"
                />
              </a>
            </div>

            <div className="table-grid-panel-news">
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="table-loadMoreStoriesButton">
        {/* conditional rendering of button */}
        {loadMoreStoriesButton}
      </div>
    </div>
  );
};

Table.prototypes = {
  hits: PropTypes.array,
  page: PropTypes.number,
  nbPages: PropTypes.number,
  searchTerm: PropTypes.string,
  filterCallback: PropTypes.func,
  loadMoreStories: PropTypes.func
};

export default Table;
