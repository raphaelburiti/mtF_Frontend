import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import api from '../../services/api'

export default function FormSection() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userSection)
  const { formattedDate } = useSelector(state => state.selectedDate)
  const { selectedService } = useSelector(state => state.selectedService)
  const { orderServices } = useSelector(state => state.serviceRecord)
  const { loadServices } = useSelector(state => state.serviceRecord)

  const [clearFields, setClearFields] = useState(false)
  const [distanceLastService, setDistanceLastService] = useState('')
  const [titleForm, setTitleForm] = useState('Novo Chamado')
  const [btnSubmitForm, setBtnSubmitForm] = useState('SALVAR')

  const [id_customer, setIdCustomer] = useState('')
  const [id_service, setIdCalled] = useState('')
  const [qtd_service, setQtdCalled] = useState('')
  const [distance_service, setDistance] = useState('')
  const [parking_service, setParking] = useState('')
  const [toll_service, setToll] = useState('')

  const checkboxLastService = document.querySelector('#check-last-service')

  useEffect(() => {
    if (!selectedService) {
      editTypeForm('new')
      setIdCustomer('')
      setIdCalled('')
      setQtdCalled('')
      setDistance('')
      setParking('')
      setToll('')
      setDistanceLastService('')
      setClearFields(false)
    }

    if (selectedService) {
      editTypeForm('edit')
      setIdCustomer(selectedService.id_customer)
      setIdCalled(selectedService.id_service)
      setQtdCalled(selectedService.qtd_service)
      setDistance(selectedService.distance_service)
      setParking(selectedService.parking_service)
      setToll(selectedService.toll_service)
    }

    const labelLastService = document.querySelector('.label-last-service')
    const checkboxLastService = document.querySelector('#check-last-service')
    const inputsForm = document.querySelectorAll('.form-new-called__input')
    const btnSubmit = document.querySelector('.form-new-called__btn--save')

    if (orderServices.length > 0) {
      if (orderServices[orderServices.length - 1].id_customer === 'Base' && !selectedService) {
        labelLastService.style.opacity = 0.6
        checkboxLastService.setAttribute('disabled', 'true')
        document.querySelector('.input-last-service').style.display = 'none'
        inputsForm.forEach(input => { input.setAttribute('disabled', 'true') })
        btnSubmit.disabled = true
      }
      if (orderServices[orderServices.length - 1].id_customer === 'Base' && selectedService) {
        labelLastService.style.opacity = 0.6
        checkboxLastService.setAttribute('disabled', 'true')
        document.querySelector('.input-last-service').style.display = 'none'
        inputsForm.forEach(input => { input.removeAttribute('disabled') })
        btnSubmit.disabled = false
      }
      if (orderServices[orderServices.length - 1].id_customer !== 'Base') {
        labelLastService.style.opacity = 1
        checkboxLastService.removeAttribute('disabled')
        inputsForm.forEach(input => { input.removeAttribute('disabled') })
        btnSubmit.disabled = false
      }
    }

    if (orderServices.length === 0) {
      labelLastService.style.opacity = 1
      checkboxLastService.removeAttribute('disabled')
      inputsForm.forEach(input => { input.removeAttribute('disabled') })
      btnSubmit.disabled = false
    }
  }, [selectedService, orderServices, clearFields])

  function editTypeForm(type) {
    if (type === 'new') {
      setTitleForm('Novo Chamado')
      setBtnSubmitForm('SALVAR')
    }
    if (type === 'edit') {
      setTitleForm('Editar Chamado')
      setBtnSubmitForm('EDITAR')
    }
  }

  function showLastServiceField() {

    if (checkboxLastService.checked === true) {
      document.querySelector('.input-last-service').style.display = 'flex'
    }

    if (checkboxLastService.checked === false) {
      document.querySelector('.input-last-service').style.display = 'none'
    }
  }

  function checkForm(event) {
    event.preventDefault()

    if (!checkboxLastService.checked) {
      if (id_customer !== '' && id_service !== '' && qtd_service !== '' && distance_service !== '') {
        handleSubmit()
      } else {
        alert('Preencha todos os campos do formulário')
      }
    }

    if (checkboxLastService.checked) {
      if (id_customer !== '' && id_service !== '' && qtd_service !== '' && distance_service !== '' && distanceLastService !== '') {
        handleSubmit()
      } else {
        alert('Preencha todos os campos do formulário')
      }
    }
  }

  async function handleSubmit() {
    dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: true })
    dispatch({ type: 'ADD_LOADISTRUE', payload: false })

    let api_httpMethod = selectedService ? api.put : api.post

    if (!checkboxLastService.checked) {

      await api_httpMethod('/service', {
        id_user: user._id,
        id_selectedService: selectedService._id,
        id_customer,
        id_service,
        qtd_service,
        distance_service,
        parking_service,
        toll_service,
        date_service: formattedDate
      })
        .then(async () => {
          dispatch({ type: 'SET_LOADSERVICE', payload: loadServices ? false : true })
          editTypeForm('new')
        })
    }

    if (checkboxLastService.checked && distanceLastService) {
      await api_httpMethod('/service', {
        _id: selectedService._id,
        id_customer: id_customer,
        id_user: user._id,
        id_service,
        qtd_service,
        distance_service,
        parking_service,
        toll_service,
        date_service: formattedDate
      })
        .then(async () => {
          await api.post('/service', {
            id_customer: 'Base',
            id_user: user._id,
            id_service: '0',
            qtd_service: '0',
            distance_service: distanceLastService,
            parking_service: '0',
            toll_service: '0',
            date_service: formattedDate
          })
        })
        .then(() => {
          dispatch({ type: 'SET_LOADSERVICE', payload: loadServices ? false : true })
          editTypeForm('new')
          checkboxLastService.checked = false
        })
    }
  }

  function clearForm() {
    dispatch({ type: 'REMOVE_SELECTEDSERVICE' })
    editTypeForm('new')
    setClearFields(true)
  }

  return (
    <>
      <section className="section-right">
        <div className="section-int">
          <header className="title section-right__title">{titleForm}</header>
          <form className="form-new-called" onSubmit={checkForm}>

            <label className="form-new-called__label">Sigla Cliente</label>
            <input className="form-new-called__input"
              onChange={e => setIdCustomer(e.target.value)} value={id_customer} autoFocus />

            <label className="form-new-called__label">Nº Chamado</label>
            <input className="form-new-called__input"
              onChange={e => setIdCalled(e.target.value)} value={id_service} />

            <label className="form-new-called__label">Qtd Chamados</label>
            <input className="form-new-called__input"
              onChange={e => setQtdCalled(e.target.value)} value={qtd_service} />

            <label className="form-new-called__label">Quilometragem</label>
            <input className="form-new-called__input"
              onChange={e => setDistance(e.target.value)} value={distance_service} />

            <label className="form-new-called__label">Estacionamento</label>
            <input className="form-new-called__input"
              onChange={e => setParking(e.target.value)} value={parking_service} />

            <label className="form-new-called__label">Pedágio</label>
            <input className="form-new-called__input"
              onChange={e => setToll(e.target.value)} value={toll_service} />

            <label className="form-new-called__label label-last-service">Este é o útimo chamado do dia?
            <input id="check-last-service" type="checkbox" onClick={() => showLastServiceField()} />
              <label>Sim</label>
            </label>
            <input className="form-new-called__input input-last-service" placeholder="Distâcia em Km para voltar à base"
              onChange={e => setDistanceLastService(e.target.value)} value={distanceLastService} />

            <div className="btn-area">
              <button className="form-new-called__btn--save button bg-success"
                type="submit" >{btnSubmitForm}</button>
              <input className="form-new-called__btn--cancel button bg-secondary" readOnly={true}
                onClick={() => clearForm()} value='CANCELAR' />
            </div>

          </form>
        </div>
      </section>
    </>
  )
}