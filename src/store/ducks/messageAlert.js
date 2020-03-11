const INITIAL_STATE = {
  message: '',
  type: '',
}

export default function messageAlert(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'ADD_MESSAGEALERT':
      return { ...state, message: action.payload }
      case 'ADD_TYPEALERT':
        return {...state, type: action.payload}
    default:
      return state
  }
}

export const Creators = { 
  addMessageAlert: (VALUE) => ({
    type: 'ADD_MESSAGEALERT',
    payload: {
      VALUE
    }
  }),
  addTypeAlert: (VALUE) => ({
    type: 'ADD_TYPEALERT',
    payload: {
      VALUE
    }
  })
}