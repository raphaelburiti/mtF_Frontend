import React from 'react'
import Calendar from 'react-calendar'
import { useSelector, useDispatch } from 'react-redux'

import apiLocalhost from '../../services/apiLocalhost'
import './styles.css'

export default function SectionCalendar() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userSection)
  const { date } = useSelector(state => state.selectedDate)
  const { orderServices } = useSelector(state => state.serviceRecord)

  function onChange(selectedDate) {
    dispatch({ type: 'ADD_DATE', payload: new Date(selectedDate) })
    dispatch({ type: 'ADD_FORMATTEDDATE', payload: (new Date(selectedDate).getMonth() + 1) + '/' + new Date(selectedDate).getDate() + '/' + new Date(selectedDate).getFullYear() })
  }

  async function sendReport() {

    dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: true })
    dispatch({ type: 'ADD_LOADISTRUE', payload: false })

    await apiLocalhost.post('/call/report', {
      orderServices,
      dataUser: user
    })
      .then((response) => {
        dispatch({type: 'ADD_TYPEALERT', payload: 'done'})
        dispatch({type: 'ADD_MESSAGEALERT', payload: response.data.message })
        dispatch({ type: 'ADD_LOADISTRUE', payload: true })
        
      })
      .catch((error) => {
        if(error.response) {
          dispatch({type: 'ADD_TYPEALERT', payload: 'error'})
          dispatch({type: 'ADD_MESSAGEALERT', payload: error.response.data.message })
          dispatch({ type: 'ADD_LOADISTRUE', payload: true })
        } else {
          dispatch({type: 'ADD_TYPEALERT', payload: 'error'})
          dispatch({type: 'ADD_MESSAGEALERT', payload: 'Estamos com problemas no servidor' })
          dispatch({ type: 'ADD_LOADISTRUE', payload: true })
        }
          
      })

  }

  return (
    <>
      <section className="section-calendar">
        <div className="section-calendar-int">
          <div>
            
            <Calendar onClickDay={onChange} value={new Date(date)} />
            <div className="report-area">
              <div className="send-report">
                <span className="header-send-report">Clique no botão abaixo para enviar as despesas para o Pcs2</span>
                <button className="btn-send-report" onClick={() => sendReport()}>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}