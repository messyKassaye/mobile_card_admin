import { Avatar, Card, CardContent, CardHeader, Chip, Container, Divider, Grid } from '@material-ui/core'
import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import {connect} from 'react-redux'
import {indexSellBuy} from '../state/action/sellAndBuyAction'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey } from '@material-ui/core/colors'
import CreditSell from './widgets/CreditSell'
import CashAndBankTransaction from './widgets/CashAndBankTransaction'
class SellAndBuy extends React.Component{

    constructor(props) {
        super(props);
        
    }
    

    componentDidMount(){
        this.props.indexSellBuy()
    }

    filterSellData = (data,id)=>{
        return data.filter(data=>data.payment_type[0].id===id);
    }
    filterCashData = (data,id)=>{
        return data.filter(data=>data.payment_type[0].id!==id);
    }
    render(){
        return <Container maxWidth={'lg'}>
            <Card>
                <CardHeader
                title={'Your sell and buy data'}
                avatar={<Avatar><AttachMoneyIcon/></Avatar>}
                />
                <CardContent style={{display:"flex",flexDirection:'column',alignItems:'flex-start'}}>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <Skeleton
                                variant={'rect'}
                                width={250}
                                height={20}
                                style={{backgroundColor:grey[500],marginBottom:20}}/>

                                <Skeleton
                                variant={'rect'}
                                width={'100%'}
                                height={100}
                                style={{backgroundColor:grey[500]}}/>
                            </div>
                        )
                    :
                        (
                                     <Grid container spacing={2}>

                                        <Grid item md={12} xs={12} sm={12}>
                                            <CreditSell sells={this.filterSellData(this.props.sellBuy,1)}/>
                                        </Grid>

                                        <Grid item md={12} xs={12} sm={12}>
                                            <CashAndBankTransaction sells={this.filterCashData(this.props.sellBuy,1)}/>
                                        </Grid>
                                    </Grid>
                        )
                }
                </CardContent>
            </Card>
        </Container>
    }
}

const mapStateToProps = state=>({
    sellBuy:state.authReducer.partnerReducer.sellBuyReducer.sellBuy,
    loading:state.authReducer.partnerReducer.sellBuyReducer.loading
})

export default connect(mapStateToProps,{indexSellBuy})(SellAndBuy)