import React, { useState } from 'react'

import api from '../../services/api';

import './styles.css'

export default function CreateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [address, setAddress] = useState('')
    const [cep, setCep] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        if (password === passwordConfirm && name && email && address && cep) {
            await api.post('/user', {
                name: name,
                email: email,
                password: password,
                address: address + ' - ' + cep
            })
            .then(() => {
                // window.location.replace("https://front-click.herokuapp.com/");
                window.location.replace('http://localhost:3000/')
            })
            .catch(() => {
                alert('deu erro')
            })
        } else {
            alert('Preencha todos os campos')
        }
    }

    return (
        <>
            <div className="container-create">
                <div className="box-create">
                    <header className="box-create__header">Cadastre-se grátis</header>
                    <form className="box-create__form" onSubmit={handleSubmit}>
                        <label className="box-create__label">Nome Completo</label>
                        <input className="box-create__input" placeholder="José da Silva"
                            onChange={e => setName(e.target.value)} />
                        <label className="box-create__label">Email</label>
                        <input className="box-create__input" placeholder="jose.silva@hotmail.com"
                            onChange={e => setEmail(e.target.value)} />
                        <label className="box-create__label">Senha</label>
                        <input className="box-create__input" type="password"
                            onChange={e => setPassword(e.target.value)} />
                        <label className="box-create__label">Confirme Senha</label>
                        <input className="box-create__input" type="password"
                            onChange={e => setPasswordConfirm(e.target.value)} />
                        <label className="box-create__label">Endereço</label>
                        <input className="box-create__input" placeholder="Rua José da Silva nº 513"
                            onChange={e => setAddress(e.target.value)} />
                        <label className="box-create__label">Cep</label>
                        <input className="box-create__input" placeholder="049502-030"
                            onChange={e => setCep(e.target.value)} />
                        <button className="box-create__button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}