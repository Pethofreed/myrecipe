import axios from 'axios'

const RECIPE_ERROR = 'RECIPE_ERROR'
const RECIPE_SUCCESS = 'RECIPE_SUCCESS'
const RECIPE_LOADING = 'RECIPE_LOADING'
const RECIPE_FINISHED = 'RECIPE_FINISHED'

export function getRecipe(idRecipe) {
  return async function(dispatch){
    dispatch({ type: RECIPE_LOADING })
    dispatch({ type: RECIPE_ERROR, payload: '' })
    try {
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/recipes/getRecipe/${idRecipe}`,
      })
      dispatch({ type: RECIPE_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: RECIPE_ERROR, payload: error })
    } finally {
      dispatch({ type: RECIPE_FINISHED })
    }
  }
}

const initialState = {
  oneRecipe: {},
  loading: false,
  error: null,
}

export function RecipeReducer(state = initialState, action){
  switch(action.type) {
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case RECIPE_SUCCESS:
      return {
        ...state,
        oneRecipe: action.payload,
      }
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case RECIPE_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
