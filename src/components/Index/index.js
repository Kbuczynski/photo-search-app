import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "../Main";
import PageNotFound from "../PageNotFound";
import Photos from "../Photos";

const Index = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          exact
          path="/photos/:query"
          render={(props) => <Photos {...props} />}
        />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Index;
