import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_WORDS } from "../../../constants";
import SuggestionsItem from "./SuggestionsItem";
import PropTypes from "prop-types";

const Suggestions = ({ inputValue, isGray, setInputValue, show }) => {
  const [result, setResult] = useState({});
  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    const getSuggestions = () => {
      axios.get(`${API_WORDS}/sug?s=${inputValue}&max=4`).then((response) => {
        setResult(response);
      });
    };

    if (inputValue.length > 0) {
      const currentTimeoutId = setTimeout(getSuggestions, 500);
      setTimeoutId(currentTimeoutId);
    }

    return () => {
      setResult({});
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <ul
      className={`search__box__suggestions ${
        isGray && "search__box__suggestions--gray"
      } ${show && "show"}`}
    >
      {Object.keys(result).length > 0 && result.data.length > 0 ? (
        result.data.map(({ word }) => {
          return (
            <SuggestionsItem
              key={word}
              suggestion={word}
              setInputValue={setInputValue}
            />
          );
        })
      ) : (
        <SuggestionsItem suggestion={"no suggestions"} />
      )}
    </ul>
  );
};

Suggestions.propTypes = {
  inputValue: PropTypes.string,
  isGray: PropTypes.bool,
  setInputValue: PropTypes.func,
  show: PropTypes.bool,
};

Suggestions.defaultProp = {
  inputValue: "",
  isGray: false,
  setInputValue: () => {},
  show: false,
};

export default Suggestions;
