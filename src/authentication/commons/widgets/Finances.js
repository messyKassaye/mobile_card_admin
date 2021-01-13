import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import { Add, AttachMoney } from '@material-ui/icons'
import React from 'react'
import {indexBankAccount} from '../state/action/bankAccountAction'
import {connect} from 'react-redux'
import HorizontalLoading from '../loading/HorizontalLoading'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey } from '@material-ui/core/colors'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import AddBankAccount from '../dialogs/AddBankAccount'
class Finances extends React.Component{

    componentDidMount(){
        this.props.indexBankAccount()

    }

    addAccount = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddBankAccount form={{type:'edit',data:''}}/>,
            title:`Set your bank account`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    editAccount = account=>{
        this.props.showMainDialog({
            show:true,
            page:<AddBankAccount form={{type:'Edit',data:account}}/>,
            title:`Set your bank account`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render(){

        return <Card>
            <CardContent>
            <CardHeader
            title={'Banks and accounts'}
            avatar={<AttachMoney/>}
            action={
                this.props.loading
                ?
                    (
                        <Skeleton
                        variant={'circle'}
                        width={40}
                        height={40}
                        style={{backgroundColor:grey[500]}}/>
                    )
                :
                    (
                        <IconButton
                        onClick={this.addAccount}
                        color={'inherit'}>
                            <Add/>
                        </IconButton>
                    )
            }/>
            <Divider/>
                {
                    this.props.loading
                    ?
                        (
                            <HorizontalLoading height={20}/>
                        )
                    :
                        (
                            <div>
                                {
                                    this.props.bankAccount.length<=0
                                    ?
                                        (
                                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                             <Typography color={'primary'}>
                                                 You haven't set your account. Start setting now
                                             </Typography>
                                             <Button
                                             onClick={this.addAccount}
                                             variant={'outlined'}
                                             color={'primary'}
                                             size={'small'}
                                             style={{textTransform:'none',marginTop:20}}>
                                                 Set now
                                             </Button>
                                            </div>
                                        )
                                    :
                                        (
                                            <Box  style={{maxWidth:600}}>
                                                <Grid container spacing={2} >
                                                {
                                                    this.props.bankAccount
                                                    .map(bankAccount=>(
                                                        <Grid item md={12} key={bankAccount.id}>
                                                            <Card>
                                                            <CardHeader
                                                            title={bankAccount.bank.name}
                                                            avatar={
                                                            <Avatar>{bankAccount.bank.name.charAt(0)}</Avatar>
                                                            }/>
                                                            <CardContent style={{paddingRight:0,paddingTop:0}}>
                                                                <Typography>
                                                                    {`Account number : ${bankAccount.account_number}`}
                                                                </Typography>
                                                                <Typography>
                                                                    {`Account holder name: ${bankAccount.holder_full_name}`}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                                <Button
                                                                onClick={()=>this.editAccount(bankAccount)}
                                                                variant={'outlined'}
                                                                color={'primary'}
                                                                size={'small'}
                                                                style={{textTransform:'none'}}>
                                                                    Edit
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                        </Grid>
                                                    ))
                                                }
                                                </Grid>
                                
                                            </Box>
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
    bankAccount:state.authReducer.commonReducer.bankAccountReducer.bankAccount,
    loading:state.authReducer.commonReducer.bankAccountReducer.loading
})

export default connect(mapStateToProps,{indexBankAccount,showMainDialog})(Finances)