import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const SuggestionsItem = withRouter(({ history, suggestion, setInputValue }) => {
  const handleClick = () => {
    if (suggestion !== "no suggestions") {
      setInputValue(suggestion);
      history.push(`/photos/${suggestion}`);
    }
  };

  return (
    <li className="search__box__suggestions__item" onClick={handleClick}>
      {suggestion}
    </li>
  );
});

SuggestionsItem.propTypes = {
  suggestion: PropTypes.string,
  setInputValue: PropTypes.func,
};

SuggestionsItem.defaultProp = {
  suggestion: "no suggestions",
  setInputValue: () => {},
};

export default SuggestionsItem;
