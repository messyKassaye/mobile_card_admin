import {FETCH_BANKS} from '../commonConstants'

const initialState = {
    banks:[],
    loading:true,
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_BANKS:
            return {
                ...state,
                banks:action.payload,
                loading:false
            }

            default:
                return state
    }

}