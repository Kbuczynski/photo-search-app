import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_WORDS } from "../../../constants";

const PhotosSimilar = ({ inputValue }) => {
  const [result, setResult] = useState({});
  const [scrollValue, setScrollValue] = useState(0);
  const [prevScrollValue, setPrevScrollValue] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const getSuggestions = () => {
      axios
        .get(`${API_WORDS}/words?ml=${inputValue}&max=20`)
        .then((response) => {
          setResult(response);
        });
    };

    if (inputValue.length > 0) {
      getSuggestions();
    }

    return () => {
      setResult({});
    };
  }, [inputValue]);

  const handleRight = () => {
    containerRef.current.scroll(scrollValue + 100, 0);
    setPrevScrollValue(containerRef.current.scrollLeft);
  };

  const handleLeft = () => {
    containerRef.current.scroll(scrollValue - 100, 0);
  };

  const handleScroll = () => {
    setScrollValue(containerRef.current.scrollLeft);
  };

  return (
    <div className="photos__similar">
      <div
        className={`photos__similar__leftArrow ${
          scrollValue === 0 && "unactive"
        }`}
        onClick={handleLeft}
      >
        <i className="icon-left"></i>
      </div>
      <div
        className="photos__similar__container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {Object.keys(result).length > 0 && result.data.length > 0
          ? result.data.map(({ word }) => (
              <Link
                key={word}
                to={`/photos/${word}`}
                className="photos__similar__container__item"
              >
                {word}
              </Link>
            ))
          : null}
      </div>
      <div
        className={`photos__similar__rightArrow ${
          scrollValue === prevScrollValue && prevScrollValue !== 0 && "unactive"
        }`}
        onClick={handleRight}
      >
        <i className="icon-right"></i>
      </div>
    </div>
  );
};

export default PhotosSimilar;
