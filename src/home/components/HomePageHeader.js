import React from 'react'
import homeStyle from '../styles/homeStyle'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button, Container,IconButton,ListItem,ListItemIcon,ListItemSecondaryAction,ListItemText,Typography } from '@material-ui/core'
import {Link} from "react-router-dom";
import slider1 from '../../assets/slider1.png'
import slider2 from '../../assets/slider2.png'
import lists from '../data/Lists'
import { CheckBox, Comment } from '@material-ui/icons';
class HomePageHeader extends React.Component{

    render(){
        const {classes} = this.props
        return (
            <Container maxWidth={'lg'} style={{dispplay:'flex',flexDirection:'column',alignItems:'space-between'}}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerContainerTwo}>
                        <Typography className={classes.title1} >Ecard is a card distribution partner of Ethio telecoms</Typography>
                        <Button
                        component={Link}
                        to={'/signup'}
                        color={'primary'}
                        variant={'contained'}
                        className={classes.signUpBtn}
                        size={'big'}>Sign up</Button>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <img className={classes.firstImage} src={slider1}/>
                    </div>
                </div>
                

                <div>
                    <div className={classes.container2}>
                        <img className={classes.firstImage} src={slider2}/>
                        <div className={classes.innerContainer}>
                            <Typography variant={'h4'} color={'primary'} style={{marginBottom:15}}>
                                Sell mobile cards to you clients
                            </Typography>
                        {
                            lists.map(list=>(
                                <ListItem key={list.id} role={undefined} dense button className={classes.lists}>
                                <ListItemIcon>
                                <CheckBox
                                    color={'primary'}
                                    edge="start"
                                    checked={true}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': 1 }}
                                />
                                </ListItemIcon>
                                <ListItemText id={1} primary={list.title}/>
                                </ListItem>
                            ))
                        }
                        </div>
                    </div>
                </div>

            </Container>
        )
    }
}

export default withStyles(homeStyle)(HomePageHeader)