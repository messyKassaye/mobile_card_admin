import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {showFollows,updateFollows} from '../../commons/state/action/followAction'
import CardLoading from '../loading/cardLoading'
class UnAcceptedAgentAndRetailers extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            updating:false,
            updatingId:'',
            removing:false,
            removingId:'',
            remove:'Remove',
            update:'Accept',
            formData:{
                status:''
            }
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

    remove = (id,status)=>{
        const {formData} = this.state
        formData['status'] =status
        this.setState({
            removing:true,
            removingId:id,
            formData
        })
        this.props.updateFollows(id,formData)
    }
    
    componentDidMount(){
        this.props.showFollows(0)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                updating:false,
                update:'Update done'
            })
            setTimeout(()=>{
                window.location.reload()
            },2000)

        }
    }
    render(){
        return <Card style={{backgroundColor:'transparent'}} elevation={0}>
                <CardHeader
                title={'Waiting acceptance agents and retailers'}
                avatar={<Person/>}/>
                
                <CardContent style={{paddingTop:0}}>
                     <Divider style={{marginBottom:10}}/>
                        {
                            this.props.loading
                            ?
                                <CardLoading/>
                            :
                                (
                                    <div>
                                        {
                                            this.props.follows.length<=0
                                            ?
                                                <Typography color={'secondary'}>
                                                    There is no any agent or retailers sent following request  to you.
                                                </Typography>
                                            :
                                                (
                                                    <Grid container spacing={2}>
                                                        {
                                            this.props.follows
                                            .map(follow=>(
                                                <Grid key={follow.id} item md={4} xs={12} sm={12}>
                                                    <Card>
                                                        <CardHeader
                                                        action={
                                                        <Button
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
                                                           <div style={{marginTop:10,display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                           <Button
                                                           onClick={()=>this.remove(follow.id,3)}
                                                            variant={'outlined'}
                                                            color={'secondary'}
                                                            style={{textTransform:'none',marginRight:25}}>
                                                                {
                                                                this.state.removing&&this.state.removingId===follow.id
                                                                    ?
                                                                        (<span>Removing...</span>)
                                                                    :
                                                                        (
                                                                        <span>Remove</span>
                                                                        )
                                                                }
                                                            </Button>

                                                            <Button
                                                            onClick={()=>this.updateFollow(follow.id,1)}
                                                            variant={'contained'}
                                                            color={'primary'}
                                                            style={{textTransform:'none',marginRight:15}}>
                                                                {
                                                                    this.state.updating&&this.state.updatingId===follow.id
                                                                    ?
                                                                        (<span>Updating...</span>)
                                                                    :
                                                                        (
                                                                        <span>{this.state.update}</span>
                                                                        )
                                                                }
                                                            </Button>
                                                           </div>
                                                        </CardContent>
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
    follows:state.authReducer.commonReducer.followReducer.follows,
    loading:state.authReducer.commonReducer.followReducer.loading,
    response:state.authReducer.commonReducer.followReducer.response
})

export default connect(mapStateToProps,{showFollows,updateFollows})(UnAcceptedAgentAndRetailers)