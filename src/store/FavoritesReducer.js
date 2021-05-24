import axios from 'axios'
import { history } from '../utils/history'

const FAVORITES_SUCCESS = 'FAVORITES_SUCCESS'
const FAVORITES_LOADING = 'FAVORITES_LOADING'
const FAVORITES_FINISHED = 'FAVORITES_FINISHED'
export const FAVORITES_ERROR = 'FAVORITES_ERROR'

export function getFavorites() {
  return async function(dispatch){
    dispatch({ type: FAVORITES_LOADING })
    dispatch({ type: FAVORITES_ERROR, payload: '' })
    try {
      const token = localStorage.getItem('token')

      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/favorites/getFavorites',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: FAVORITES_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: FAVORITES_ERROR, payload: error })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/signin')
      }
    } finally {
      dispatch({ type: FAVORITES_FINISHED })
    }
  }
}

const initialState = {
  favoritesRecipes: [],
  loading: false,
  error: null
}

export function FavoritesReducer(state = initialState, action){
  switch(action.type) {
    case FAVORITES_LOADING:
      return {
        ...state,
        loading: true,
      }
    case FAVORITES_SUCCESS:
      return {
        ...state,
        favoritesRecipes: action.payload,
      }
    case FAVORITES_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case FAVORITES_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
