import { Button, Divider, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {showMainDialog} from '../commons/state/action/dialogAction'
class ReceiptWidget extends React.Component{

    calculate = (amount,multiplier)=>{
        return amount*multiplier
    }

    closeDialog = ()=>{
        this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})

    }

    render() {
        return (
            <div>
                <Typography color={'primary'}>Your receipt</Typography>
                <Table>
                    <TableBody>

                    <TableRow>
                            <TableCell>
                                Quantity
                            </TableCell>
                            <TableCell>
                                {this.props.cardRequest.amount}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                Unit price
                            </TableCell>
                            <TableCell>
                                {`${this.calculate(this.props.cardPrice[0].percentage_value,this.props.cardType.value)} ETB`}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                Total price
                            </TableCell>
                            <TableCell>
                                {`${this.calculate(this.calculate(this.props.cardPrice[0].percentage_value,this.props.cardType.value),this.props.cardRequest.amount)} ETB`}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                Payed to
                            </TableCell>
                            <TableCell>
                                {`${this.props.user.first_name}`}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                Proccessed by
                            </TableCell>
                            <TableCell>
                                You
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                    <Button
                     onClick={()=>this.closeDialog()}
                     color={'primary'}
                     variant={'outlined'}
                     style={{textTransform:'none',margin:20}}>
                        Done
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(null,{showMainDialog})(ReceiptWidget)