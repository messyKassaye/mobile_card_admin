import { Button, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {indexPaymentTypes} from '../commons/state/action/paymentTypeAction'
import {storeCardRequest} from '../commons/state/action/cardRequestAction'
import {sendCard} from '../partners/state/action/cardSenderAction'
import { green } from '@material-ui/core/colors'
import { Receipt } from '@material-ui/icons'
import ReceiptWidget from './ReceiptWidget'
class PaymentTypes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formData:'',
            sending:false,
            sendDone:false
        }
    }
    

    paymentDone = (paymentType)=>{
        const {formData} = this.state
        formData['payment_type_id'] = paymentType.id
        formData['index']=''
        formData['status'] = 'Sold'
        this.setState({
            formData,
            sending:true
        })

        console.log(formData)
        this.props.sendCard(formData)


    }

    componentDidMount(){
        this.setState({formData:this.props.formData})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status||!nextProps.response.status){
            this.setState({sendDone:true})
        }
    }

    render() {
        return (
            <div style={{padding:20}}>
                {
                    this.state.sendDone
                    ?
                        (
                            <div>
                                {
                                    this.state.sendDone&&!this.props.response.status
                                    ?
                                        (
                                            <Typography color={'secondary'}>{this.props.response.message}</Typography>
                                        )
                                    :
                                        (
                                          <ReceiptWidget 
                                          user={this.props.user}
                                          cardType={this.props.cardType}
                                          cardPrice={this.props.cardPrice} 
                                          cardRequest={this.props.response.card_request}/>
                                        )
                                }
                            </div>
                        )
                    :
                        (
                            <div>
                                {
                                        this.state.sending
                                        ?
                                            (
                                                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                    <CircularProgress/>
                                                    <Typography style={{marginTop:10}}>Sending cards....</Typography>
                                                </div>
                                            )
                                        :
                                            (
                                                <div>
                                                    <Typography>
                                                        {`Select your payment type.How ${this.props.user.first_name} is going to pay you for your card price`}
                                                    </Typography>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                                    {
                                                        this.props.paymentTypes.map(paymentType=>(
                                                            <Button
                                                            onClick={()=>this.paymentDone(paymentType)}
                                                            variant={'outlined'}
                                                            color={paymentType.id===1?'secondary':'primary'}
                                                            style={{textTransform:'none'}}>
                                                                {paymentType.name}
                                                            </Button>
                                                        ))
                                                    }
                                                    </div>
                                                </div>
                                            )
                                    }
                            </div>
                        )
                }
                
            </div>
        )
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.partnerReducer.sendCardReducer.response
})

export default connect(mapStateToProps,{sendCard})(PaymentTypes)