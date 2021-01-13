import {FETCH_REGION_CITY} from '../commonConstants'

const initialState={
    loading:true,
    regions:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_REGION_CITY:
            return {
                ...state,
                loading:false,
                regions:action.payload
            }

            default:
                return state
    }
}