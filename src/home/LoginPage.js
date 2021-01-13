import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyle from './styles/homeStyle'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import Login from './Login'
import PersonIcon from '@material-ui/icons/Person'
class LoginPage extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <Card className={classes.card}>
                    <CardHeader
                     style={{backgroundColor:'#6610f2',color:'white'}}
                     title={'Login to your dashboard'}
                     avatar={<PersonIcon/>}
                    />
                  <CardContent>
                    <Login/>
                 </CardContent>
                </Card>
        )
    }
}

export default withStyles(homeStyle)(LoginPage)