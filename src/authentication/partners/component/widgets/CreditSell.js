import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { AttachMoney } from '@material-ui/icons'
import React from 'react'
import columns from '../../data/columns'
import {me} from '../../../state/actions/usersActions'
import {connect} from 'react-redux'
class CreditSell extends React.Component{

    render() {
        return (
            <Card>
                <CardHeader
                style={{backgroundColor:'#f50057',color:'white'}}
                avatar={<AttachMoney/>}
                title={'Credit sells'}/>
                <CardContent style={{padding:0}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map(column=>(
                                        <TableCell align={column.align}>
                                            {column.label}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.sells.map(sell=>(
                                    <TableRow>
                                        <TableCell>{sell.id}</TableCell>
                                        <TableCell>{sell.requester[0].first_name}</TableCell>
                                        <TableCell>{`${sell.card_type.value} Birr card`}</TableCell>
                                        <TableCell>{sell.amount}</TableCell>
                                        <TableCell>{sell.sold_date}</TableCell>
                                        <TableCell>
                                            {
                                                 `${sell.amount*(this.props.user.relations.card_price[0].percentage_value*sell.card_type.value)} ETB`
                                            }
                                        </TableCell>
                                        <TableCell>{sell.approval[0].first_name}</TableCell>
                                        <TableCell>
                                            <Button
                                             variant={'outlined'}
                                             size={'small'}
                                             style={{textTransform:'none'}}
                                             color={'secondary'}>
                                                Remove
                                            </Button>
                                            <Button
                                             variant={'contained'}
                                             size={'small'}
                                             color={'primary'}
                                             style={{textTransform:'none',marginLeft:25}}>
                                                Payed
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading
 })

export default connect(mapStateToProps,{me})(CreditSell)