import React from "react"
import PropTypes from "prop-types"

///parts
import Account from './Account'
import AddInfo from './AddInfo'

///fetches
import { accountsFetch, createPhone, createAddress, destroyPhone } from './API/api'

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
    // this.addAddress = this.addAddress.bind(this);
    // this.addPhone = this.addPhone.bind(this);
    this.deleteNumber = this.deleteNumber.bind(this);
    this.dropClick = this.dropClick.bind(this);
    // this.handleAddressChange = this.handleAddressChange.bind(this);
    // this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.openAddAddress = this.openAddAddress.bind(this);
    this.openAddPhone = this.openAddPhone.bind(this);
  }

  // addAddress(){
  //   const { addressInfo } = this.state
  //   const { token } = this.props
  //   createAddress(addressInfo, token).then(successCreate => {
  //     alert("Address Added")
  //   })
  // }
  //
  // addPhone(){
  //   const { phoneInfo } = this.state
  //   const { token } = this.props
  //   if (phoneInfo.number.length == 10) {
  //     createPhone(phoneInfo, token).then(successCreate => {
  //       alert("Phone Added")
  //     })
  //   }else{
  //     alert("Phone number must be 10 digits")
  //   }
  // }

  deleteNumber(phoneId, phoneNumber){
    const { token } = this.props
    destroyPhone(phoneId, token).then(successDelete => {
      alert(`Phone-Number ${phoneNumber} Deleted`)
      console.log(`Phone-Number ${phoneNumber} Deleted`);
    })
  }

  componentDidMount(){
    this.setTotal()
  }


  // handleAddressChange(event){
  //   const { addressInfo } = this.state
  //   addressInfo[event.target.name] = event.target.value
  //   this.setState({ addressInfo })
  // }
  // handlePhoneChange(event){
  //   const { phoneInfo } = this.state
  //   phoneInfo[event.target.name] = event.target.value
  //   this.setState({ phoneInfo })
  // }

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
          <div className = "phoneType">{phoneNumber.phone_type}: </div>
          <div className = "number">{phoneNumber.number}</div>
          <button id = "trash"></button>
        </div>
      )
    })

    const addresses = debter.addresses
    const debterAddresses = addresses.map((address,index) => {
      return(
        <div className = "address" key = {address.address}>
          {address.address}
          <button id = "trash" onClick = {this.openAddPhone}></button>
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

        <AddInfo
          debter = {debter}
          openAddPhone = {this.openAddPhone}
          openAddAddress = {this.openAddAddress}
          addAddressOpen = {addAddressOpen}
          addPhoneOpen = {addPhoneOpen}
          openAddInfo = {openAddInfo}
        />

      </div>
    );
  }
}

export default Debter
