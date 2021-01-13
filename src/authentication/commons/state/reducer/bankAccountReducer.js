import {STORE_BANK_ACCOUNT,FETCH_BANK_ACCOUNT, UPDATE_BANK_ACCOUNT} from '../commonConstants'

const initialState = {
    bankAccount:[],
    loading:true,
    response:{
        status:false,
        message:''
    }

}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_BANK_ACCOUNT:
            return {
                ...state,
                bankAccount:action.payload,
                loading:false
            }
            case STORE_BANK_ACCOUNT:
                return {
                    ...state,
                    response:action.payload
                }
                case UPDATE_BANK_ACCOUNT:
                    return {
                        ...state,
                        response:action.payload
                    }
            default:
                return state
    }
}