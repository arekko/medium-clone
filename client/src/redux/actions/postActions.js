import { LOAD_ARTICLES, GET_ARTICLE, LIKE_ARTICLE } from './types'
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


export function getArticle (article_id) {
  return (dispatch) => {
    axios.get(`${url}article/${article_id}`)
      .then((res) => {
        let article = res.data
        dispatch({
          type: GET_ARTICLE, 
          payload: article
        })
      }).catch((err) => console.log(err))
  }
}

// Add likes

export function addLike (article_id) {
  return (dispatch) => {
    axios.post(`${url}article/like`,{ article_id }).then((res) => {
      dispatch({
        type: LIKE_ARTICLE
      })
    }).catch((err)=>console.log(err))
  }
}