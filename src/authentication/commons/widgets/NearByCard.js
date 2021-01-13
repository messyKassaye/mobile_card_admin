import { Avatar, Button, Card, CardActions, CardHeader, CircularProgress, IconButton, Typography } from '@material-ui/core';
import { VerifiedUser } from '@material-ui/icons';
import React from 'react'
import  {sendRequest} from '../../partners/state/action/partnerAgentAction'
import {connect}from 'react-redux'
class NearByCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                partner_id:''
            },
            sending:false,
            sendDone:false,
            userId:0
        }
        
    }

    sendFriendRequest = (id)=>{
        const {formData} = this.state
        formData['partner_id']=id
        this.setState({
            formData,
            sending:true,
            userId:id
        })
        this.props.sendRequest(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                sendDone:true,
                sending:false
            })
        }
    }

    render() {
        const nearby = this.props.nearby
        return (
            <Card>
                <CardHeader
                    avatar={<Avatar>{nearby.user[0].first_name.charAt(0)}</Avatar>}
                    subheader={
                        `${nearby.region_name} > ${nearby.city_name} > ${nearby.user[0].role[0].name}`
                    }
                    action={
                    nearby.user[0].verification!==null
                    ?
                            (
                                <IconButton color={'primary'}>
                                    <VerifiedUser/>
                                </IconButton>
                            )
                    :
                            (null)
                    }
                    title={`${nearby.user[0].first_name}`}/>

                    <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            {
                                this.state.sending
                                ?
                                    (
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <CircularProgress/>
                                            <Typography color={'primary'}>Sending...</Typography>
                                        </div>
                                    )
                                :
                                    (
                                        <div>
                                            {
                                                this.state.sendDone&&this.state.userId===nearby.user[0].id
                                                ?
                                                    (<Typography color={'primary'}>Friend request send successfully</Typography>)
                                                :
                                                    (
                                                        <Button
                                                        onClick={()=>this.sendFriendRequest(nearby.user[0].id)}
                                                        variant={'outlined'}
                                                        color={'primary'}
                                                        style={{textTransform:'none'}}
                                                        >
                                                            Send friend request
                                                        </Button>
                                                    )
                                            }
                                        </div>
                                        
                                    )
                            }
                    </CardActions>                        
            </Card>                                    
        )
    }
    
}

const mapStateToProps = state=>({
    response:state.authReducer.partnerReducer.sendFriendRequestReducer.response
})

export default connect(mapStateToProps,{sendRequest})(NearByCard)