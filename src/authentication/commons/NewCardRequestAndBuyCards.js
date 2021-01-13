import { Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Pusher from 'pusher-js'
import {showCardRequest} from '../commons/state/action/cardRequestAction'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey } from '@material-ui/core/colors'
import {Link} from 'react-router-dom'
class NewCardRequestAndBuyCards extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentDidMount(){
        this.props.showCardRequest('on_progress')
    }

    render(){
         return   <Card>
             <CardContent>
             <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                    {
                        this.props.loading
                        ?
                            (
                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <Skeleton
                                     variant={'rect'}
                                     width={'50%'}
                                     style={{backgroundColor:grey[500],marginRight:10,marginTop:10}}
                                     height={20}
                                    />
                                    <Skeleton
                                     variant={'circle'}
                                     width={40}
                                     style={{backgroundColor:grey[500],marginRight:10}}
                                     height={40}
                                    />

                                    <Skeleton
                                     variant={'rect'}
                                     width={50}
                                     style={{backgroundColor:grey[500]}}
                                     height={40}
                                    />
                                </div>
                            )
                        :
                            (

                                <div style={{display:'flex',flexDirection:'row',
                                marginTop:5,
                                justifyContent:'center',
                                alignItems:'center'}}>
                                    <Typography color={'primary'}>
                                    Card requests sent to you
                                    </Typography>
                                    <Chip size="small" label={`${this.props.card_request.length}`} color={'secondary'} style={{marginLeft:10,marginRight:10}} />
                                {
                                    this.props.card_request.length>0
                                    ?
                                        (
                                            <Button
                                            component={Link}
                                            to={'/auth/commons/card_request_checkout'}
                                            variant={'outlined'}
                                            color={'secondary'}
                                            style={{textTransform:'none'}}>
                                                Check out
                                            </Button>
                                        )
                                    :
                                        (null)
                                }
                            </div>
                            )
                    }
                </Grid>
            </Grid>
             </CardContent>
         </Card>
    }
}

const mapSateToProps = state=>({
    card_request:state.authReducer.commonReducer.cardRequestReducer.card_request,
    loading:state.authReducer.commonReducer.cardRequestReducer.loading,
})

export default connect(mapSateToProps,{showCardRequest})(NewCardRequestAndBuyCards)