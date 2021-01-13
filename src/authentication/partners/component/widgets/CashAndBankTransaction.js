import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { AttachMoney } from '@material-ui/icons'
import {grey} from '@material-ui/core/colors'
import React from 'react'
import columns from '../../data/columns'
import {indexCardPrice} from '../../../commons/state/action/cardPriceAction'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
class CashAndBankTransaction extends React.Component{

    componentDidMount(){
        this.props.indexCardPrice()
    }

    render() {
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton
                             variant={'rect'}
                             width={'100%'}
                             height={25}
                             style={{backgroundColor:grey[500]}}
                            />
                        )
                    :
                        (
                            <Card>
                                <CardHeader
                                style={{backgroundColor:'#1769aa',color:'white'}}
                                title={'In cash and bank transaction sells'}
                                avatar={<AttachMoney/>}/>
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
                                                            sell.amount*sell.card_type.value*this.props.cardPrice[0].percentage_value
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
            </div>
        )
    }
}

const mapStateToProps = state=>({
    cardPrice:state.authReducer.commonReducer.cardPriceReducer.cardPrice,
    loading:state.authReducer.commonReducer.cardPriceReducer.loading
})
export default connect(mapStateToProps,{indexCardPrice})(CashAndBankTransaction)