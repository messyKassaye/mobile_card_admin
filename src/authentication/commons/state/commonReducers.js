import {combineReducers} from "redux";
import addressReducer from "./reducer/addressReducer";
import cardPriceReducer from "./reducer/cardPriceReducer";
import cardRequestReducer from "./reducer/cardRequestReducer";
import cardTypeReducer from "./reducer/cardTypeReducer";
import financeReducer from "./reducer/financeReducer";
import followReducer from "./reducer/followReducer";
import RegionCityReducer from './reducer/RegionCityReducer'
import approveCardRequestReducer from './reducer/approveCardRequestReducer'
import bankAccountReducer from "./reducer/bankAccountReducer";
import banksReducer from "./reducer/banksReducer";
import nearByReducer from "./reducer/nearByReducer";
import verificationReducer from "./reducer/verificationReducer";
import paymentTypeReducer from "./reducer/paymentTypeReducer";
import dialogReducer from "./reducer/dialogReducer";
export default combineReducers({
    regionReducer:RegionCityReducer,
    addressReducer:addressReducer,
    cardRequestReducer:cardRequestReducer,
    cardPriceReducer:cardPriceReducer,
    cardTypeReducer:cardTypeReducer,
    followReducer:followReducer,
    financeReducer:financeReducer,
    cardRequestApproval:approveCardRequestReducer,
    bankAccountReducer:bankAccountReducer,
    banksReducer:banksReducer,
    nearByReducer:nearByReducer,
    verificationReducer:verificationReducer,
    paymentTypesReducer:paymentTypeReducer,
    dialogReducer:dialogReducer
})