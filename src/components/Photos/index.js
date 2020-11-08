import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useApi";
import Search from "../Search";
import { getDataTypes, BREAKPOINTS } from "../../constants";
import "./index.scss";
import PhotoColumn from "./PhotoColumn";
import { firstLetterToUpper } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import PhotosSimilar from "./PhotosSimilar";

const Photos = ({
  match: {
    params: { query },
  },
}) => {
  const [colFirst, setColFirst] = useState([]);
  const [colSecond, setColSecond] = useState([]);
  const [colThird, setColThird] = useState([]);
  const [page, setPage] = useState(1);
  const [timeoutId, setTimeoutId] = useState(0);
  const [result, isLoading, error] = useApi(
    `${getDataTypes.searchPhotos}?query=${query}&per_page=12&page=${page}`
  );
  const triggerRef = useRef();
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0) {
      const currentTimeoutId = setTimeout(handleNextPage, 1000);
      setTimeoutId(currentTimeoutId);
    }
  });

  window.addEventListener("resize", () => {
    setPageWidth(window.innerWidth);
  });

  useEffect(() => {
    const handleClear = () => {
      setColFirst([]);
      setColSecond([]);
      setColThird([]);
      setPage(1);
    };

    handleClear();
  }, [query]);

  useEffect(() => {
    const handleResult = () => {
      const arrOne = [],
        arrTwo = [],
        arrThree = [];

      result.data.results.forEach(
        ({ id, urls, tags, alt_description }, index) => {
          const { small } = urls;
          const image = {
            id: id,
            url: small,
            tags: tags,
            alt: alt_description,
          };

          if (index % 3 === 0) arrOne.push(image);
          else if (index % 2 === 0) arrTwo.push(image);
          else arrThree.push(image);
        }
      );

      setColFirst([...colFirst, ...arrOne]);
      setColSecond([...colSecond, ...arrTwo]);
      setColThird([...colThird, ...arrThree]);
    };

    if (!isLoading && result.data !== undefined) {
      if (result.data.total_pages >= page) {
        handleResult();
        !error && intersectionObserver.observe(triggerRef.current);
      }
    }

    return () => {
      intersectionObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  return (
    <div className="wrapper">
      <div className="photos">
        <div className="photos__search">
          <Search query={query} isGray={true} />
        </div>

        {error ? (
          <ErrorMessage />
        ) : (
          <>
            <h1 className="photos__title">{firstLetterToUpper(query)}</h1>

            <PhotosSimilar inputValue={query} />

            {colFirst.length === 0 && !isLoading && (
              <p>No pictures with search phrase 😕</p>
            )}

            <div className="photos__gallery">
              <PhotoColumn
                images={
                  pageWidth < BREAKPOINTS.small
                    ? [...colFirst, ...colSecond, ...colThird]
                    : pageWidth < BREAKPOINTS.medium
                    ? [...colFirst, ...colThird.slice(0, colThird.length / 2)]
                    : colFirst
                }
              />

              {pageWidth > BREAKPOINTS.small && (
                <PhotoColumn
                  images={
                    pageWidth < BREAKPOINTS.medium
                      ? [...colSecond, ...colThird.slice(colThird.length / 2)]
                      : colSecond
                  }
                />
              )}

              {pageWidth > BREAKPOINTS.medium && (
                <PhotoColumn images={colThird} />
              )}
            </div>
          </>
        )}

        <div ref={triggerRef} style={{ width: 100, height: 100 }}></div>
      </div>
    </div>
  );
};

export default Photos;
