import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/origami-2.png'
import api from '../../services/api';

export default function Login({ history }) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    var msgError = document.createElement('p');
    msgError.classList.add('msg-error')

    useEffect(() => {
        const inputEmail = document.querySelector('#email');
        const msgErrorEmailPassword = document.querySelector('.msg-error--email-password');
        const msgErrorEmail = document.querySelector('.msg-error--email');

        inputEmail.classList.remove('validation-error');

        if (msgErrorEmailPassword) {
            msgErrorEmailPassword.style.display = "none"
        }

        if (msgErrorEmail) {
            msgErrorEmail.style.display = "none"
        }

    }, [email]);

    useEffect(() => {
        const inputPassword = document.querySelector('#password');
        const msgErrorPassword = document.querySelector('.msg-error--password');

        inputPassword.classList.remove('validation-error');

        if (msgErrorPassword) {
            msgErrorPassword.style.display = "none"
        }

    }, [password]);


    async function handleSubmit(e) {

        const msgErrorEmailPassword = document.querySelector('.msg-error--email-password');
        const msgErrorEmail = document.querySelector('.msg-error--email');
        const msgErrorPassword = document.querySelector('.msg-error--password');

        if (msgErrorPassword) {
            msgErrorPassword.style.display = "none"
        }
        if (msgErrorEmailPassword) {
            msgErrorEmailPassword.style.display = "none"
        }
        if (msgErrorEmail) {
            msgErrorEmail.style.display = "none"
        }

        const inputEmail = document.querySelector('#email');
        const inputPassword = document.querySelector('#password');
        var msgError = document.createElement('p');


        e.preventDefault();

        if (!email && !password) {
            inputEmail.classList.add('validation-error');
            inputPassword.classList.add('validation-error');
            msgError.textContent = 'Preencha email e senha.'
            msgError.classList.add('msg-error--email-password')
            inputEmail.insertAdjacentElement('afterend', msgError);
        }

        if (email && !password) {
            inputPassword.classList.add('validation-error');
            msgError.textContent = 'Preencha sua senha'
            msgError.classList.add('msg-error--password')
            inputEmail.insertAdjacentElement('afterend', msgError);
        }

        if (!email && password) {
            inputEmail.classList.add('validation-error');
            msgError.textContent = 'Preencha seu email'
            msgError.classList.add('msg-error--email')
            inputEmail.insertAdjacentElement('afterend', msgError);
        }
        if (email && password) {

            await api.get('/user', {
                headers: {
                    email: email, password: password
                }
            })
                .then(function (response) {
                    const user = response.data;
                    dispatch({ type: 'ADD_TOKEN', payload: user.token })
                    dispatch({ type: 'ADD_USER', payload: user.user })
                    history.push(`/main`);
                })
                .catch(function (error) {

                    if (error.response) {
                        console.log('aff')
                        msgError.textContent = error.response.data.error
                        msgError.classList.add('msg-error--email-password')
                        inputEmail.insertAdjacentElement('afterend', msgError);

                    } else {
                        console.log('aff')
                        console.log('Error', error.message);
                    }
                });
        }
    }

    return (
        <div className="container-login">
            <div className="box-login">
                <header className="logo-login">
                    <img src={logo} alt='a' width='70px' />
                    <label>mtFree</label>
                </header>
                <form className="form-login" onSubmit={handleSubmit}>
                    <input
                        className="form-login__input" id="email"
                        type="text"
                        placeholder="Email"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="form-login__input" id="password"
                        type="password"
                        placeholder="Password"
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <button className="form-login__button" type="submit">Enviar</button>
                    <div className="b">No account? <Link to="/create-user" className="create-now">Create now</Link></div>
                </form>
            </div>
        </div>
    )
}