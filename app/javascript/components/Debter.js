import React from "react"
import PropTypes from "prop-types"

import Account from './Account'

import { accountsFetch } from './API/api'

class Debter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      collapsed: true,
    };
    this.dropClick = this.dropClick.bind(this);
  }


  componentWillMount(){
    this.setTotal()
  }

  setTotal(){
    const { debter } = this.props
    const accounts = debter.accounts
    const debterAccounts = accounts.map((account,index) => {
      return(account.balance)
    })
    let newTotal = 0
    for (let i = 0; i < debterAccounts.length; i++){
      newTotal = newTotal + debterAccounts[i]
    }
    this.setState({total: newTotal})
  }

  dropClick() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }



  render () {
    const { debter } = this.props
    const { total, oddOrEven, collapsed } = this.state

    const accounts = debter.accounts
    const debtersAccounts = accounts.map((account,index) => {
      return(
        <Account
          account = {account}
          index = {index}
        />
      )
    })

    const phoneNumbers = debter.phonenumbers
    const debterPhoneNumbers = phoneNumbers.map((phoneNumber,index) => {
      return(
        <div className = "phoneNumber">
          {phoneNumber.number}
        </div>
      )
    })

    const addresses = debter.addresses
    const debterAddresses = addresses.map((address,index) => {
      return(
        <div className = "address">
          {address.address}
          <br/>
          {address.city}, {address.state} {address.zipcode}
        </div>
      )
    })

    return (
      <div className = "Debter">

        <div className = "debterInfo">

          <div className = "firstname">
            <h2>First Name: {debter.first_name}</h2>
          </div>

          <div className = "lastname">
            <h2>Last Name: {debter.last_name}</h2>
          </div>

          <div className = "ssn">
            <h2>SSN: {debter.ssn}</h2>
          </div>

          <div className = "phonenumbers">
            <h2>Phone Numbers:</h2>
            {debterPhoneNumbers}
          </div>

          <div className = "addresses">
            <h2>Addresses:</h2>
            {debterAddresses}
          </div>

          <div className = "sum">
            <h2>Total Debt: ${total}</h2>
          </div>

          { collapsed &&
            <button className = "accountCollapse" onClick={this.dropClick}>
              <h3>See Accounts ▿</h3>
            </button>
            ||
            <button className = "accountCollapse" onClick={this.dropClick}>
              <h3>Close ▵</h3>
            </button>
          }

        </div>

        <br/>
        {collapsed == false &&
          <div>{debtersAccounts}</div>
        }


      </div>
    );
  }
}

export default Debter
