import {FETCH_NEAR_BY} from '../commonConstants'

const initialState={
    response:{
        status:false,
        message:'',
        data:[]
    },
    loading:true
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_NEAR_BY:
            return {
                ...state,
                response:action.payload,
                loading:false
            }

            default:
            return state
    }
}