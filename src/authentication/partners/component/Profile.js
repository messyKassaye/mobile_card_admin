import { Avatar, Card, CardContent, CardHeader, Container, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import {showUsers} from '../../state/actions/usersActions'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey } from '@material-ui/core/colors'
import profileStyle from '../../styles/profileStyle'
import withStyles from '@material-ui/core/styles/withStyles'
import UsersSmallDevice from './UsersSmallDevice'
 class Profile extends Component {

    componentDidMount(){
        let id = this.props.match.params.id
        this.props.showUsers(id)
    }
    render() {
        const classes = this.props
        return (
            <Container maxWidth={'lg'}>
                {
                    this.props.loading
                    ?
                        (
                            <Grid container spacing={2}>
                                <Grid item md={3} xs={12} sm={12}>
                                    <Skeleton
                                     width={'100%'}
                                     height={200}
                                     style={{backgroundColor:grey[500]}}
                                    />
                                </Grid>

                                <Grid item md={9} xs={12} sm={12}>
                                    <Skeleton
                                     width={'100%'}
                                     height={250}
                                     style={{backgroundColor:grey[500]}}
                                    />
                                </Grid>
                            </Grid>
                        )
                    :
                        (
                            <Grid container spacing={2}>

                                <Grid item md={3} xs={12} sm={12}>
                                    <Card>
                                        <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <Avatar style={{width:50,height:50,marginBottom:20}}>
                                                {this.props.user.first_name.charAt(0)}
                                            </Avatar>
                                            <Typography variant={'h5'}>
                                                {this.props.user.first_name}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                </Grid>

                                <Grid item md={9} xs={12} sm={12}>
                                   <UsersSmallDevice user={this.props.user}/>
                                </Grid>
                            </Grid>
                        )

                }
            </Container>
        )
    }
}

const mapStateToProps = state=>({
    user: state.userData.showUser,
    loading:state.userData.showLoading
 })

export default connect(mapStateToProps,{showUsers})(withStyles(profileStyle)(Profile))
