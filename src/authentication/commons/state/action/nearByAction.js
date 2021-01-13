import {FETCH_NEAR_BY} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'near_by'

export const indexNearBy = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_NEAR_BY,
        payload:res
    }))
}