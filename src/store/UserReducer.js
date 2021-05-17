import axios from 'axios'
import { history } from '../utils/history'

const SAVE_USER = 'SAVE_USER'
const USER_ERROR = 'USER_ERROR'
const USER_SUCCESS = 'USER_SUCCESS'
const USER_LOADING = 'USER_LOADING'
const USER_FINISHED = 'USER_FINISHED'

export function getUser() {
  return async function(dispatch){
    dispatch({ type: USER_LOADING })
    dispatch({ type: USER_ERROR, payload: '' })
    try {
      const token = localStorage.getItem('token')

      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: USER_SUCCESS, payload: data.user})
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/signin')
      }
    } finally {
      dispatch({ type: USER_FINISHED })
    }
  }
}

const initialState = {
  user: {},
  loading: false,
  error: null,
}

export function UserReducer(state = initialState, action){
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case USER_FINISHED:
      return {
        ...state,
        loading: false,
      }
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
