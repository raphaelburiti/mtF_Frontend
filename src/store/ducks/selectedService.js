const INITIAL_STATE = {
  selectedService: {},
}

export default function selectedService(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'ADD_SELECTEDSERVICE':
      return { selectedService: action.payload[0] }
    case 'REMOVE_SELECTEDSERVICE':
      return { selectedService: '' }
    default:
      return state
  }
}

export const Creators = {
  addSelectedService: (VALUE) => ({
    type: 'ADD_SELECTEDSERVICE',
    payload: {
      VALUE
    }
  }),
  removeSelectedService: (VALUE) => ({
    type: 'REMOVE_SELECTEDSERVICE'
  })
}