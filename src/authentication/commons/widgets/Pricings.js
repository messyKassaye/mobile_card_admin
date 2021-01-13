import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import {indexCardPrice} from '../state/action/cardPriceAction'
import {connect} from 'react-redux'
import HorizontalLoading from '../loading/HorizontalLoading'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import CardPriceSetter from '../dialogs/CardPriceSetter'
import EditIcon from '@material-ui/icons/Edit'
import CardPriceEditor from './CardPriceEditor'
class Pricings extends React.Component{

    componentDidMount(){
        this.props.indexCardPrice()
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

    editPrice = (cardPrice)=>{
        this.props.showMainDialog({
            show:true,
            page:<CardPriceSetter form={{type:'edit',data:cardPrice}} cardPrice={cardPrice}/>,
            title:`Edit your gaining percentage`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render(){
        return <Card>
        <CardContent>
            <CardHeader
            title={'Cards and their prices'}
            avatar={<AttachMoneyIcon/>}
            />
            <Divider style={{marginBottom:10}}/>
            {
                this.props.loading
                ?
                    (
                        <HorizontalLoading height={30}/>
                    )
                :
                    (
                        <div>
                            {
                                this.props.cardPrice.length<=0
                                ?
                                    (
                                        <Grid container spacing={2}>
                                            <Grid item md={12} xs={12} sm={12}>
                                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:10}}>
                                                <Typography color={'primary'}>You haven't set your card prices. Set your price now</Typography>
                                                <Button
                                                onClick={()=>this.setPrice()}
                                                variant={'outlined'}
                                                color={"primary"}
                                                size={'small'}
                                                style={{textTransform:'none'}}
                                                >
                                                    Set price 
                                                </Button>
                                            </div>
                                        </Grid>
                                        </Grid>
                                    )
                                :
                                        (
                                           <Grid container spacing={2}>
                                               {
                                                   this.props.cardPrice.map(price=>(
                                                    <Grid key={price.id} item md={12} xs={12} sm={12}>
                                                        <Card elevation={0}>
                                                            <CardHeader
                                                            title={
                                                                <Typography color={'primary'} variant={'h4'}>
                                                                    {`${price.percentage} %`}
                                                                </Typography>
                                                            }
                                                            action={
                                                                <IconButton
                                                                onClick={()=>this.editPrice(price)}
                                                                 color={'primary'}>
                                                                     <EditIcon/>
                                                                </IconButton>
                                                            }
                                                            />
                                                        </Card>
                                                    </Grid>
                                                   ))
                                               }
                                           </Grid>
                                        )
                            }
                        </div>
                    )
            }
        </CardContent>
     </Card>
    }
}

const mapStateToProps = state=>({
    cardPrice:state.authReducer.commonReducer.cardPriceReducer.cardPrice,
    loading:state.authReducer.commonReducer.cardPriceReducer.loading
})

export default connect(mapStateToProps,{indexCardPrice,showMainDialog})(Pricings)