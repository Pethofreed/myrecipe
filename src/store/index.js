import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { UserReducer } from './UserReducer'
import { SignupReducer } from './SignupReducer'
import { SigninReducer } from './SigninReducer'
import { RecipeReducer } from './RecipeReducer'
import { RecipesReducer } from './RecipesReducer'
import { FavoritesReducer } from './FavoritesReducer'
import { AllRecipesReducer } from './AllRecipesReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const appReducers = combineReducers({
  UserReducer,
  RecipeReducer,
  SignupReducer,
  SigninReducer,
  RecipesReducer,
  FavoritesReducer,
  AllRecipesReducer
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)
