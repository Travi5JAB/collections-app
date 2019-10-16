import React from "react"
import PropTypes from "prop-types"

///parts
import Account from './Account'

///fetches
import { accountsFetch, createPhone, createAddress } from './API/api'

class Debter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      collapsed: true,
      openAddInfo: false,
      addAddressOpen: false,
      addPhoneOpen: false,
      addressInfo: {
        mainAddress: "",
        city: "",
        debter_id: this.props.debter.id,
        stateInitial: "",
        zipcode: ""
      },
      phoneInfo: {
        phoneType: "Cell",
        number: "",
        debter_id: this.props.debter.id
      },
    };
    this.addAddress = this.addAddress.bind(this);
    this.addPhone = this.addPhone.bind(this);
    this.dropClick = this.dropClick.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.openAddAddress = this.openAddAddress.bind(this);
    this.openAddPhone = this.openAddPhone.bind(this);
  }

  addAddress(){
    const { addressInfo } = this.state
    const { token } = this.props
    createAddress(addressInfo, token).then(successCreate => {
      alert("Address Added")
    })
  }

  addPhone(){
    const { phoneInfo } = this.state
    const { token } = this.props
    if (phoneInfo.number.length == 10) {
      createPhone(phoneInfo, token).then(successCreate => {
        alert("Phone Added")
      })
    }else{
      alert("Phone number must be 10 digits")
    }
  }

  componentDidMount(){
    this.setTotal()
  }


  handleAddressChange(event){
    const { addressInfo } = this.state
    addressInfo[event.target.name] = event.target.value
    this.setState({ addressInfo })
  }
  handlePhoneChange(event){
    const { phoneInfo } = this.state
    phoneInfo[event.target.name] = event.target.value
    this.setState({ phoneInfo })
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

  openAddAddress(){
    this.setState(prevState => ({
      addAddressOpen: !prevState.addAddressOpen,
      openAddInfo: !prevState.openAddInfo
     }))
    }
  openAddPhone(){
    this.setState(prevState => ({
      addPhoneOpen: !prevState.addPhoneOpen}))
    this.setState(prevState => ({
      openAddInfo: !prevState.openAddInfo}));
  }



  render () {
    const { debter, token } = this.props
    const { total,
            oddOrEven,
            collapsed,
            openAddInfo,
            addAddressOpen,
            addPhoneOpen
          } = this.state

    const accounts = debter.accounts
    const debtersAccounts = accounts.map((account,index) => {
      return(
        <Account
          account = {account}
          index = {index}
          token = {token}
          key = {account}
        />
      )
    })

    const phoneNumbers = debter.phonenumbers
    const debterPhoneNumbers = phoneNumbers.map((phoneNumber,index) => {
      return(
        <div className = "phoneNumber" key = {phoneNumber.number}>
          {phoneNumber.phone_type}: {phoneNumber.number}
        </div>
      )
    })

    const addresses = debter.addresses
    const debterAddresses = addresses.map((address,index) => {
      return(
        <div className = "address" key = {address.address}>
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
            <div id = "flex">
              <h2>Phone Numbers:</h2>
              <button onClick = {this.openAddPhone}>⚙️</button>
            </div>
            {debterPhoneNumbers}
          </div>

          <div className = "addresses">
            <div id = "flex">
              <h2>Addresses:</h2>
              <button onClick = {this.openAddAddress}>⚙️</button>
            </div>
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
        { collapsed == false &&
          <div>
            {debtersAccounts}
          </div>
        }

        { openAddInfo &&
          <div className = "AddInfo">
            { addAddressOpen &&
              <div>
                <button onClick = {this.openAddAddress} className = "add">X</button>
                <div className = "main">
                <h1>Add Address</h1>
                  <form className = "addAddressForm" onSubmit = {this.addAddress}>
                    <p>Address:</p>
                    <input
                      placeholder = "123 Main St #21"
                      className = "addressName"
                      onChange = {this.handleAddressChange}
                      ref = {(address) => this.address = address}
                      value = {this.state.addressInfo.mainAddress}
                      name = "mainAddress"
                      autoFocus = "true"
                    />
                    <p>State:</p>
                    <input
                      placeholder = "CA"
                      className = "state"
                      onChange = {this.handleAddressChange}
                      value = {this.state.addressInfo.stateInitial}
                      name = "stateInitial"
                    />
                    <p>City:</p>
                    <input
                      placeholder = "La Mesa"
                      className = "city"
                      onChange = {this.handleAddressChange}
                      ref = {(city) => this.city = city}
                      value = {this.state.addressInfo.city}
                      name = "city"
                    />
                    <p>Zipcode:</p>
                    <input
                      placeholder = "91941"
                      className = "zipcode"
                      onChange = {this.handleAddressChange}
                      ref = {(zipcode) => this.zipcode = zipcode}
                      value = {this.state.addressInfo.zipcode}
                      name = "zipcode"
                      autoFocus = "true"
                      type = "text"
                    />
                    <input type = "submit" placeholder = "Submit" />
                  </form>
                </div>
              </div>

              ||

              addPhoneOpen &&

              <div>
                <button onClick = {this.openAddPhone} className = "add">X</button>
                <div className = "main">
                <h1>Add a Phone Number</h1>
                  <form className = "addPhoneForm" onSubmit = {this.addPhone}>
                    <input
                      placeholder = "6195556677"
                      className = "phoneNumber"
                      onChange = {this.handlePhoneChange}
                      ref = {(number) => this.number = number}
                      name = "number"
                      value = {this.state.phoneInfo.number}
                      autoFocus = "true"
                      type = "text"
                    />

                    <select name = "phoneType" value = {this.state.phoneInfo.phoneType} onChange = {this.handlePhoneChange}>
                      <option disabled>
                        -- select a type --
                      </option>
                      <option name = "phoneType" value = "Cell" onChange = {this.handlePhoneChange}>
                        Cell
                      </option>
                      <option name = "phoneType" value = "Home" onChange = {this.handlePhoneChange}>
                        Home
                      </option>
                      <option name = "phoneType" value = "Work" onChange = {this.handlePhoneChange}>
                        Work
                      </option>
                      <option name = "phoneType" value = "Other" onChange = {this.handlePhoneChange}>
                        Other
                      </option>
                    </select>

                    <input type = "submit" placeholder = "Submit" />
                  </form>
                </div>
              </div>
            }
          </div>
        }

      </div>
    );
  }
}

export default Debter
