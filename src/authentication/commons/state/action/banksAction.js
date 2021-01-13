import React from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
import {FETCH_BANKS} from '../commonConstants'
const PATH = 'banks'

export const indexBanks = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_BANKS,
        payload:res.data
    }))
}