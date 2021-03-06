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

    const debterAccountsLink = `/myaccounts/${current_collector.id}`
    const adminAccountsLink = `/allaccounts/${current_collector.id}`
    const myPaymentsLink = `/mypayments/${current_collector.id}`
    const allPaymentsLink = `/allpayments/${current_collector.id}`

    return (
      <div className = "Nav">

        <a
          className="navBtn"
          href={(collector_logged_in && collector_sign_out) || collector_sign_in}
          id="signInOut"
        >
          {(collector_logged_in && "Log Out") || "Log In"}
        </a>

        { current_collector.admin_access == false &&
          <a
            className="navBtn"
            href={debterAccountsLink}
            id="myaccountsBtn"
          >
            My Accounts
          </a>
        }

        { current_collector.admin_access &&
          <a
            className="navBtn"
            href={adminAccountsLink}
            id="adminLinkBtn"
          >
            Admin Link
          </a>
        }

        { current_collector.admin_access == false &&
          <a
            className="navBtn"
            href={myPaymentsLink}
            id="myPayments"
          >
            My Payments
          </a>
        }

        { current_collector.admin_access &&
          <a
            className="navBtn"
            href={allPaymentsLink}
            id="myPayments"
          >
            All Payments
          </a>
        }

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
