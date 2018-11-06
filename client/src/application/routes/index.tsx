import * as React from "react";
import { Route, Switch } from "react-router";
import { Message } from "../components/Message";
import { Navigation } from "../components/Navigation";

const NoMatch = () => <div id="badUrl">404</div>;

// todo: change Navigation component to navigation only
// todo: place it before switch

const routes = (
  <>
    <Switch>
      <Route exact={true} path="/" component={Navigation} />
      <Route path="/message/:messageId/:isError" component={Message} />
      <Route component={NoMatch} />
    </Switch>
  </>
);

export default routes;
