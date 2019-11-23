import React from "react"
import PropTypes from "prop-types"

class AddInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.closePhone = this.closePhone.bind(this);
    this.closeAddress = this.closeAddress.bind(this);
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

  closeAddress(){
    const {openAddAddress} = this.props
    openAddAddress()
  }
  closePhone(){
    const {openAddPhone} = this.props
    openAddPhone()
  }


  render () {
    const {
      openAddInfo,
      addAddressOpen,
      addPhoneOpen
    } = this.props

    return (
      <div>
        { openAddInfo &&
          <div className = "AddInfo">
            { addAddressOpen &&
              <div>
                <button onClick = {this.closeAddress} className = "add">X</button>
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
                <button onClick = {this.closePhone} className = "add">X</button>
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

export default AddInfo
