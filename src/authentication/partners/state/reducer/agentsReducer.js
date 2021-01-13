import {SHOW_AGENTS, UPDATE_AGENT} from '../PartnersConstants'

export const initialState = {
    loading:true,
    agents:[],
    updateResponse:{
        status:false,
        message:""
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case SHOW_AGENTS:
            return {
                ...state,
                agents:action.payload,
                loading:false
            }

            case UPDATE_AGENT:
                return{
                    ...state,
                    updateResponse:action.payload
                }
            
        default:
             return state
    }
}