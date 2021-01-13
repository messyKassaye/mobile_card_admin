import {VERIFY_USER} from '../commonConstants'
import axios from 'axios'
const PATH = 'verification'

export const verifyUser = (path,data)=>dispatch=>{
    axios.post(`${path}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:VERIFY_USER,
        payload:res
    }))
}