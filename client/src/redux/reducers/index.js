import {
  combineReducers
} from "redux";
import authReducer from './authReducer'
import articleReducer from './articleReducer'


export default combineReducers({
  auth: authReducer,
  articles: articleReducer
})