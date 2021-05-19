import axios from 'axios'

const ALL_RECIPES_SUCCESS = 'ALL_RECIPES_SUCCESS'
const ALL_RECIPES_LOADING = 'ALL_RECIPES_LOADING'
const ALL_RECIPES_FINISHED = 'ALL_RECIPES_FINISHED'
const ALL_RECIPES_ERROR = 'ALL_RECIPES_ERROR'

export function getAllRecipes() {
  return async function(dispatch){
    dispatch({ type: ALL_RECIPES_LOADING })
    dispatch({ type: ALL_RECIPES_ERROR, payload: '' })
    try {

      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/recipes/getAllRecipes',
      })
      dispatch({ type: ALL_RECIPES_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: ALL_RECIPES_ERROR, payload: error })
    } finally {
      dispatch({ type: ALL_RECIPES_FINISHED })
    }
  }
}

const initialState = {
  allRecipes: [],
  loading: false,
  error: null,
}

export function AllRecipesReducer(state = initialState, action){
  switch(action.type) {
    case ALL_RECIPES_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ALL_RECIPES_SUCCESS:
      return {
        ...state,
        allRecipes: action.payload,
      }
    case ALL_RECIPES_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case ALL_RECIPES_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
