import React, {Component} from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import jwtDecode from 'jwt-decode'

import {prepareStore} from './store';
import 'babel-polyfill';
import settings from './settings';
import {Router} from './router';
import ReduxToastr from 'react-redux-toastr'
import {errorLogin, receiveUser, requestUser} from './actions/user';


const token = localStorage.token;
const user = token ? jwtDecode(token) : null;
const store = prepareStore({
    user: {token, user}
});

// get use info if token present

if (token) {
    store.dispatch(requestUser());
    fetch(settings.urls.get_user.replace('{user_id}', user.id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    .then(response=>response.json())
    .then(json=>{
        if (json.error)
            throw new Error(json.error.message);
        store.dispatch(receiveUser(json));
    })
    .catch(error=>store.dispatch(errorLogin(error.message)))
    // .then(()=>
    // );
}

render(
    <Provider store={store}>
        <React.Fragment>
        <Router/>
        <ReduxToastr/>
        </React.Fragment>
    </Provider>,
    document.getElementById('app_home')
)

