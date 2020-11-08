import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { useApi } from "../../../hooks/useApi";
import { getDataTypes } from "../../../constants";

const PhotoModal = ({ id, setToggleModal }) => {
  const [result, isLoading, error] = useApi(`${getDataTypes.getPhoto}${id}/`);

  const handleClose = () => setToggleModal(false);

  if (!isLoading && !error && Object.keys(result).length > 0) {
    return (
      <div role="button" className="modal" onClick={handleClose}>
        <div className="modal__box">
          <div className="modal__box__user">
            <h3>{result.data.user.name}</h3>
            <p>@{result.data.user.username}</p>
          </div>
          <div className="modal__box__img">
            <img
              src={result.data.urls.regular}
              alt={result.data.alt_description}
            ></img>
          </div>
          <div className="modal__box__location">
            <i className="icon-location"></i>
            <p>
              {result.data.location.city === null
                ? "Location not found"
                : `${result.data.location.city}, ${result.data.location.country}`}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

PhotoModal.propTypes = {
  id: PropTypes.string,
  setToggleModal: PropTypes.func,
};

PhotoModal.defaultProps = {
  id: "",
  setToggleModal: () => {},
};

export default PhotoModal;
