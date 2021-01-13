import {FETCH_CARD_PRICE,STORE_CARD_PRICE,UPDATE_CARD_PRICE} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'card_price'

export const indexCardPrice = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_CARD_PRICE,
        payload:res
    }))
}

export const storeCardPrice = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_CARD_PRICE,
        payload:res
    }))
}

export const updateCardPrice = (id,data)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_CARD_PRICE,
        payload:res
    }))
}