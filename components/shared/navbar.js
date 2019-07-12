import React, {Component} from 'react'
import AccountDropdown from './user_box'
import {User, ChevronDown} from 'react-feather'

export default class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            more: false,
            opened: false
        }
        this.clickMore = this.clickMore.bind(this);
        this.clickNomore = this.clickNomore.bind(this);
        this.clickNext = this.clickNext.bind(this);
        this.clickBack = this.clickBack.bind(this);
        this.clickOpen = this.clickOpen.bind(this);
        this.clickBacked = this.clickBacked.bind(this);
    }

    clickNext() {
        document.getElementById('dropDown').classList.replace("account_dropdown", "account_dropdown_display");
        this.setState({
            open: true
        })
    }
    clickOpen() {
        document.getElementById('more-dropDown').classList.replace("account_dropdown", "account_dropdown_display");
        this.setState({
            opened: true
        })
    }
    clickMore(){
        document.getElementById('more-dropDown').classList.replace("account_dropdown", "account_dropdown_display");
        this.setState({
            more: true
        })
    }
    clickNomore() {
        document.getElementById('more-dropDown').classList.replace("account_dropdown_display", "account_dropdown");
        this.setState({
            more: false
        })
    }
    clickBack() {
        document.getElementById('dropDown').classList.replace("account_dropdown_display", "account_dropdown");
        this.setState({
            open: false
        })
    }
    clickBacked() {
        document.getElementById('more-dropDown').classList.replace("account_dropdown_display", "account_dropdown");
        this.setState({
            opened: false
        })
    }
    render(){
        let navBlock;
        let loginBlock;
        let dropdownBlock;
        let moreBlock
        let { open, more, opened } = this.state
        if(localStorage.token == null){
            navBlock = (
                <a className="navbar-btn aligner" href="/login">Login</a>
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
                    <li><a href="/profile/saved">Saved</a></li>
                    <li><a href="/profile/settings">Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            )
        }
       
        if(localStorage.token == null){
            loginBlock = (
                <ul id="more-dropDown" className="account_dropdown">
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/forum">Forum</a></li>
                </ul>
            )
        }
        else{
            loginBlock = (
                <ul id="more-dropDown" className="account_dropdown">
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/forum">Forum</a></li>
                </ul>
            )
        }
        moreBlock = (
            <ul id="dropDown" className="account_dropdown">
            <li><a href="/blog">Blog</a></li>
            <li><a href="/forum">Forum</a></li>
        </ul>
        )
        if (localStorage.token == null){
        return <div className="navbar navbar-transparent">
                                <div className="container">
                                  <div className="navbar-header">
                                  
                                    <a className="navbar-brand" href="#"><img src="https://www.theacademist.com/img/logo.svg" className="logoImg"/></a>
                                  </div>
         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                   <li>
                      <a href="/" className="white">Home</a>
                   </li>
                   <li><a href="/about_us" className="white">About Us</a></li>
                   <li><a href="/gpa-calculator" className="white">GPA Calculator</a></li>
                   <li><a href="/school-search" className="white">School Search</a></li>
                   <li><a href="/scholarship-search" className="white">Scholarship Search</a></li>
                   <li><a href="/admission-processing" className="white">Admissions</a></li>
                   <li>
                   {opened == false ? <a className="white pointer" onClick={this.clickOpen}><span  className="more-icon">More&nbsp;<ChevronDown/></span></a>: <a className="white pointer" onClick={this.clickBacked}><span  className="more-icon">More&nbsp;<ChevronDown/></span></a>}
                   { loginBlock }
                   </li>
                   <li>
                   { navBlock }  
                   { dropdownBlock }                            
                   </li>
                </ul>
             </div>
                </div>
                </div>
        }
        else{
            return <div className="navbar navbar-transparent">
                                <div className="container">
                                  <div className="navbar-header">
                                  
                                    <a className="navbar-brand" href="#"><img src="https://www.theacademist.com/img/logo.svg" className="logoImg"/></a>
                                  </div>
         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right added-top">
                   <li>
                      <a href="/" className="white">Home</a>
                   </li>
                   <li><a href="/about_us" className="white">About Us</a></li>
                   <li><a href="/gpa-calculator" className="white">GPA Calculator</a></li>
                   <li><a href="/school-search" className="white">School Search</a></li>
                   <li><a href="/scholarship-search" className="white">Scholarship Search</a></li>
                   <li><a href="/admission-processing" className="white">Admissions</a></li>
                   <li>
                   {opened == false ? <a className="white pointer" onClick={this.clickOpen}><span  className="more-icon">More&nbsp;<ChevronDown/></span></a>: <a className="white pointer" onClick={this.clickBacked}><span  className="more-icon">More&nbsp;<ChevronDown/></span></a>}
                   { loginBlock }
                   </li>
                   <li>
                   { navBlock }  
                   { dropdownBlock }                            
                   </li>
                </ul>
             </div>
                </div>
                </div>
        }
    }
}