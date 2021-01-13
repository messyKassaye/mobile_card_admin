import {SEND_FRIEND_REQUEST} from '../PartnersConstants'

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case SEND_FRIEND_REQUEST:
            return{
                ...state,
                response:action.payload
            }

            default:
                return state
    }
}