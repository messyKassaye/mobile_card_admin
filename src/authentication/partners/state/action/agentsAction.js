import {SHOW_AGENTS,UPDATE_AGENT} from '../PartnersConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'agents'

export const showAgents = (status)=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_AGENTS,
        payload:res.data
    }))
}

export const updateAgent = (data,id)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_AGENT,
        payload:res
    }))
}