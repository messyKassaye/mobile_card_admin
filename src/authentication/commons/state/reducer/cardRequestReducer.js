import {SHOW_CARD_REQUEST,STORE_CARD_REQUEST,UPDATE_CARD_REQUEST} from '../commonConstants'

const initialState = {
    loading:true,
    card_request:[],
    response:{
        status:false,
        message:''
    },
    updateResponse:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case SHOW_CARD_REQUEST:
            return {
                ...state,
                loading:false,
                card_request:action.payload
            }
            case UPDATE_CARD_REQUEST:
                return {
                    ...state,
                    updateResponse:action.payload
                }

            case STORE_CARD_REQUEST:
                return {
                    ...state,
                    response:action.payload
                }
            default:
                return state
    }
}