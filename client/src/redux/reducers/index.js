import {
  combineReducers
} from "redux";
import authReducer from './authReducer'
import articlehReducer from './articlesReducer'


export default combineReducers({
  auth: authReducer,
  articles: articlehReducer
})