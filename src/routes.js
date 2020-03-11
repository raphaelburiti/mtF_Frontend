import React from 'react'
import {useSelector} from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Login from '../src/pages/Login';
import Main from '../src/pages/Main';
import CreateUser from '../src/pages/CreateUser';
import EditUser from '../src/pages/EditUser';

export default function Routes() {

    const { token } = useSelector(state => state.userSection)

    return (
        <BrowserRouter>
        
            <Route path="/" exact component={Login} />
            <Route path="/create-user" component={CreateUser} />
       
            {/* <Route path="/main" component={Main} />
            <Route path="/edit" component={EditUser} /> */}

            { token ?
            <>
                <Route path="/main" component={Main} />
                <Route path="/edit" component={EditUser} />
            </> 
            : <Redirect to="/" />
            }
        </BrowserRouter>
    )
}