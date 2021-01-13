import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
import {STORE_ADDRESS} from '../commonConstants'
const PATH = 'address'

export const storeAddress = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_ADDRESS,
        payload:res
    }))
}