import axios from 'axios'

const SEARCH_ERROR = 'SEARCH_ERROR'
const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
const SEARCH_LOADING = 'SEARCH_LOADING'
const SEARCH_FINISHED = 'SEARCH_FINISHED'

export function getSearch(search) {
  return async function(dispatch){
    dispatch({ type: SEARCH_LOADING })
    dispatch({ type: SEARCH_ERROR, payload: '' })
    try {
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/recipes/getSearch/${search}`,
      })
      dispatch({ type: SEARCH_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: SEARCH_ERROR, payload: error })
    } finally {
      dispatch({ type: SEARCH_FINISHED })
    }
  }
}

const initialState = {
  searchResult: {},
  loading: false,
  error: null,
}

export function SearchReducer(state = initialState, action){
  switch(action.type) {
    case SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: action.payload,
      }
    case SEARCH_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SEARCH_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
