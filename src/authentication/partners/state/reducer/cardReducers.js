import {FETCH_CARDS, STORE_CARDS,SHOW_CARDS} from '../PartnersConstants'

const initialState = {
    cards:[],
    loading:true,
    response:{
        status:false,
        message:''
    },
    showResponse:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_CARDS:
            return{
                ...state,
                cards:action.payload,
                loading:false
            }
            case STORE_CARDS:
                return {
                    ...state,
                    response:action.payload
                }

            case SHOW_CARDS:
                    return {
                        ...state,
                        response:action.payload
                    }

            default:
                return state
    }
}