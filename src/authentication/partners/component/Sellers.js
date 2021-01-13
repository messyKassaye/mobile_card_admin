import { Card, CardContent, CardHeader, Container, IconButton } from '@material-ui/core'
import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import {connect} from 'react-redux'
import AddNewUser from '../../commons/AddNewUser'
class Sellers extends React.Component{

    add = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewUser form={{type:'',data:null}}/>,
            title:'Register your card seller',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render(){
        return <Container maxWidth={'lg'}>
                <Card>
                    <CardHeader
                     title={'Sellers'}
                     avatar={<PersonIcon/>}
                     action={<IconButton onClick={this.add}><AddIcon/></IconButton>}
                    />
                    <CardContent>

                    </CardContent>
                </Card>
        </Container>
    }
}

export default connect(null,{showMainDialog})(Sellers)