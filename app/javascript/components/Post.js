import React from "react"
import PropTypes from "prop-types"

import { createComment, submitPayment } from './API/api'


export default class Post extends React.Component {
    constructor(props){
      super(props)
        this.state = {
          reply: "noreply",
          replydiv: "noreplydiv",
          replytoggle: "Comment on Account",
          commentString: "",
          payment: false,
          paymentDiv: true,
          paymentAmount: "",
          focusString: false,
          focusPayment: false,
        }
      this.replyclick = this.replyclick.bind(this);
      this.paymentClick = this.paymentClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handlePaymentChange = this.handlePaymentChange.bind(this);
      this.commentSubmit = this.commentSubmit.bind(this);
      this.paymentSubmit = this.paymentSubmit.bind(this);
      this.focus = this.focus.bind(this);
    }


    focus() {
      const { focusPayment, focusString } = this.state
      if (focusPayment){
        this.paymentAmount.focus();
      }else if (focusString){
        this.commentString.focus();
      }
    }

    componentWillUpdate(){
      this.focus();
    }

    replyclick(){
      const { reply } = this.state
      if(reply == "noreply"){
        const newreply = "reply"
        const newreplydiv = "replydiv"
        const toggler = "X"
        this.setState({
          reply: newreply,
          replydiv: newreplydiv,
          replytoggle: toggler,
          paymentDiv: false,
          payment: false,
          focusPayment: false,
          focusString: true
        })
      }else{
        const newreply = "noreply"
        const newreplydiv = "noreplydiv"
        const toggler = "Comment on Account"
        this.setState({
          reply: newreply,
          replydiv: newreplydiv,
          replytoggle: toggler,
          paymentDiv: true,
          focusPayment: false,
          focusString: false
        })
      }
    }

    paymentClick(){
      const {payment} = this.state
      this.replyclick()
      this.setState({payment: true, focusPayment: true})
    }

    commentSubmit(){
      const { commentString } = this.state
      const { id } = this.props.account
      const { token } = this.props
      createComment(commentString, id, token).then(successPost => {
        alert("Comment Submitted")
      })
    }
    paymentSubmit(){
      const { paymentAmount } = this.state
      const { id, balance } = this.props.account
      const { token } = this.props
      if (paymentAmount <= balance){
        submitPayment(paymentAmount, id, token).then(successPayment => {
          alert("Payment Submitted")
        })
      }else{
        alert("Payment Larger than Balance")
      }
    }

    handleChange(event){
      this.setState({commentString: this.commentString.value})
    }

    handlePaymentChange(event){
      this.setState({paymentAmount: this.paymentAmount.value})
    }

  render () {
    const { reply,
            replydiv,
            replytoggle,
            commentString,
            payment,
            paymentDiv,
            paymentAmount
          } = this.state
    const { account } = this.props

    return (
      <div className = {replydiv}>
        <button onClick = {this.replyclick}>
          <h3>{replytoggle}</h3>
        </button>
        { paymentDiv &&
          <button onClick = {this.paymentClick}>
            <h3>Make a Payment</h3>
          </button>
        }
        {payment == false &&
          <div className = {reply}>
            <div className = 'main'>
              <form onSubmit = {this.commentSubmit}>
                <h2>Notate Account #{account.id}</h2>
                <textarea
                  className = "commentString"
                  placeholder = "Create a Comment on Account"
                  onChange = {this.handleChange}
                  ref = {(commentString) => this.commentString = commentString}
                  value = {commentString}
                  autoFocus = "true"
                />
                <input
                  placeholder = "Submit"
                  type = "submit"
                />
              </form>
            </div>
          </div>

          ||

          <div className = {reply}>
            <div className = 'main'>
              <form onSubmit = {this.paymentSubmit}>
                <h2>Submit Payment on Account #{account.id}</h2>
                <textarea
                  className = "payment"
                  placeholder = "Enter Payment Amount"
                  onChange = {this.handlePaymentChange}
                  ref = {(paymentAmount) => this.paymentAmount = paymentAmount}
                  value = {paymentAmount}
                  autoFocus
                />
                <input
                  placeholder = "Submit Payment"
                  type = "submit"
                />
              </form>
            </div>
          </div>
        }
      </div>
    )
   }
}
