import React from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
import {FETCH_BANK_ACCOUNT,STORE_BANK_ACCOUNT,UPDATE_BANK_ACCOUNT} from '../commonConstants'

const PATH = 'bank_account'

export const indexBankAccount = ()=>dispatch=>{
    console.log('called')
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_BANK_ACCOUNT,
        payload:res.data
    }))
}

export const storeBankAccount = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_BANK_ACCOUNT,
        payload:res
    }))
}

export const updateBankAccount = (id,data)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
    .then(response=>response)
    .then(res=>dispatch({
        type:UPDATE_BANK_ACCOUNT,
        payload:res
    }))
}