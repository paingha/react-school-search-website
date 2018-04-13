import React, {Component} from 'react'
import AccountDropdown from './user_box'
import {User, ChevronDown} from 'react-feather'

export default class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.clickNext = this.clickNext.bind(this);
        this.clickBack = this.clickBack.bind(this);
    }

    clickNext() {
        document.getElementById('dropDown').classList.replace("account_dropdown", "account_dropdown_display");
        this.setState({
            open: true
        })
    }

    clickBack() {
        document.getElementById('dropDown').classList.replace("account_dropdown_display", "account_dropdown");
        this.setState({
            open: false
        })
    }
    render(){
        let navBlock;
        let loginBlock;
        let dropdownBlock;
        let { open } = this.state
        if(localStorage.token == null){
            navBlock = (
                <a className="navbar-btn" href="/register">Get Started</a>
            )
        }
        else{
            navBlock = (
                <span>
                    {open == false ? <button className="navbar-btn aligner" onClick={this.clickNext}><User className="user-icon"/> <span className="user-info">Account</span><ChevronDown className="user-chevron-down-icon"/></button> : <button className="navbar-btn aligner" onClick={this.clickBack}><User className="user-icon"/> <span className="user-info">Account</span><ChevronDown className="user-chevron-down-icon"/></button>}
                </span>
            )
        }
        if(localStorage.token != null){
            dropdownBlock = (
                <ul id="dropDown" className="account_dropdown">
                    <li><a href="/profile">My Profile</a></li>
                    <li><a href="#">Saved</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            )
        }
       
        if(localStorage.token == null){
            loginBlock = (
                <li><a href="/login" className="white">Login</a></li>
            )
        }
        else{
            loginBlock = (
                <li></li>
            )
        }
        return(
            <div className="navbar navbar-transparent">
                                <div className="container">
                                  <div className="navbar-header">
                                   
                                    <a className="navbar-brand" href="#"><img src="./img/logo.svg" className="logoImg"/></a>
                                  </div>
         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                   <li>
                      <a href="/" className="white">Home</a>
                   </li>
                   <li><a href="#" className="white">About US</a></li>
                   <li><a href="#" className="white">GPA Calculator</a></li>
                   <li><a href="#" className="white">School Search</a></li>
                   <li><a href="#" className="white">Scholarship Search</a></li>
                   { loginBlock }
                   <li>
                   { navBlock }  
                   { dropdownBlock }                            
                   </li>
                </ul>
             </div>
                </div>
                </div>
        );
    }
}