import React,{Component} from 'react'
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerProfile from "../commons/DrawerProfile";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo_2 from "../../assets/logo_2.png";
import Typography from "@material-ui/core/Typography";
import Notifications from "../commons/Notifications";
import Profile from "../commons/Profile";
import Hidden from "@material-ui/core/Hidden";
import {Fab, SwipeableDrawer} from "@material-ui/core";
import theme from "../../themes/app_theme";
import withStyles from "@material-ui/core/styles/withStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import districtManagerMenu from './data/districtManagerMenu'
import authStyle from '../styles/auth_style'
import PartnersDrawerMenu from './component/PartnersDrawerMenu';
import PartnersNestedRoute from './PartnersNestedRoute';
import {me} from '../state/actions/usersActions'
import {connect} from 'react-redux'
import orange from '@material-ui/core/colors/orange'
import LogoComponent from '../commons/LogoComponent'
import NavigationIcon from '@material-ui/icons/Navigation';
import {showMainDialog} from '../commons/state/action/dialogAction'
import OrderCard from '../commons/OrderCard'
import FinanceWidget from '../commons/FinanceWidget';
import PartnersOrderCard from '../commons/widgets/PartnersOrderCard';
class PartnersDashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
            currentPage:'Dashboard'
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)

    }

    componentDidMount(){
        this.props.me()
    }

    buyCard = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<PartnersOrderCard form={{type:'',data:null}}/>,
            title:'Order cards now',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    handleDrawerToggle = (value,page) => event=>{
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            mobileOpen: value,
            currentPage:page
        })
    }

    render(){
        const {container} = this.props;
        const {classes} = this.props;
        const {t} = this.props
        const drawer = (
            <div className={classes.drawerRoot}>
                <AppBar style={{position: "relative", backgroundColor: '#1E221E'}}>
                    <Toolbar style={{padding: 5}}>
                        <DrawerProfile/>
                    </Toolbar>
                </AppBar>
                {
                    this.props.loading
                        ?
                        (<Skeleton variant='rect'
                                   style={{marginLeft:20,marginTop:20,backgroundColor:'white',borderRadius:5}} width={100} height={15}/>)
                        :
                        (

                            <Typography style={{paddingLeft:20,paddingTop:20,color:grey[500]}}>
                                {this.props.user.relations.role[0].name}
                            </Typography>
                        )
                }
                <PartnersDrawerMenu menu={districtManagerMenu}/>
                <Divider/>
            </div>
        )
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar} color='primary'>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle(true)}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component={Link} to={'/auth'} style={{cursor:'pointer',textDecoration:'none'}}>
                            <LogoComponent variant={'h5'} margin={15} firstColor={'white'} secondColor={orange[500]}/>
                        </Typography><div className={classes.grow}/>
                        <FinanceWidget/>
                        <IconButton
                        color={'inherit'}
                        component={Link} to={'/auth/partners/notifications'}
                        >
                        <Notifications/>
                        </IconButton>
                        <Profile/>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <SwipeableDrawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}

                            onOpen={this.handleDrawerToggle(true,this.state.currentPage)}
                            onClose={this.handleDrawerToggle(false,this.state.currentPage)}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <SwipeableDrawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open={this.state.mobileOpen}
                            onOpen={this.handleDrawerToggle(true,this.state.currentPage)}
                            onClose={this.handleDrawerToggle(false,this.state.currentPage)}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <PartnersNestedRoute/>
                    <Fab
                     onClick={()=>this.buyCard()}
                     variant={'extended'} 
                     className={classes.fab} 
                     color={"primary"}>
                         <NavigationIcon/>
                         Get cards
                        </Fab>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
})

export default connect(mapStateToProps,{me,showMainDialog})(withStyles(authStyle)(PartnersDashboard));