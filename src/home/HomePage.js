import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyles from './styles/homeStyle'
import HomeAppBar from './HomeAppBar'
import FooterPage from './FooterPage'
import LoginPage from './LoginPage'

class HomePage extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <HomeAppBar/>
                <div className={classes.container}>
                    <LoginPage/>
                </div>
                <FooterPage/>
            </div>
        )
    }
}

export default withStyles(homeStyles)(HomePage)