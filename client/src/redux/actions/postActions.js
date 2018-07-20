import {
  LOAD_ARTICLES,
  GET_ARTICLE,
  LIKE_ARTICLE,
  SET_PROFILE,
  CLEAR_PROFILE,
  GET_ERRORS
} from './types'
import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:3000/api/"

export function loadArticles() {
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


export function getArticle(article_id) {
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

export function getUserProfile(_id) {
  return (dispatch) => {
    axios.get(`${url}user/profile/${_id}`).then((res) => {
      let profile = res.data
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      })
    }).catch(err => console.log(err))
  }
}
export function clearUserProfile() {
  return dispatch => {
    dispatch({
      type: CLEAR_PROFILE,
      payload: {}
    })
  }
}

//id, user_id
export function follow(id, user_id) {
  return (dispatch) => {
    axios.post(`${url}user/follow`, {
      id,
      user_id
    }).then((res) => {
      dispatch({
        type: 'FOLLOW_USER',
        user_id
      })
    }).catch((err) => console.log(err))
  }
}

// Add like

export const addLike = id => dispatch => {
  axios
    .post(`${url}posts/like/${id}`)
    .then(res => dispatch(loadArticles()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Remove like

export const removeLike = id => dispatch => {
  axios
    .post(`${url}posts/unlike/${id}`)
    .then(res => dispatch(loadArticles()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
