import React from "react";
import PropTypes from "prop-types";
import PhotoItem from "../PhotoItem";

const PhotoColumn = ({ images }) => {
  return (
    <div className="photos__gallery__column">
      {images.map((image, index) => (
        <PhotoItem key={`${image.id}${index}`} image={image} />
      ))}
    </div>
  );
};

PhotoColumn.propTypes = {
  images: PropTypes.array,
};

PhotoColumn.defaultProps = {
  images: [],
};

export default PhotoColumn;
