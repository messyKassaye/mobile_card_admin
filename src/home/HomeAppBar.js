import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import React from 'react'
import {Link} from "react-router-dom";
import LogoComponent from '../authentication/commons/LogoComponent'
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyles from './styles/homeStyle'
import LanguageSetter from './LanguageSetter';

class HomeAppBar extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <AppBar className={classes.appBar} elevation={0} position={'fixed'}>
                    <Toolbar className={classes.toolBar}>
                    <Typography component={Link} to={'/'} style={{cursor:'pointer',textDecoration:'none'}}>
                        <LogoComponent variant={'h5'} margin={15} firstColor={'#6610f2'} secondColor={orange[500]}/>
                    </Typography>
                    </Toolbar>
                    
            </AppBar>
        )
    }
}

export default withStyles(homeStyles)(HomeAppBar)