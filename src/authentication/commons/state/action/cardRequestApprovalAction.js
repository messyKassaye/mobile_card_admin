import {APPROVE_CARD_REQUEST} from '../commonConstants'
import axios from 'axios'
import { API_URL, PARTNER_API_URL } from '../../../../constants/constants'
const PATH = 'card_request_approval'

export const approveCardRequest = (data,id)=>dispatch=>{
    console.log(`Called ${id}`)
    axios.put(`${API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:APPROVE_CARD_REQUEST,
        payload:res
    }))
}