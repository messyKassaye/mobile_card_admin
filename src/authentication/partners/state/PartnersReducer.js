import {combineReducers} from "redux";
import agentsReducer from "./reducer/agentsReducer";
import cardReducers from "./reducer/cardReducers";
import companiesReducer from "./reducer/companiesReducer";
import sellAndBuyReducer from "./reducer/sellAndBuyReducer";
import sendCardReducer from "./reducer/sendCardReducer";
import PartnerAgentReducer from './reducer/PartnerAgentReducer'
export default combineReducers({
    companyReducer:companiesReducer,
    cardReducer:cardReducers,
    agentsReducer:agentsReducer,
    sendCardReducer:sendCardReducer,
    sellBuyReducer:sellAndBuyReducer,
    sendFriendRequestReducer:PartnerAgentReducer
})