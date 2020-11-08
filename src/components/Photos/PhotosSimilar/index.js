import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_WORDS } from "../../../constants";

const PhotosSimilar = ({ inputValue }) => {
  const [result, setResult] = useState({});

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

  return (
    <div className="photos__similar">
      <div className="photos__similar__container">
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
    </div>
  );
};

export default PhotosSimilar;
