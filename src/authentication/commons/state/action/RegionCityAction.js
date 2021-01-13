import {FETCH_REGION_CITY} from '../commonConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'

const PATH = 'region_city'
export const indexRegionCity = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_REGION_CITY,
        payload:res.data
    }))
}