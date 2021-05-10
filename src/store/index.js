import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { SignupReducer } from './SignupReducer'
import { SigninReducer } from './SigninReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const appReducers = combineReducers({
  SignupReducer,
  SigninReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)
