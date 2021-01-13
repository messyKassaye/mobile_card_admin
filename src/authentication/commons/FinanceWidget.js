import { Button, List, ListItem, ListItemText, Menu, Typography } from '@material-ui/core'
import { grey, orange } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import {connect} from 'react-redux'
import {me} from '../state/actions/usersActions'
import {indexFinance,showFiance} from './state/action/financeAction'
import withStyles from '@material-ui/core/styles/withStyles'
import financeStyle from './styles/financeStyle'
class FinanceWidget extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            anchorEl:null
        }
        this.handleMenu = this.handleMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    handleMenu = (event)=>{
        this.setState({
            anchorEl:event.currentTarget
        })
    }

    closeMenu = (event)=>{
        this.setState({
            anchorEl: null
        })
    }

    componentDidMount(){
        this.props.me()
        this.props.indexFinance()
    }
    

    render(){
        const {classes} = this.props 
        return <div className={classes.finance}>
            {
                this.props.loading
                ?
                    (
                        <Skeleton
                        variant={'rect'}
                        width={'20%'}
                        height={50}
                        style={{backgroundColor:grey[500]}}/>
                    )
                :
                    (
                        <div>
                            <Button
                             variant={'text'}
                             size={'medium'}
                             onMouseEnter={this.handleMenu}
                            >
                               {
                                   this.props.financeLoading
                                   ?
                                    <Skeleton
                                    variant={'rect'}
                                    width={'30%'}
                                    height={50}
                                    style={{backgroundColor:grey[500]}}/>
                                   :
                                        (
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                                <Typography variant={'h5'} style={{color:'white',marginRight:10}}>
                                                {
                                                    this.props.finance.finance.length<=0
                                                    ?
                                                        (<span>0</span>)
                                                    :
                                                        (
                                                            <span>{this.props.finance.finance[0].total_balance.toLocaleString()}</span>
                                                        )
                                                }
                                                </Typography>
                                                <Typography variant={'h5'} style={{color:orange[500]}}>
                                                    ETB
                                                </Typography>
                                            </div>
                                        )
                               }
                            </Button>
                            <Menu
                                id='profile-menu'
                                anchorEl={this.state.anchorEl}
                                open={Boolean(this.state.anchorEl)}
                                keepMounted
                                onClose={this.closeMenu}
                                >
                                    {
                                        this.props.financeLoading
                                        ?
                                            (
                                                <Skeleton
                                                    variant={'rect'}
                                                    width={'50%'}
                                                    height={50}
                                                    style={{backgroundColor:grey[500]}}
                                                />
                                            )
                                        :
                                            (
                                                <List
                                                style={{marginRight:100,width:'100%'}}
                                                component='nav'
                                                aria-labelledby='nested menu'
                                                >
                                        <ListItem button style={{width:'100%'}}>
                                            <ListItemText primary={
                                                this.props.finance.finance.length<=0
                                                ?
                                                    (<span>Sell balance: 0 ETB</span>)
                                                :
                                                    (
                                                        <span>
                                                            {`Sell balance: ${this.props.finance.finance[0].total_balance.toLocaleString()} ETB`}
                                                        </span>
                                                    )
                                            }/>
                                        </ListItem>

                                        <ListItem button>
                                            <ListItemText primary={
                                                this.props.finance.finance.length<=0
                                                ?
                                                    (<span>Total cards balance : 0 ETB</span>)
                                                :
                                                    (
                                                        <span>
                                                            {`Total card balance: ${this.props.finance.finance[0].total_goal.toLocaleString()} ETB`}
                                                        </span>
                                                    )
                                            }/>
                                        </ListItem>

                                    </List>
                                            )
                                    }

                            </Menu>
                        </div>
                    )
            }
        </div>
    }
}


const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading,
    finance:state.authReducer.commonReducer.financeReducer.finance,
    financeLoading:state.authReducer.commonReducer.financeReducer.loading
 })
export default withStyles(financeStyle)(connect(mapStateToProps,{me,indexFinance})(FinanceWidget));