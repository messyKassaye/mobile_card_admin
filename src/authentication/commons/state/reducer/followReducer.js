import {FETCH_FOLLOW_REQUEST,SHOW_ACCEPTED_FOllOW,UPDATE_FOLLOW} from '../commonConstants'

const initialState = {
    follows:[],
    loading:true,
    acceptedFollows:[],
    acceptedLoading:true,
    response:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_FOLLOW_REQUEST:
            return {
                ...state,
                follows:action.payload,
                loading:false
            }
            case SHOW_ACCEPTED_FOllOW:
            return {
                ...state,
                acceptedFollows:action.payload,
                acceptedLoading:false
            }
            case UPDATE_FOLLOW:
                return {
                    ...state,
                    response:action.payload
                }
            default:
                return state
    }
}