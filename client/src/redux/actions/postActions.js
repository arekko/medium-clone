import { LOAD_ARTICLES } from './types'
import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:3000/api/"

export function loadArticles () {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/articles')
      .then((res) => {
        dispatch({
          type: LOAD_ARTICLES, 
          payload: res.data
        })
      }).catch((err) => {
      console.log(err)
    })
  }
}