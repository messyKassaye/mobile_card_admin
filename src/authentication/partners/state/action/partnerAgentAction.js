import {SEND_FRIEND_REQUEST} from '../PartnersConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'partner_agent'

export const sendRequest = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SEND_FRIEND_REQUEST,
        payload:res
    }))
}