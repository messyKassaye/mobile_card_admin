import { Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core'
import { Business, Edit } from '@material-ui/icons'
import {connect} from 'react-redux'
import {me} from '../../../state/actions/usersActions'
import React, { Component } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { grey } from '@material-ui/core/colors'
import {showMainDialog} from '../../../commons/state/action/dialogAction'
import AddNewCompany from './AddNewCompany'
 class Company extends Component {

    componentDidMount(){
        this.props.me()
    }

    registerCompany = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewCompany type={'normal'} data={null}/>,
            title:'Register your company',
            actions:{

            }
        })
    }

    editCompany =(company)=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewCompany type={'edit'} data={company}/>,
            title:'Register your company',
            actions:{

            }
        })
    }
    render() {
        return (
            <Card>
                <CardHeader
                 title={'company information'}
                 avatar={
                     <Business/>
                 }
                />
                <Divider/>
                <CardContent>
                    {
                        this.props.loading
                        ?
                            (
                                <Skeleton
                                 width={'100%'}
                                 height={50}
                                 style={{backgroundColor:grey[500]}}
                                />
                            )
                        :
                            (
                                <div>
                                    {
                                        this.props.user.relations.company===null
                                        ?
                                            (
                                                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                    <Typography color={'secondary'}>
                                                        You haven't set your company
                                                    </Typography>
                                                    <Button
                                                     onClick={
                                                         this.registerCompany
                                                     }
                                                     variant={'outlined'}
                                                     color={'primary'}
                                                     style={{textTransform:'none'}}>
                                                        set it now
                                                    </Button>
                                                </div>
                                            )
                                        :
                                            (
                                                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                                    <Typography style={{marginBottom:15}}>
                                                        {`Company name: ${this.props.user.relations.company.name}`}
                                                    </Typography>
                                                    <Typography style={{marginBottom:15}}>
                                                        {`Phone number: ${this.props.user.relations.company.phone}`}
                                                    </Typography>
                                                    <Typography style={{marginBottom:15}}>
                                                        {`Email address: ${this.props.user.relations.company.email}`}
                                                    </Typography>
                                                </div>
                                            )
                                    }
                                </div>
                            )
                    }
                </CardContent>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Skeleton
                                 variant={'circle'}
                                 width={40}
                                 height={40}
                                 style={{backgroundColor:grey[500]}}
                                />
                            </div>
                        )
                    :
                        (
                            <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                {
                                    this.props.user.relations.company!==null
                                    ?
                                        (
                                            <IconButton onClick={
                                               ()=>this.editCompany(this.props.user.relations.company)
                                            } color={'primary'}>
                                                <Edit/>
                                            </IconButton>
                                        )
                                    :(null)
                                }
                            </CardActions>
                        )
                }
            </Card>
        )
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})


export default connect(mapStateToProps,{me,showMainDialog})(Company)