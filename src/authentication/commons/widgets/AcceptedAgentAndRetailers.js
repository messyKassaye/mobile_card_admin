import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {showAcceptedFollows,updateFollows} from '../../commons/state/action/followAction'
import VerificationCard from '../../partners/component/widgets/VerificationCard'
import CardLoading from '../loading/cardLoading'
class AcceptedAgentAndRetailers extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            updating:false,
            updatingId:'',
            update:'Cancel',
            formData:{
                status:''
            }
        }
    }
    
    componentDidMount(){
        this.props.showAcceptedFollows(1)
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
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                updating:false,
                update:'Canceled'
            })
            setTimeout(()=>{
                window.location.reload()
            },2000)

        }
    }
    render(){
        return <Card style={{backgroundColor:'transparent'}} elevation={0}>
            <CardHeader
            title={'Your agents and retailers'}
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
                                                (
                                                    <Typography color={'secondary'}>
                                                            No one is following you until now ): Find agents and retailers
                                                    </Typography>
                                                )
                                            :
                                                (
                                                    <Grid container spacing={2}>
                                                        {
                                            this.props.follows
                                            .map(follow=>(
                                                <Grid key={follow.id} item md={4} xs={12} sm={12}>
                                                    <VerificationCard follows={follow}/>
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
    follows:state.authReducer.commonReducer.followReducer.acceptedFollows,
    loading:state.authReducer.commonReducer.followReducer.acceptedLoading,
    response:state.authReducer.commonReducer.followReducer.response
})

export default connect(mapStateToProps,{showAcceptedFollows,updateFollows})(AcceptedAgentAndRetailers)