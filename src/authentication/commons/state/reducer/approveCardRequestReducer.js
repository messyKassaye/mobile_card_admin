import {APPROVE_CARD_REQUEST} from '../commonConstants'

const initialState={
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case APPROVE_CARD_REQUEST:
            return {
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}