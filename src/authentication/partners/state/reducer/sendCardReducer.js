import {SEND_CARD} from '../PartnersConstants'

const initialState = {
    response:{
        status:false,
        card_request:{},
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case SEND_CARD:
            return {
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}