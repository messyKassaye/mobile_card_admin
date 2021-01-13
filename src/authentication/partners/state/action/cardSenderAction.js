import {SEND_CARD} from '../PartnersConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'card_send'

export const sendCard = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SEND_CARD,
        payload:res
    }))
}