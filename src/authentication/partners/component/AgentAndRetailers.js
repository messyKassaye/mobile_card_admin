import { Avatar, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React from 'react'
import {connect} from 'react-redux'
import UserLoading from '../../commons/loading/UsersLoading'
import {showAgents,updateAgent} from '../state/action/agentsAction'

class AgentAndRetailers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            update:false,
            userId:0
        }
    }
    

    componentDidMount(){
        this.props.showAgents()
    }

    updateStatus = (id)=>{
        let formData = {
            status:1
        }
        this.props.updateAgent(formData,id)
        this.setState({
            update:true,
            userId:id
        })
    }

    render(){

        return <Container maxWidth={'lg'}>
                {
                    this.props.loading
                    ?
                        (
                            <UserLoading/>
                        )
                    :
                        (
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12}>
                                    <Typography color={'primary'} variant={'h4'}>
                                        Our agents
                                    </Typography>
                                </Grid>
                                {
                                    this.props.agents.user
                                    .map(agent=>(
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card>
                                                <CardHeader
                                                avatar={
                                                    <Avatar>
                                                        {agent.first_name.charAt(0)}
                                                    </Avatar>
                                                }
                                                 title={
                                                     `${agent.first_name}`
                                                 }
                                                 subheader={
                                                     agent.phone
                                                 }
                                                 action={
                                                     agent.status===0
                                                     ?
                                                        (
                                                            <div>
                                                                {
                                                                    this.state.update&&this.state.userId===agent.id
                                                                    ?
                                                                        (
                                                                            <Typography style={{color:green[500]}}>
                                                                                Updating...
                                                                            </Typography>
                                                                        )
                                                                    :
                                                                        (
                                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                                                    <Typography color={'secondary'}>
                                                                                        Not accepted
                                                                                    </Typography>
                                                                                    <Button
                                                                                    onClick={()=>this.updateStatus(agent.id)}
                                                                                    size={"small"}
                                                                                    color={'secondary'}
                                                                                    variant={'contained'}
                                                                                    style={{textTransform:'none',marginLeft:15}}
                                                                                    >
                                                                                        Accept
                                                                                    </Button>

                                                                            </div>
                                                                        )
                                                                }
                                                            </div>
                                                        )
                                                     :
                                                        (
                                                            <div>
                                                                <Typography 

                                                                    color={'primary'}>
                                                                    Accepted
                                                                </Typography>
                                                            </div>
                                                        )
                                                 }
                                                 />
                                                 <Divider/>
                                                <CardContent>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                }
        </Container>
    }
}

const mapStateToProps =state=>({
    agents:state.authReducer.partnerReducer.agentsReducer.agents,
    loading:state.authReducer.partnerReducer.agentsReducer.loading
})

export default connect(mapStateToProps,{showAgents,updateAgent})(AgentAndRetailers)