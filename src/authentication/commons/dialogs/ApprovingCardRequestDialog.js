import { Button, CircularProgress, formatMs, Typography } from '@material-ui/core';
import React from 'react'
import {connect} from 'react-redux'
import OrderCard from '../OrderCard';
import {approveCardRequest} from '../state/action/cardRequestApprovalAction'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import {indexPaymentTypes} from '../../commons/state/action/paymentTypeAction'
import HorizontalLoading from '../loading/HorizontalLoading';
class ApprovingCardRequestDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            formData:{
                request_id:''
            },
            sending:false,
            sendDone:false,
            notSent:false
        }
    }
    
    componentDidMount(){
        this.props.indexPaymentTypes()

    }

    senCardRequest = (paymentTypeId)=>{
        this.setState({sending:true})
        const {formData} = this.state
        formData['request_id'] = this.props.cardRequest.id;
        formData['card_type_id']=this.props.cardRequest.card_type_id
        formData['status'] ='Sold';
        formData['payment_type_id']= paymentTypeId
        this.setState(formData)
        this.props.approveCardRequest(formData,this.props.cardRequest.id)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                sendDone:true,
                sending:false
            })
        }else{
            this.setState({
                notSent:true
            })
        }
    }

    getCards =()=>{
        this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
        setTimeout(()=>{
            this.props.showMainDialog({
                show:true,
                page:<OrderCard form={{type:'',data:null}}/>,
                title:'Order cards now',
                actions:{
                    on:false,
                    path:'',
                    id:''
                }
            })
        },1000)
    }
    render(){
        return <div>
            <div>
             {
                this.props.loading
                ?
                 
                (
                        <HorizontalLoading height={50}/>
                 )
                        :
                (
                        <div>
                             {
                                 this.state.sendDone
                                 ?
                                    (
                                        <div>
                                            <Typography color={'secondary'}>{this.props.response.message}</Typography>
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
                                                            <Typography color={'primary'}>
                                                                Sending your cards...
                                                            </Typography>
                                                        </div>
                                                    )
                                                :

                                                    (
                                                        <div>
                                                            {
                                                    this.props.cardRequest.payment===null
                                                    ?
                                                        (
                                                            <div style={{display:"flex",flexDirection:'column'}}>
                                                                <Typography color={'secondary'}>This card request is not completed it's payment. if you want to send this card request select your payment type</Typography>
                                                                <div style={{display:'flex',
                                                                flexDirection:'row',
                                                                justifyContent:"space-between",
                                                                padding:20}}>
                                                                {
                                                                    this.props.paymentTypes.map(paymentType=>(
                                                                        <Button
                                                                        onClick={()=>this.senCardRequest(paymentType.id)}
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
                                                    :
                                                        (
                                                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                                <Typography>Have you checked your bank transaction statement and did this transaction ref number is found there. if it is found click yes if not click no</Typography>
                                                           
                                                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                                                                
                                                                <Button
                                                                color={'secondary'}
                                                                variant={'outlined'}
                                                                style={{textTransform:'none',marginRight:50}}>
                                                                    No
                                                                </Button>

                                                                <Button
                                                                onClick={()=>this.senCardRequest(3)}
                                                                color={'primary'}
                                                                variant={'contained'}
                                                                style={{textTransform:'none'}}>
                                                                    Yes
                                                                </Button>
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
                        </div>
                )
             }
            </div>
        </div>
    }
}
const mapStateToProps = state=>({
    response:state.authReducer.commonReducer.cardRequestApproval.response,
    paymentTypes:state.authReducer.commonReducer.paymentTypesReducer.paymentTypes,
    loading:state.authReducer.commonReducer.paymentTypesReducer.loading
})

export default connect(mapStateToProps,{approveCardRequest,showMainDialog,indexPaymentTypes})
(ApprovingCardRequestDialog)