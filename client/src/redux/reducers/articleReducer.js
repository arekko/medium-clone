import { LOAD_ARTICLES, GET_ARTICLE, LIKE_ARTICLE} from '../actions/types'


const initialState = {
  articles: [],
  article: {}
}
export default (state=initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES :
      return {
        ...state,
        articles: action.payload
      }
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload
      }
    case LIKE_ARTICLE:
      let article = Object.assign({}, state.article)
      article.claps++
      return {
        ...state,
        article: article
      }
    default:
      return state
  }
}