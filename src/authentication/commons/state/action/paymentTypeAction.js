import {FETCH_PAYMENT_TYPES} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'payment_types'

export const indexPaymentTypes = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_PAYMENT_TYPES,
        payload:res
    }))
}