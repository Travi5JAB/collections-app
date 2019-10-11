import React from "react"
import PropTypes from "prop-types"

////fetch
import { commentsFetch } from './API/api'

/////parts
import Post from './Post'

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oddOrEven: "",
      comments: [],
      collapsed: true,
    };
    this.dropClick = this.dropClick.bind(this);
  }

  componentDidMount(){
    const { index } = this.props
    this.evenOrOdd(index)
    this.dataFetch()
  }

  dataFetch(){
    const { id } = this.props.account
    commentsFetch(id).then(APIcomments => {
      this.setState({
        comments: APIcomments
       });
    })
  }

  dropClick() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }

  evenOrOdd(n) {
    if (n % 2 == 0) {
      this.setState({oddOrEven: "accountEven"})
    }else{
      this.setState({oddOrEven: "accountOdd"})
    }
  }


  render () {
    const { oddOrEven, comments, collapsed } = this.state
    const { account, token } = this.props

    const accountComments = comments.map((comment,index) => {
      return(
        <div className = "comment" key = {comment.string}>
          <p className = "date">
            Date: {comment.created_at.substring(0,10)}
          </p>
          <p className = "time">
            Time: {comment.created_at.substring(11,19)}
          </p>
          <p className = "collectorId">
            Comment by: {comment.account.debter.debtcollector.username}
          </p>
          <p className = 'note'>
            Comment:
          </p>
          <h3 className = "commentString">
            {comment.string}
          </h3>
        </div>
      )
    })

    return (
      <div>
        <div className = {oddOrEven}>

          <div className = "accountNumber">
            <p>Account Number: {account.id}</p>
          </div>

          <div className = "accountHolder">
            <p>Account Holder: {account.debtholder.holdername}</p>
          </div>

          <div className = "commentButton">
            { collapsed &&
              <button className = "commentCollapse" onClick={this.dropClick}>
                <h3>See Comments ▿</h3>
              </button>
              ||
              <button className = "commentCollapse" onClick={this.dropClick}>
                <h3>Close ▵</h3>
              </button>
            }
          </div>

          <Post
            account = {account}
            token = {token}
          />

          <div className = "accountBalance">
            <p>Balance: ${account.balance}</p>
          </div>

        </div>
        { collapsed == false &&
          <div>
            {accountComments}
          </div>
        }
      </div>
    );
  }
}

export default Account
