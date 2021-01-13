 import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationIcon from '@material-ui/icons/Notifications'
 import withStyles from "@material-ui/core/styles/withStyles";
 import Badge from "@material-ui/core/Badge/Badge";
 import {connect} from "react-redux";
 import Skeleton from "@material-ui/lab/Skeleton";
 import {Link} from "react-router-dom";
 import {me} from '../state/actions/usersActions'
import { grey } from "@material-ui/core/colors";
 const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -1,
      top:2,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);
class Notifications extends React.Component{

    constructor(props) {
        super(props);

    }

    filterNewNotifications = (notifications)=>{
        return notifications.filter(notification=>{
            return notification.status===0;
        })
    }

    componentDidMount(){
        this.props.me()
    }

    render() {
        
        return (
            <div>
               {
                   this.props.loading
                   ?
                    (
                        <Skeleton
                         width={100}
                         height={20}
                         style={{backgroundColor:grey[500]}}/>
                    )
                   :
                    (
                        <IconButton
                            color='inherit'>
                            <StyledBadge badgeContent={this.props.user.relations.notification.length} color="secondary">
                                <NotificationIcon/>
                            </StyledBadge>
                        </IconButton>
                    )
               } 
            </div>
        );
    }

}

const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading
 })
export default connect(mapStateToProps,{me})(Notifications)
