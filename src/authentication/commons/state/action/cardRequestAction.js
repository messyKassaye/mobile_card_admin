import {SHOW_CARD_REQUEST,STORE_CARD_REQUEST,UPDATE_CARD_REQUEST} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'card_request'

export const showCardRequest = (status)=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${status}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_CARD_REQUEST,
        payload:res.data
    }))
}

export const storeCardRequest =  (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_CARD_REQUEST,
        payload:res
    }))
}

export const updateCardRequest = (id,data)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_CARD_REQUEST,
        payload:res
    }))
}