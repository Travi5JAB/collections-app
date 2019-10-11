import React from "react"
import PropTypes from "prop-types"

import Debter from './Debter'

import { accountsFetch } from './API/api'

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debters: [],
    };
  }
    componentDidMount(){
      this.dataFetch()
    }

    dataFetch(){
      const { id } = this.props.match.params
      accountsFetch(id).then(APIaccounts => {
        this.setState({
          debters: APIaccounts
         });
      })
    }

  render () {
    const { debters } = this.state
    const { current_collector, token } = this.props

    const myAccounts = debters.map((debter,index) => {
      return(
        <Debter
          debter = {debter}
          token = {token}
          key = {debter.ssn}
        />
      )
    })

    return (
      <div className = "Accounts">
        <h1>{current_collector.first_name}'s Accounts</h1>
        {myAccounts}
      </div>
    );
  }
}

export default Accounts
