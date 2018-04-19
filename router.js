import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


import {App} from './components/app'
import {Home} from './components/home'
import {Pay} from './components/pay'
import {CheckoutForm} from './components/CheckoutForm'
import {Register} from './components/accounts/register'
import Profile from './components/accounts/profile'
import ProfileTransactions from './components/accounts/transactions'
import ScholarshipSearch from './components/search/scholarship-search'
import {ProfileSettings} from './components/accounts/settings'
import BuyCoin from './components/buy_coin'
import Login from './components/accounts/login'
import {Forgot} from './components/accounts/forgot'
import {Logout} from './components/accounts/logout'
import {ResetPassword} from './components/accounts/reset_password'
import {EmailConfirmed} from './components/accounts/email_confirmed'
const EmptyComponent = () => <div>Empty yet</div>;

const PrivateArea = connect(
    state=>({token: state.user.token})
)(
    props=>props.token ?
        props.children
        :
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }}/>
);


export const Router = props => (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/forgot" component={Forgot} />
        <Route path="/email_confirmed" component={EmailConfirmed}/>
        <Route path="/reset_password" component={ResetPassword}/>
        <PrivateArea>
            <App>
            <Route exact path="/profile" component={Profile}/>
            <Route path="/profile/transactions" component={ProfileTransactions} />
            <Route path="/profile/settings" component={ProfileSettings} />
            <Route path="/scholarship-search" component={ScholarshipSearch}/>
            <Route path="/pay" component={Pay}/>
            <Route path="/buy_coin" component={BuyCoin}/>
            <Route path="/paypal" component={CheckoutForm} />
            </App>
        </PrivateArea>

        </Switch>
    </BrowserRouter>
);