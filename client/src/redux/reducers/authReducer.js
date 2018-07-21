import {
  FETCH_USER,
  SET_PROFILE,
  CLEAR_PROFILE
} from '../actions/types'

import isEmpty from '../..//validation/is-empty'
const initialState = {
  isAuthenticated: false,
  user: {},
  profile: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
      case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
      case CLEAR_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    default:
      return state
  }
}


