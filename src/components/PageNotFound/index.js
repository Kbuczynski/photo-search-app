import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./index.scss";

const PageNotFound = withRouter(({ history }) => {
  useEffect(() => {
    setTimeout(() => history.push(`/`), 2000);
  }, []);

  return (
    <div className="pageNotFound">
      <p>Page not found 🤔</p>
      <p>You will be redirected to the home page</p>
    </div>
  );
});

export default PageNotFound;
