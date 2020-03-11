import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'

export default function Alert() {

    const { message, type } = useSelector(state => state.messageAlert)
    const [ statusMessage, setStatusMessage ] = useState(type)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(message === '') {
            closeAlert() 
            setStatusMessage(type)
        } else {
            showAlert()
            setStatusMessage(type)
        }
        
    }, [message])

    function showAlert() {
        document.querySelector('.modal-alert').style.display = 'flex'

        setTimeout(() => {
            document.querySelector('.box-alert').style.display = 'flex'
            document.querySelector('.box-alert').classList.add('animationBoxAlert')
        }, 350);
    }

    function closeAlert() {
        document.querySelector('.modal-alert').style.display = 'none'
        document.querySelector('.box-alert').style.display = 'none'
        removeMessage() 
    }

    function removeMessage() {
        dispatch({type: 'ADD_MESSAGEALERT', payload: ''})
    }

  return (
    <>
        <div className="modal-alert">
            <div className="box-alert">
                <div className="message-alert">
                <span>{message}</span>
                <i className={`material-icons icon-${statusMessage}`}>
                    {statusMessage === 'error' ? statusMessage+'_outline' : statusMessage}
                </i>
                </div>
                <button className={`btn-${statusMessage}`} onClick={() => closeAlert()}>OK</button>
            </div>
        </div>
    </>
  )
}