import React, { useState } from "react";
import PropTypes from "prop-types";
import { firstLetterToUpper } from "../../../utils";
import ErrorMessage from "../../ErrorMessage";
import PhotoModal from "../PhotoModal";
import { Link } from "react-router-dom";

const PhotoItem = ({ image }) => {
  const { id, url, tags, alt } = image;
  const [toggleModal, setToggleModal] = useState(false);

  const handleModal = () => setToggleModal(true);

  if (Object.keys(image).length === 4) {
    return (
      <>
        <figure className="photos__gallery__column__item" key={id.toString()}>
          <img
            src={url}
            alt={alt}
            className="photos__gallery__column__item__img"
            onClick={handleModal}
          />
          <div className="photos__gallery__column__item__tags">
            {tags.length > 0 &&
              tags.map(({ title }) => {
                return (
                  <Link
                    to={`/photos/${title}`}
                    className="photos__gallery__column__item__tags__item"
                    key={`${id}${title}`}
                  >
                    {firstLetterToUpper(title)}
                  </Link>
                );
              })}
          </div>
        </figure>

        {toggleModal && <PhotoModal id={id} setToggleModal={setToggleModal} />}
      </>
    );
  } else {
    return <ErrorMessage />;
  }
};

PhotoItem.propTypes = {
  image: PropTypes.object,
};

PhotoItem.defaultProps = {
  image: {},
};

export default PhotoItem;
