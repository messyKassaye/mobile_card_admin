import { Avatar, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { SimCard } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import CardLoading from '../../commons/loading/cardLoading'
import {indexCards} from '../state/action/cardsAction'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import OrderCard from '../../commons/OrderCard'
class MyCardAndOrders extends React.Component{

    componentDidMount(){
        this.props.indexCards()
    }

    getCards = ()=>{
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
    }
    render(){
        return <Container maxWidth={'lg'}>
            <Card>
                <CardHeader
                style={{backgroundColor:'#3C4252',color:'white'}}
                onClick={this.getCards}
                 title={'My cards'}
                 avatar={<SimCard/>}
                 action={<Button
                 variant={'text'}
                 color={'inherit'}
                 style={{textTransform:'none'}}>
                     Get cards
                 </Button>}
                />
                <Divider/>
                <CardContent>
                    {
                        this.props.loading
                        ?
                            (<CardLoading/>)
                        :
                            (
                                <Grid container spacing={2}>
                                    {
                                        this.props.cards.map(card=>(
                                            <Grid item md={4} xs={12} sm={12}>
                                                <Card>
                                                    <CardHeader
                                                     title={`${card.value} Birr card`}
                                                     avatar={<Avatar>{card.value}</Avatar>}
                                                     action={<Button
                                                      variant={'outlined'}
                                                      size={'small'}
                                                      color={'primary'}
                                                      style={{textTransform:'none'}}
                                                     >Sell
                                                     </Button>}
                                                    />
                                                    <CardContent style={{paddingTop:0,display:'flex',flexDirection:'column'}}>
                                                        <Divider/>
                                                        <Typography color={'primary'} variant={'h4'} style={{textAlign:'center',margin:10}}>
                                                            {`${card.total_amount} Cards`}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            )
                    }
                </CardContent>
            </Card>
        </Container>
    }
}

const mapStateToProps = state=>({
    cards:state.authReducer.partnerReducer.cardReducer.cards,
    loading:state.authReducer.partnerReducer.cardReducer.loading
})

export default connect(mapStateToProps,{indexCards,showMainDialog})(MyCardAndOrders)