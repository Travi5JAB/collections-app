import React from "react"
import PropTypes from "prop-types"


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    const {current_collector} = this.props
    const {curTime} = this.state

    return (
      <div className = "Home">
        <h2>{current_collector.first_name} {current_collector.last_name}</h2>
        <h3>Id - {current_collector.username}</h3>

      </div>
    );
  }
}

export default Home
