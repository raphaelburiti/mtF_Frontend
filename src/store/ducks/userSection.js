const INITIAL_STATE = {
  token: '',
  user: {},
}

export default function userSection(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'ADD_TOKEN':
      return { ...state, token: action.payload }
    case 'REMOVE_TOKEN':
      return { ...state, token: false }
    case 'ADD_USER':
      return { ...state, user: action.payload }
    case 'REMOVE_USER':
    return { ...state, user: false }

    default:
      return state
  }
}

export const Creators = {
  addToken: (VALUE) => ({
    type: 'ADD_TOKEN',
    payload: {
      VALUE
    }
  }),
  removeToken: () => ({
    type: 'REMOVE_TOKEN'
  }),
  addUser: (VALUE) => ({
    type: 'ADD_USER',
    payload: {
      VALUE
    }
  }),
  removeUserId: () => ({
    type: 'REMOVE_USER'
  })
}