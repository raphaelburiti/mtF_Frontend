import { combineReducers } from 'redux'

import userSection from './userSection'
import selectedDate from './selectedDate'
import serviceRecord from './serviceRecord'
import selectedService from './selectedService'
import activateProgressBar from './activateProgressBar'
import messageAlert from './messageAlert'

export default combineReducers({
  userSection,
  selectedDate,
  serviceRecord,
  selectedService,
  activateProgressBar,
  messageAlert
})