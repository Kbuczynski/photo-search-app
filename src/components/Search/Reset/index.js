import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Reset = ({ inputValue }) => {
  const resetRef = useRef();

  const handleClickReset = () => {
    const resetButton = resetRef.current;
    resetButton.classList.remove("show");
  };

  useEffect(() => {
    const resetButton = resetRef.current;

    inputValue.length > 0
      ? resetButton.classList.add("show")
      : resetButton.classList.remove("show");
    return () => {
      resetButton.classList.remove("show");
    };
  }, [inputValue]);

  return (
    <button
      type="reset"
      className="search__reset"
      ref={resetRef}
      onClick={handleClickReset}
      title="Clear"
    >
      <i className="icon-cancel"></i>
    </button>
  );
};

Reset.propTypes = {
  inputValue: PropTypes.string,
};

Reset.defaultProps = {
  inputValue: "",
};

export default Reset;
