import {
  LOAD_ARTICLES,
  GET_ARTICLE,
  LIKE_ARTICLE,
  POST_LOADING
} from '../actions/types'


const initialState = {
  articles: [],
  article: {},
  loading: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      }
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false
      }
    case LIKE_ARTICLE:
      let article = Object.assign({}, state.article)
      article.claps++
        return {
          ...state,
          article: article
        }
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}