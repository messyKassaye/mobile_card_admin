import {FETCH_SELL_AND_BUY} from '../PartnersConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'sell_and_buy'
export const indexSellBuy = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_SELL_AND_BUY,
        payload:res.data
    }))

}