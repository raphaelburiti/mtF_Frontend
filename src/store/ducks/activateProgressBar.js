const INITIAL_STATE = {
  activateProgressBar: false,
  loadIsTrue: false,
}

export default function activateProgressBar(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'ADD_ACTIVATEPROGRESSBAR':
      return { ...state, activateProgressBar: action.payload }
    case 'ADD_LOADISTRUE':
      return { ...state, loadIsTrue: action.payload }
    default:
      return state
  }
}

export const Creators = {
  addActiveProgressBar: (VALUE) => ({
    type: 'ADD_ACTIVATEPROGRESSBAR',
    payload: {
      VALUE
    }
  }),
  addLoadIsTrue: (VALUE) => ({
    type: 'ADD_LOADISTRUE',
    payload: {
      VALUE
    }
  })
}