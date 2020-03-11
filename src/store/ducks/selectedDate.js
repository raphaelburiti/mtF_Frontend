const INITIAL_STATE = {
  date: new Date(),
  formattedDate: (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
}

export default function selectedDate(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'ADD_DATE':
      return { ...state, date: action.payload }
    case 'ADD_FORMATTEDDATE':
      return { ...state, formattedDate: action.payload }
    default:
      return state
  }
}

export const Creators = {
  addDate: (VALUE) => ({
    type: 'ADD_DATE',
    payload: {
      VALUE
    }
  }),
  addFormattedDate: (VALUE) => ({
    type: 'ADD_FORMATTEDDATE',
    payload: {
      VALUE
    }
  })
}