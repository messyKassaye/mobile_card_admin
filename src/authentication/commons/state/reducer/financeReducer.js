import {SHOW_FINANCE,INDEX_FINANCE} from '../commonConstants'

const initialState = {
    finance:{},
    loading:true,
    showFinance:{},
    showLoading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case INDEX_FINANCE:
            return {
                ...state,
                finance:action.payload,
                loading:false
            }
            case SHOW_FINANCE:
                return {
                    ...state,
                    showFinance:action.payload,
                    showLoading:false
                }

            default:
                return state
    }
}