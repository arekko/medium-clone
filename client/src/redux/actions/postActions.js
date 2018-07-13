import axios from "axios";
import {
  LOAD_ARTICLES
} from './types'

export function loadArticles () {
  return (dispatch) => {
    axios.get('/api/getall')
      .then((res) => {
        dispatch({
          type:'LOAD_ARTICLES', 
          payload: res.data
        })
      }).catch((err) => {
      console.log(err)
    })
  }
}