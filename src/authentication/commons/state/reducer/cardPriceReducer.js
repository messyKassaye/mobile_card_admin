import {FETCH_CARD_PRICE, STORE_CARD_PRICE,UPDATE_CARD_PRICE} from '../commonConstants'

const initialState = {
    loading:true,
    cardPrice:[],
    response:{
        status:false,
        message:'',
        card_price:[]
    },
    updateResponse:{
        status:false,
        message:''
    }
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_CARD_PRICE:
            return {
                ...state,
                loading:false,
                cardPrice:action.payload
            }
            case STORE_CARD_PRICE:
                return {
                    ...state,
                    response: action.payload
                }

                case UPDATE_CARD_PRICE:
                    return {
                        ...state,
                        updateResponse:action.payload
                    }

            default:
                return state
    }
}