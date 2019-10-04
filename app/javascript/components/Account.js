import React from "react"
import PropTypes from "prop-types"

import { accountsFetch } from './API/api'

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oddOrEven: "",
    };
  }

  componentWillMount(){
    const { index } = this.props
    this.evenOrOdd(index)
  }

  evenOrOdd(n) {
    if (n % 2 == 0) {
      this.setState({oddOrEven: "accountEven"})
    }else{
      this.setState({oddOrEven: "accountOdd"})
    }
  }


  render () {
    const { oddOrEven } = this.state
    const { account } = this.props

    return (
      <div className = {oddOrEven}>

        <div className = "accountNumber">
          Account Number: {account.id}
        </div>

        <div className = "accountHolder">
        Account Holder: {account.debtholder.holdername}
        </div>

        <div className = "accountBalance">
          Balance: ${account.balance}
        </div>

      </div>
    );
  }
}

export default Account
