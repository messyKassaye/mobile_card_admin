import {STORE_COMPANY, UPDATE_COMPANY} from '../PartnersConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'

const PATH = 'company'
export const storeCompany = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_COMPANY,
        payload:res
    }))
}

export const updateCompany = (data,id)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_COMPANY,
        payload:res
    }))
}
