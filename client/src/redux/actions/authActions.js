import axios from "axios";
import {
  FETCH_USER
} from "./types";

export const fetchUser = () => async dispatch => {
  // const request = axios
  // .get('/api/current_user') //dispatch after request is completed
  // .then(res => dispatch({ type: FETCH_USER, payload: res}))
  const res = await axios.get("/api/current_user");
  //dispatch after request is completed
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};