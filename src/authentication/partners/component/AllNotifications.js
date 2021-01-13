import { Container, Divider, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import {connect} from 'react-redux'
import NewNotification from '../../commons/widgets/NewNotification'
import {me} from '../../state/actions/usersActions'
class AllNotifications extends React.Component{

    componentDidMount(){
        this.props.me()
    }

    findNewNotification = (data)=>{
        return data.filter(notification=>notification.status===0)
    }

    render() {
        return (
            <Container maxWidth={'lg'}>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton
                             width={'100%'}
                             height={150}
                             style={{backgroundColor:grey[500]}}
                            />
                        )
                    :
                        (
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <Typography style={{marginBottom:10}}>
                                    New Notifications
                                </Typography>
                                <Divider/>
                                <NewNotification notification={this.findNewNotification(this.props.user.relations.notification)}/>
                            </div>
                        )
                }
            </Container>
        )
    }
}

const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading
 })

export default connect(mapStateToProps,{me})(AllNotifications)