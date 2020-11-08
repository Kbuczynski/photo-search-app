import React from "react";
import { Link } from "react-router-dom";
import { trendings } from "../../constants";
import Search from "../Search/index";
import "./index.scss";

const Main = () => {
  return (
    <div className="main">
      <div className="main__container">
        <section className="main__container__header">
          <h1 className="main__container__header__title">Unsplash</h1>
          <p className="main__container__header__text">
            The internet's source of{" "}
            <a
              className="main__container__header__text__link"
              href="https://unsplash.com/license"
            >
              freely-usable images
            </a>
            .
          </p>
          <p className="main__container__header__text">
            Powered by creators everywhere.
          </p>
        </section>
        <Search />
        <section className="main__container__trending">
          <p className="main__container__trending__text">
            <span>Trending:</span>
            {Object.keys(trendings).map((trend, index) => (
              <span
                key={trend}
                className="main__container__trending__text__links"
              >
                &nbsp;
                <Link to={`/photos/${trend}`}>{trend}</Link>
                {index < Object.keys(trendings).length - 1 && ","}
              </span>
            ))}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Main;
