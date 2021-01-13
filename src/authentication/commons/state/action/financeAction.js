import {FETCH_FINANCE} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
import {SHOW_FINANCE,INDEX_FINANCE} from '../commonConstants'
const PATH = 'finances'

export const indexFinance = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:INDEX_FINANCE,
        payload:res
    }))
}

export const showFiance = (id)=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${id}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_FINANCE,
        payload:res
    }))
}