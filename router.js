import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


import {App} from './components/app'
import {Home} from './components/home'
import {AboutUs} from './components/about_us'
import {CheckoutForm} from './components/CheckoutForm'
import {Register} from './components/accounts/register'
import Profile from './components/accounts/profile'
import GetStarted from './components/accounts/get_started'
import ProfileTransactions from './components/accounts/transactions'
import ScholarshipSearch from './components/search/scholarship-search'
import {SchoolSearch} from './components/search/school-search'
import {ByGpa} from './components/search/by-gpa'
import ProfileSettings from './components/accounts/settings'
import SavedScholarship from './components/accounts/saved_scholarship'
import BuyCoin from './components/buy_coin'
import RewardMe from './components/get_reward'
import Login from './components/accounts/login'
import {Forgot} from './components/accounts/forgot'
import {Logout} from './components/accounts/logout'
import {ResetPassword} from './components/accounts/reset_password'
import {EmailConfirmed} from './components/accounts/email_confirmed'
import {Forum} from './components/forum/forum'
import {GpaCalculator} from './components/gpa_calculator'
import {Application} from './components/application'
import {SingleForum} from './components/forum/single'
import {Blog} from './components/blog/blog'
import {SinglePost} from './components/blog/single-post'
import NewForum from './components/forum/new'
import NewBlog from './components/blog/new-blog'
import {PrivacyPolicy} from './components/legal/privacy-policy'
import {TOS} from './components/legal/terms-of-use'
import {Disclaimer} from './components/legal/disclaimer'
import ProfileReferrals from './components/accounts/referrals'
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
        <Route path="/about_us" component={AboutUs}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/forgot" component={Forgot} />
        <Route path="/email_confirmed" component={EmailConfirmed}/>
        <Route path="/reset_password" component={ResetPassword}/>
        <Route exact path="/blog" component={Blog} />
        <Route path="/blog/:blog_id/:topic" component={SinglePost} />
        <Route exact path="/forum" component={Forum} />
        <Route path="/forum/:topic/:forum_id" component={SingleForum} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/terms-of-use" component={TOS} />
        <Route exact path="/disclaimer" component={Disclaimer} />
        <Route path="/gpa-calculator" component={GpaCalculator} />
        <Route path="/admission-processing" component={Application} />
        <Route exact path="/school-search" component={SchoolSearch}/>
        <Route path="/school-search/by-gpa" component={ByGpa}/>
        <Route path="/scholarship-search" component={ScholarshipSearch}/>
        <PrivateArea>
        <Route path="/get-started" component={GetStarted} />
            <App>
            <Route exact path="/profile" component={Profile}/>
            <Route path="/profile/transactions" component={ProfileTransactions} />
            <Route path="/profile/settings" component={ProfileSettings} />
            <Route path="/profile/referrals" component={ProfileReferrals} />
            <Route path="/profile/saved" component={SavedScholarship} />
            <Route exact path="/get_reward" component={RewardMe} />
            <Route exact path="/buy_coin" component={BuyCoin}/>
            <Route path="/paypal" component={CheckoutForm} />
            <Route path="/new-forum" component={NewForum} />
            <Route path="/new-blog" component={NewBlog} />
            </App>
        </PrivateArea>
        </Switch>
    </BrowserRouter>
);
