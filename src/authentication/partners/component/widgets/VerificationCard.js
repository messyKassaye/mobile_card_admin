import { Avatar, Button, Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import React from 'react'
import {connect} from 'react-redux'
import { PARTNER_API_URL } from '../../../../constants/constants';
import {verifyUser} from '../../../commons/state/action/verificationAction'
import {updateFollows} from '../../../commons/state/action/followAction'
import { Link } from 'react-router-dom';

class VerificationCard extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            updating:false,
            updatingId:'',
            update:'Cancel',
            formData:{
                status:''
            },
            verifiyFormData:{
                user_id:''
            },
            verify:false,
            verifying:false,
            verified:false
        }
    }
    
    updateFollow = (id,status)=>{
        const {formData} = this.state
        formData['status'] =status
        this.setState({
            updating:true,
            updatingId:id,
            formData
        })
        this.props.updateFollows(id,formData)
    }

    verify = ()=>{
        this.setState({verify:true})
    }

    verifyUserNow = (user)=>{
        const {verifiyFormData} = this.state
        verifiyFormData['user_id'] = user[0].id
        this.setState({verifying:true,verifiyFormData})

        this.props.verifyUser(PARTNER_API_URL,verifiyFormData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                verified:true,
            })
        }else{
            this.setState({
                verified:false,
            })
        }
    }

    render() {
        const follow = this.props.follows
        return <Card>
        <CardHeader
        action={
        <Button
            component={Link}
            to={`/auth/partners/profile/${follow.user[0].id}`}
            variant={'outlined'}
            color={'primary'}
            size={'small'}
            style={{textTransform:'none'}}>
                See profile
        </Button>}
        subheader={follow.user[0].role[0].name}
        avatar={
            follow.user[0].avator==='letter'
            ?
             <Avatar>{follow.user[0].first_name.charAt(0)}</Avatar>
            :
              <Avatar src={follow.user[0].avator}></Avatar>
        }
        title={`${follow.user[0].first_name}`}/>
        <CardContent style={{padding:5,display:'flex',flexDirection:'column'}}>
            <Divider/>
            {
                follow.user[0].verification!==null
                ?
                    (
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',padding:15}}>
                            <Typography style={{color:grey[600]}}>Verified by your company</Typography>
                        </div>
                    )
                :
                    (
                        <div>
                            {
                                this.state.verify
                                ?
                                    (
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            {
                                                this.state.verifying
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                            {
                                                                this.state.verified||!this.state.verification
                                                                ?
                                                                    (
                                                                    <Typography color={'primary'} variant={'h5'}>
                                                                        {this.props.response.message}
                                                                    </Typography>            
                                                                    )
                                                                :
                                                                    (
                                                                        <Typography color={'secondary'} variant={'h5'}>
                                                                            Verifying...
                                                                        </Typography>
                                                                    )
                                                            }
                                                        </div>
                                                    )
                                                :
                                                    (
                                                        <div style={{display:'flex',flexDirection:'column'}}>
                                                            <Typography color={'secondary'}>
                                                                Do you really know this agent?. verifying Some one will be responsible for some security
                                                                reason like accepting money and not sending cards. When this happend you will be responsible
                                                            </Typography>
                                                            <Button
                                                            onClick={()=>this.verifyUserNow(follow.user)}
                                                            variant={'outlined'}
                                                            color={'primary'}
                                                            style={{textTransform:'none'}}
                                                            size={'small'}>
                                                                Yes i know this agent
                                                            </Button>
                                                        </div>
                                                    )
                
                                            }
                                        </div>
                                    )
                                :
                                    (
                                        <div style={{marginTop:10,display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                            <Button
                                            variant={'outlined'}
                                            color={'primary'}
                                            style={{textTransform:'none',marginRight:15}}
                                            onClick={()=>this.verify()}>
                                                Verify this user
                                            </Button>
                                            <Button
                                            onClick={()=>this.updateFollow(follow.id,3)}
                                            variant={'contained'}
                                            color={'secondary'}
                                            style={{textTransform:'none',marginRight:15}}>
                                                {
                                                    this.state.updating&&this.state.updatingId===follow.id
                                                    ?
                                                        (<span>Canceling...</span>)
                                                    :
                                                        (
                                                        <span>{this.state.update}</span>
                                                        )
                                                }
                                            </Button>
                                        </div>
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
    response:state.authReducer.commonReducer.verificationReducer.response
})
export default connect(mapStateToProps,{verifyUser,updateFollows})(VerificationCard)