import {STORE_COMPANY, UPDATE_COMPANY} from '../PartnersConstants'
const initialState = {
    response:{
        status:false,
        message:'',
        company:''
    },
    updateResponse:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case STORE_COMPANY:
            return{
                ...state,
                response:action.payload
            }

            case UPDATE_COMPANY:
                return {
                    ...state,
                    updateResponse:action.payload
                }

            default:
                return state
    }
}