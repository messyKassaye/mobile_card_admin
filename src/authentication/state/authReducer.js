import {combineReducers} from "redux";
import PartnersReducer from "../partners/state/PartnersReducer";
import commonReducer from '../commons/state/commonReducers'
export default combineReducers({
  commonReducer:commonReducer,
  partnerReducer:PartnersReducer
})
