import {FETCH_CARD_TYPE} from '../commonConstants'

const initialState = {
    loading:true,
    cardType:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_CARD_TYPE:
            return {
                ...state,
                loading:false,
                cardType:action.payload
            }

            default:
                return state
    }
}