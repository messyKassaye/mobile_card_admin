import {FETCH_SELL_AND_BUY} from '../PartnersConstants'

const initialState = {
    loading:true,
    sellBuy:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_SELL_AND_BUY:
            return {
                ...state,
                sellBuy:action.payload,
                loading:false
            }

            default:
                return state
    }
}