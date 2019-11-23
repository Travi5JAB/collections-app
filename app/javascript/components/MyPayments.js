import React from "react"
import PropTypes from "prop-types"

///fetch
import { myPaymentsFetch } from './API/api'

class MyPayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
    };
  }

  componentDidMount(){
    this.dataFetch()
  }

  dataFetch(){
    const { id } = this.props.match.params
    myPaymentsFetch(id).then(APIpayments => {
      this.setState({
        payments: APIpayments
       });
    })
  }



  render () {
    const { payments } = this.state
    const myPayments = payments.map((payment,index) =>{
      return (
        <div className = "payment">
          {payment.payment_amount}
        </div>
      )
    })

    return (
      <div className = "MyPayments">
        {myPayments}
      </div>
    );
  }
}

export default MyPayments
