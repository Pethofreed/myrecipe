const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_ERROR = 'CHANGE_ERROR'
const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const CHANGE_SPECIALITY = 'CHANGE_SPECIALITY'
const CHANGE_PASSWORDCONFIRM = 'CHANGE_PASSWORDCONFIRM'

export function changeName(value){
  return {
    type: CHANGE_NAME,
    payload: value,
  }
}

export function changePassword(value){
  return {
    type: CHANGE_PASSWORD,
    payload: value,
  }
}

export function changePasswordConfirm(value){
  return {
    type: CHANGE_PASSWORDCONFIRM,
    payload: value,
  }
}

export function changeEmail(value){
  return {
    type: CHANGE_EMAIL,
    payload: value,
  }
}

export function changeSpeciality(value){
  return {
    type: CHANGE_SPECIALITY,
    payload: value,
  }
}

export function changeError(value){
  return {
    type: CHANGE_ERROR,
    payload: value,
  }
}

const initialState = {
  name: '',
  password: '',
  passwordconfirm: '',
  email: '',
  speciality: '',
  error: '',
}

export function SignupReducer(state = initialState, action){
  switch(action.type){
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case CHANGE_PASSWORDCONFIRM:
      return {
        ...state,
        passwordconfirm: action.payload,
      }
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case CHANGE_SPECIALITY:
      return {
        ...state,
        speciality: action.payload,
      }
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
