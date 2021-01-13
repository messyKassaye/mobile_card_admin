import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react'
import {showAgents} from '../state/action/agentsAction'
import {connect} from 'react-redux'
import UsersLoading from '../../commons/loading/UsersLoading'
import CardLoading from '../../commons/loading/cardLoading';
import { VerifiedUser } from '@material-ui/icons';
import {showMainDialog} from '../../commons/state/action/dialogAction'
import SendCard from './SendCard';
import RegisterNewAgent from './widgets/RegisterNewAgent';
import AddNewUser from '../../commons/AddNewUser';
class MyAgentsRetailers extends React.Component{
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        this.props.showAgents(1)
    }

    sendCard = (user)=>{
        this.props.showMainDialog({
            show:true,
            page:<SendCard form={{type:'',data:null}} user={user}/>,
            title:`Send card for ${user.first_name}`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    
    registerNewAgent =()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewUser form={{type:'',data:null}}/>,
            title:`Register new agent`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',marginBottom:50}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                <Typography color={'primary'} style={{marginBottom:10}}>
                    My agents and retailers
                </Typography>

                <Button
                onClick={()=>this.registerNewAgent()}
                color={'primary'}
                variant={'outlined'}
                size={'small'}
                style={{textTransform:'none',marginBottom:10}}>
                    Register new agent
                </Button>
                </div>
                <Divider style={{marginBottom:10}}/>
                {
                    this.props.loading
                    ?
                        (<CardLoading/>)
                    :
                        (
                           <div>
                                {
                                this.props.agents.user.length<=0
                                ?
                                    (
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <Typography color={'secondary'}>
                                            There is no registered agents until now. Start registering your agent now
                                            </Typography>

                                            <Button 
                                             onClick={()=>this.registerNewAgent()}
                                             variant={'outlined'}
                                             color={'primary'}
                                             style={{textTransform:'none',marginTop:10}}>
                                                Register new agent
                                            </Button>
                                        </div>
                                    )
                                :
                                    (
                                        <Grid container spacing={2}>
                                            {
                                                this.props.agents.user
                                                .map(agent=>(
                                                    <Grid item md={6} xs={12} sm={12}>
                                                        <Card>
                                                            <CardHeader
                                                            title={`${agent.first_name}`}
                                                            avatar={<Avatar>{agent.first_name.charAt(0)}</Avatar>}
                                                            subheader={this.props.agents.name}
                                                            
                                                            />
                                                            <CardContent style={{paddingTop:0}}>
                                                            <Divider/>
                                                            
                                                            <Typography>
                                                                {`Phone: ${agent.phone}`}
                                                            </Typography>
                                                            </CardContent>
                                                            <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                            <Button 
                                                            onClick={()=>this.sendCard(agent)}
                                                            color={'primary'}
                                                            variant={'outlined'}
                                                            style={{textTransform:'none'}}>
                                                                Send card
                                                            </Button>
                                                            </CardActions>
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
            </div>
        )
    }
}

const mapStateToProps =state=>({
    agents:state.authReducer.partnerReducer.agentsReducer.agents,
    loading:state.authReducer.partnerReducer.agentsReducer.loading
})

export default connect(mapStateToProps,{showAgents,showMainDialog})(MyAgentsRetailers)