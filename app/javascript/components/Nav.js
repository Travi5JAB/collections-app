import React from "react"
import PropTypes from "prop-types"


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    const {
      collector_logged_in,
      collector_sign_out,
      collector_sign_in,
      current_collector,
      edit_collector,
      token
    } = this.props;
    const accountLink = `/myaccounts/${current_collector.id}`

    return (
      <div className = "Nav">
        <a
          className="navBtn"
          href={(collector_logged_in && collector_sign_out) || collector_sign_in}
          id="signInOut"
        >
          {(collector_logged_in && "Log Out") || "Log In"}
        </a>
        <a
          className="navBtn"
          href={accountLink}
          id="myaccountsBtn"
        >
          My Accounts
        </a>
        <a
          className="navBtn"
          href="/"
          id="homeBtn"
        >
          Home
        </a>
      </div>
    );
  }
}

export default Nav
