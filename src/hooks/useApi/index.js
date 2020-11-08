import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../constants";

export const useApi = (query) => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;

    const getData = async () => {
      setIsLoading(true);

      await axios
        .get(`${API}${query}`, {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
          },
        })
        .then((response) => {
          if (!canceled) {
            setResult(response);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) setError(error.response);
          else setError(error.message);
        });
    };

    getData();

    return () => {
      canceled = true;
    };
  }, [query]);

  return [result, isLoading, error];
};
