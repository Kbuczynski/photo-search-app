import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import Reset from "./Reset";
import Submit from "./Submit";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { BREAKPOINTS } from "../../constants";
import Suggestions from "./Suggestions";

const Search = withRouter(({ history, query, isGray = false }) => {
  const [inputValue, setInputValue] = useState(query);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const inputRef = useRef();
  const [toggleSuggestions, setToggleSuggestions] = useState(false);

  window.addEventListener("resize", () => {
    setPageWidth(window.innerWidth);
  });

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleInput = (e) => {
    const input = e.target;
    if (!toggleSuggestions) setToggleSuggestions(true);
    setInputValue(input.value);
  };

  const handleFocusInput = () => {
    setToggleSuggestions(true);
  };

  const handleBlurInput = () => {
    setToggleSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      setToggleSuggestions(false);
      history.push(`/photos/${inputValue}`);
    }
  };

  const handleReset = () => {
    inputRef.current.focus();
    setInputValue("");
  };

  return (
    <form
      className={`search ${isGray && "search--gray"}`}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Submit />
      <div className="search__box">
        <input
          className={`search__box__input ${isGray && "search--gray"}`}
          type="text"
          autoComplete="off"
          placeholder={
            BREAKPOINTS.small < pageWidth
              ? "Search free high-resolution photos"
              : "Search photos"
          }
          ref={inputRef}
          value={inputValue}
          onInput={handleInput}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
        />
        <Suggestions
          inputValue={inputValue}
          setInputValue={setInputValue}
          isGray={isGray}
          show={toggleSuggestions}
        />
      </div>
      <Reset inputValue={inputValue} setInputValue={setInputValue} />
    </form>
  );
});

Search.propTypes = {
  query: PropTypes.string,
  isGray: PropTypes.bool,
};

Search.defaultProps = {
  query: "",
  isGray: false,
};

export default Search;
