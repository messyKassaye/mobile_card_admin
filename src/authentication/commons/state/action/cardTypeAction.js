import {FETCH_CARD_TYPE} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'card_type'
export const indexCardType = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_CARD_TYPE,
        payload:res
    }))
}