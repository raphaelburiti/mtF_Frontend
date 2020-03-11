const INITIAL_STATE = {
  orderServices: [],
  loadServices: false,
}

export default function serviceRecord(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'ADD_SERVICERECORD':
      return { ...state, orderServices: action.payload }
    case 'SET_LOADSERVICE':
      return { ...state, loadServices: action.payload }
    default:
      return state
  }
}

export const Creators = {
  addOrdeService: (VALUE) => ({
    type: 'ADD_SERVICERECORD',
    payload: {
      VALUE
    }
  }),
  addLoad: (VALUE) => ({
    type: 'SET_LOADSERVICE',
    payload: {
      VALUE
    }
  })
}