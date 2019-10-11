import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

////pages
import Home from "./Home";
import Accounts from "./Accounts";


class Routes extends React.Component {
  render() {
    const {
      collector_logged_in,
      collector_sign_out,
      collector_sign_in,
      current_collector,
      edit_collector,
      token
    } = this.props;
  return (
    <Router>
      <Route
        exact
        path="/"
        render={props => (
          <Home {...props}
            current_collector = {current_collector}
          />
        )}
      />
      <Route
        exact
        path="/myaccounts/:id"
        render={props => (
          <Accounts {...props}
            current_collector = {current_collector}
            token = {token}
          />
        )}
      />

    </Router>
  );
  }
}

export default Routes;
