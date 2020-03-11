import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../services/api'

export default function LoadServices() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userSection)
  const { formattedDate } = useSelector(state => state.selectedDate)
  const { loadServices } = useSelector(state => state.serviceRecord)

  useEffect(() => {

    async function load() {
      await api.get(`/service/${user._id}`, {
        headers: {
          date_service: formattedDate
        }
      })
        .then((response) => {
          dispatch({ type: 'REMOVE_SELECTEDSERVICE' })
          dispatch({ type: 'ADD_SERVICERECORD', payload: response.data.orderServices })
          dispatch({ type: 'ADD_LOADISTRUE', payload: true })
        })
        .catch(() => {
          dispatch({ type: 'ADD_LOADISTRUE', payload: true })
        })
    }
    load()
  }, [formattedDate, loadServices, user])

  return (
    <>
    </>
  )
}