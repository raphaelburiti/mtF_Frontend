import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import api from '../../services/api'
import './styles.css';
import logo from '../../assets/origami.png'
import userIcon from '../../assets/avatar.png'

export default function Header() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userSection)
  const urlImage = user.thumbnail ? user.thumbnail : userIcon

  function toggleMenu() {
    const menu = document.querySelector('.menu')
    const menuContent = document.querySelector('.menu-content')

    if(menu.style.display === 'flex') {
      menu.style.display = 'none' 
      menuContent.style.opacity = 0
    } else {
      menu.style.display  = 'flex'
      setTimeout(() => {
        menuContent.style.opacity = 100
      }, 1000);
    }
  }

  function logout() {
    dispatch({type: 'REMOVE_USER', payload: false})
    dispatch({type: 'REMOVE_TOKEN', payload: false})
    toggleMenu() 
  }

  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/main" className="logo">
          <img src={logo} width="65px" alt="a" />
          <h2>mtFree</h2>
        </Link>
        <div className="user-content">
          <nav className="menu">
            <div className="menu-content">
            <div className="info-user">
              <span className="info-name">{user.name}</span>
              <span className="info-email">{user.email}</span>
            </div>
            <ul className="links-menu">
              <Link to="/main"  className="item-menu" onClick={() => toggleMenu()} >Home</Link>
              <Link to="/edit" className="item-menu" onClick={() => toggleMenu()} >Perfil</Link>
              <Link to="/" className="item-menu" onClick={() => logout()} >Sair</Link>
            </ul>
            <i onClick={() => toggleMenu()} className="material-icons icon-arrow_up">keyboard_arrow_up</i>
            </div>
          </nav>
          <span onClick={() => toggleMenu()} className="user-name">{user.name && user.name.split(' ')[0]}</span>
          {/* <img onClick={() => toggleMenu()} className="user-avatar" src={avatar} alt="a" width="40px" /> */}
          <div className="user-avatar">
          <img className="user-avatar-img" src={`${process.env.REACT_APP_API_URL}files/${urlImage}`} alt="thumbnail-user" 
               onClick={() => toggleMenu()} />
          </div>
        </div>
      </div>
    </header>
  );
}