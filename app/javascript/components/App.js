import React from "react"
import PropTypes from "prop-types"

import Routes from "./Routes";
import Nav from "./Nav";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: "",
    };
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
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
    const {curTime} = this.state

    return (
      <div className = "App">
        <Nav
          collector_logged_in = {collector_logged_in}
          collector_sign_in = {collector_sign_in}
          collector_sign_out = {collector_sign_out}
          current_collector = {current_collector}
          edit_collector = {edit_collector}
          token = {token}
        />
        <div className = "main">
          <Routes
            collector_logged_in = {collector_logged_in}
            collector_sign_in = {collector_sign_in}
            collector_sign_out = {collector_sign_out}
            current_collector = {current_collector}
            edit_collector = {edit_collector}
            token = {token}
          />
        </div>
        <div className = "dateTime">
          {curTime}
        </div>
      </div>
    );
  }
}

export default App
