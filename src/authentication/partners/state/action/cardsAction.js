import {FETCH_CARDS, STORE_CARDS,SHOW_CARDS} from '../PartnersConstants'
import axios from 'axios'
import { API_URL, PARTNER_API_URL } from '../../../../constants/constants'
const PATH = 'my_cards'

export const indexCards = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_CARDS,
        payload:res.data
    }))
}

export const storeCards = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_CARDS,
        payload:res
    }))
}

export const showCards = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}/1`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_CARDS,
        payload:res
    }))
}