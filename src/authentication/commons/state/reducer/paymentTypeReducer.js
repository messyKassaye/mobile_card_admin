import {FETCH_PAYMENT_TYPES} from '../commonConstants'

const initialState = {
    paymentTypes:[],
    loading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_PAYMENT_TYPES:
            return {
                ...state,
                paymentTypes:action.payload,
                loading:false
            }

            default:
                return state
    }
}