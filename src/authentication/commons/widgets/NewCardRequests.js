import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import SendIcon from '@material-ui/icons/Send'
import {showCardRequest,updateCardRequest} from '../state/action/cardRequestAction'
import {connect} from 'react-redux'
import UserLoading from '../loading/UsersLoading'
import {calculateCardPayment} from '../services/calculator'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import CardPriceSetter from '../dialogs/CardPriceSetter'
import { red } from '@material-ui/core/colors'
import ApprovingCardRequestDialog from '../dialogs/ApprovingCardRequestDialog'
import {indexCardPrice} from '../state/action/cardPriceAction'
class NewCardRequests extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            user:[],
            sendedCardRequest:[],
            formData:{
                status:''
            },
            update:'',
            updateDone:false,
            updateId:'',
            spam:"Report as spam",
            sendFormData:{
                request_id:""
            }
        }
    }
    

    componentDidMount(){
        this.props.showCardRequest('on_progress')
        this.props.indexCardPrice();
    }

    setPrice = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<CardPriceSetter form={{type:'',data:null}}/>,
            title:'Set your card prices',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    updateCardRequests = (id,status)=>{
        const {formData} = this.state
        formData['status']= status
        this.setState({
            formData,
            update:status,
            updateId:id
        })
        this.props.updateCardRequest(id,formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.updateResponse.status){
            this.setState({
                updateDone:true,
            })
        }
    }

    send = (request)=>{
        this.props.showMainDialog({
            show:true,
            page:<ApprovingCardRequestDialog form={{type:'',data:null}} cardRequest={request}/>,
            title:'Sending on proccess....',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render(){
        return <Paper elevation style={{backgroundColor:'transparent'}}>
            <CardHeader
            title='New Card Request'
            avatar={<SendIcon/>}
            />
            <Divider/>
            <CardContent>
                {
                    this.props.loading&&this.props.cardPriceLoading
                    ?
                        (<UserLoading/>)
                    :
                        (
                            <Grid container spacing={2}>
                                {
                                    this.props.card_request.map(requests=>(
                                        <Grid item md={12} xs={12} sm={12} key={requests.id}>
                                            <Card>
                                                <CardHeader
                                                avatar={<Avatar>{requests.user[0].first_name.charAt(0)}</Avatar>}
                                                title={`${requests.user[0].first_name}`}
                                                subheader={requests.user[0].role[0].name}
                                                action={
                                                    <Typography variant={'h5'} color={'primary'}>
                                                        {`${requests.card_type.value} Birr card`}
                                                    </Typography>
                                                }/>
                                               
                                                <CardContent>
                                                    <Typography>
                                                        {`Card : ${requests.card_type.value} Birr card`}
                                                    </Typography>
                                                    <Typography>
                                                        {`Amount : ${requests.amount.toLocaleString()}`}
                                                    </Typography>

                                                    {
                                                            this.props.cardPrice.length<=0
                                                            ?
                                                                 (
                                                                     <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                                                                         <Typography>Total payment : 
                                                                            
                                                                         </Typography>
                                                                         <Typography color={'primary'}>Set your price to calculate your total payment.
                                                                            
                                                                         </Typography>
                                                                         <Button
                                                                            onClick={()=>this.setPrice()}
                                                                            variant={'outlined'}
                                                                            size={'small'}
                                                                            color={'primary'}
                                                                            style={{textTransform:'none',marginLeft:10}}>
                                                                             Set price
                                                                        </Button>
                                                                     </div>
                                                                 
                                                                   )
                                                            :
                                                                (
                                                                    <div style={{display:'flex',flexDirection:'column'}}>
                                                                        <Typography>
                                                                        {`Unit price: ${requests.card_type.value*this.props.cardPrice[0].percentage_value} ETB`}
                                                                         </Typography>
                                                                        <Typography>
                                                                        {`Total payment: ${calculateCardPayment(requests.card_type.value,requests.amount,this.props.cardPrice[0].percentage_value).toLocaleString()} ETB`}
                                                                         </Typography>
                                                                    </div>
                                                                )
                                                        }
                                
                                                    {
                                                        requests.payment!==null
                                                        ?
                                                            (
                                                                <div>
                                                                    <Typography>
                                                                {`Transaction bank : ${requests.payment.bank.name}`}
                                                                </Typography>
                                                                <Typography>
                                                                    {`Transaction ref number: ${requests.payment.transaction_ref_number}`}
                                                                </Typography>
                                                                </div>
                                                            )
                                                        :
                                                            (
                                                            <Typography>Payment: <span style={{color:red[500]}}>Not payed</span></Typography>
                                                            )
                                                    }
                                                    <Divider style={{marginTop:10}}/>
                                                </CardContent>
                                                {
                                                        this.state.updateDone&&this.state.update=='spam'&&this.state.updateId===requests.id
                                                        ?
                                                            (
                                                                <CardActions style={{display:"flex",flexDirection:'row',justifyContent:"center"}}>
                                                                    <Typography color={'primary'}>
                                                                        Your report is submitted successfully
                                                                    </Typography>
                                                                </CardActions>
                                                            )
                                                        :
                                                            (
                                                                <CardActions style={{display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                                    <Button
                                                    onClick={()=>this.send(requests)}
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    size={'medium'}
                                                    style={{textTransform:'none'}}
                                                    >
                                                        Send
                                                    </Button>

                                                    <Button
                                                    variant={'outlined'}
                                                    color={'secondary'}
                                                    size={'medium'}
                                                    style={{textTransform:'none'}}
                                                    >
                                                        Remove
                                                    </Button>

                                                    <Button
                                                    onClick={()=>this.updateCardRequests(requests.id,'spam')}
                                                    variant={'outlined'}
                                                    color={'secondary'}
                                                    size={'medium'}
                                                    style={{textTransform:'none'}}
                                                    >
                                                        {
                                                            this.state.update==='spam'&&this.state.updateId===requests.id
                                                            ?
                                                                (<span>Reporting...</span>)
                                                            :
                                                                (
                                                                <span>{this.state.spam}</span>
                                                                )
                                                        }
                                                    </Button>
                                                    
                                                </CardActions>
                                                            )
                                                    }
                                            
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                }
            </CardContent>
        </Paper>
    }
}

const mapSateToProps = state=>({
    card_request:state.authReducer.commonReducer.cardRequestReducer.card_request,
    loading:state.authReducer.commonReducer.cardRequestReducer.loading,
    updateResponse:state.authReducer.commonReducer.cardRequestReducer.updateResponse,
    cardPrice:state.authReducer.commonReducer.cardPriceReducer.cardPrice,
    cardPriceLoading:state.authReducer.commonReducer.cardPriceReducer.loading
})

export default connect(mapSateToProps,{indexCardPrice,showCardRequest,updateCardRequest,showMainDialog})
(NewCardRequests)