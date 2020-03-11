import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import Header from '../../Components/Header'
import ProgressBar from '../../Components/ProgressBar'
import api from '../../services/api'

export default function EditUser() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userSection)
  
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [userPcs2, setUserPcs2] = useState(user.user_pcs2)
  const [passwordPcs2, setPasswordPcs2] = useState(user.password_pcs2)
  const [userThumbIsNull, setUserThumbIsNull] = useState('')

  useEffect(() => {
    user.thumbnail === 'default.png' ? setUserThumbIsNull(true) : setUserThumbIsNull(false)
  }, [user.thumbnail])

  useEffect(() => {
    const inputs = document.querySelectorAll('.edit-input')

    inputs.forEach(element => {
      if (element.value) {
        element.classList.add('edit-input-on')
        element.parentNode.classList.add('edit-label-on')
      }
    })
  })

  document.addEventListener('click', e => switchClassOn(e.target))

  function switchClassOn(e) {
    const inputs = document.querySelectorAll('.edit-input')

    inputs.forEach(element => {
      if (element !== e && !element.value) {
        element.classList.remove('edit-input-on')
        element.parentNode.classList.remove('edit-label-on')
      }
      if (element === e && !element.value) {
        element.classList.add('edit-input-on')
        element.parentNode.classList.add('edit-label-on')
      }
    })
  }

  async function removeThumbnail() {
    dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: true })
    dispatch({ type: 'ADD_LOADISTRUE', payload: false })

    await api.delete('/userimg', {
      headers: {
        email,
        image: user.thumbnail
      }
    })
      .then(response => {
        dispatch({ type: 'ADD_USER', payload: response.data })
        dispatch({ type: 'ADD_LOADISTRUE', payload: true })
      })
  }

  async function changeThumbnail(inputFile) {
    dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: true })
    dispatch({ type: 'ADD_LOADISTRUE', payload: false })

    const formData = new FormData()
    const imageFile = inputFile.files[0]

    formData.append('file', imageFile)
  
    await api.put('/userimg', formData, { 
      headers: {
        email,
        image: user.thumbnail
      }
    })
      .then(response => {
        dispatch({ type: 'ADD_USER', payload: response.data })
        dispatch({ type: 'ADD_LOADISTRUE', payload: true })
      })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (password === passwordConfirm) {
      dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: true })
      dispatch({ type: 'ADD_LOADISTRUE', payload: false })
      
      await api.put('/user', { 
        name, email, address, password, userPcs2, passwordPcs2 
     })
       .then((response) => {
         dispatch({ type: 'ADD_LOADISTRUE', payload: true })
         dispatch({ type: 'ADD_USER', payload: response.data })
         dispatch({type: 'ADD_TYPEALERT', payload: 'done'})
         dispatch({type: 'ADD_MESSAGEALERT', payload: 'Usuário alterado com sucesso!' })
       })
    } else {
      dispatch({type: 'ADD_TYPEALERT', payload: 'error'})
      dispatch({type: 'ADD_MESSAGEALERT', payload: 'Senhas não coincidem' })
    }
  }

  return (
    <>
      <Header />
      <ProgressBar />
      <div className="container-edit">
        <section className="thumb-section">
          <label className="thumb-box">   
            <input type="file" className="input-thumbnail" onChangeCapture={e => changeThumbnail(e.target)} encType="multipart/form-data"/>
            <img className="thumb-img" src={`${process.env.REACT_APP_API_URL}files/${user.thumbnail}`} alt="thumbnail-user" />
          </label>   
          <div className="label-area">
            <label className="thumb-label">
              <input type="file" className="input-thumbnail" onChange={e => changeThumbnail(e.target)} encType="multipart/form-data"/>
                { userThumbIsNull ? 'Adicionar uma imagem' : 'Alterar imagem' }
            </label>
            { userThumbIsNull ? <></> : <i onClick={() => removeThumbnail()} className="material-icons delete-icon">delete</i> }
          </div>
        </section>
        <form className="info-section" onSubmit={handleSubmit}>
          <div className="info-perfil">
            <h2>Perfil</h2>
            <span className="edit-field" >
              <label className="edit-label">Nome
            <input className="edit-input" value={name}
                  onChange={e => setName(e.target.value)} />
              </label>
            </span>
            <span className="edit-field">
              <label className="edit-label">Email
            <input className="edit-input" value={email}
                  onChange={e => setEmail(e.target.value)} />
              </label>
            </span>
            <span className="edit-field" >
              <label className="edit-label">Endereço
            <input className="edit-input" value={address}
                  onChange={e => setAddress(e.target.value)} />
              </label>
            </span>
            <span className="edit-field">
              <label className="edit-label">Nova senha
              <input className="edit-input" value={password} type="password"
                  onChange={e => setPassword(e.target.value)} />
              </label>
            </span>
            <span className="edit-field">
              <label className="edit-label">Confirmar senha
              <input className="edit-input" value={passwordConfirm} type="password"
                  onChange={e => setPasswordConfirm(e.target.value)} />
              </label>
            </span>
          </div>

          <div className="info-pcs2">
            <h2>Login pcs2</h2>
            <span className="edit-field" >
              <label className="edit-label">Usuário pcs2
            <input className="edit-input" value={userPcs2}
                  onChange={e => setUserPcs2(e.target.value)} />
              </label>
            </span>
            <span className="edit-field">
              <label className="edit-label">Senha pcs2
                    <input className="edit-input" value={passwordPcs2} type="password"
                  onChange={e => setPasswordPcs2(e.target.value)} />
              </label>
            </span>
            <input className="btn-submit" type="submit" value="Salvar Alterações" />
          </div>
        </form>
      </div>
    </>
  )
}