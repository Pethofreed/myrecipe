import axios from 'axios'
import { history } from '../utils/history'

const RECIPES_SUCCESS = 'RECIPES_SUCCESS'
const RECIPES_LOADING = 'RECIPES_LOADING'
const RECIPES_FINISHED = 'RECIPES_FINISHED'
export const SAVE_RECIPE = 'SAVE_RECIPES'
export const RECIPES_ERROR = 'RECIPES_ERROR'

export function getRecipes() {
  return async function(dispatch){
    dispatch({ type: RECIPES_LOADING })
    dispatch({ type: RECIPES_ERROR, payload: '' })
    try {
      const token = localStorage.getItem('token')

      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/recipes/getRecipes',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: RECIPES_SUCCESS, payload: data.recipes})
    } catch (error) {
      dispatch({ type: RECIPES_ERROR, payload: error })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/signin')
      }
    } finally {
      dispatch({ type: RECIPES_FINISHED })
    }
  }
}

const initialState = {
  recipes: [],
  loading: false,
  error: null,
}

export function RecipesReducer(state = initialState, action){
  switch(action.type) {
    case RECIPES_LOADING:
      return {
        ...state,
        loading: true,
      }
    case RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload,
      }
    case RECIPES_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case RECIPES_FINISHED:
      return {
        ...state,
        loading: false,
      }
    case SAVE_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      }
    default:
      return state
  }
}
