import React, {Component} from 'react';
import {User, EyeOff} from 'react-feather'
import Moment from 'react-moment';
import { Match, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import settings from '../../settings'

export default class NotLoggedin extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        //this.fetchUser(localStorage.token, this.props.user_id);
    }

    render(){
        return(
            <div className="container-fluid">
                
                
            <div className="row-fluid forum-new-comment-row">
            
              
    <div className="col-md-2">
    </div>
    
    <div className="col-md-8">
    <div className="col-spacings help-box">
   
    <div className="row article-sub-row">
    

    <div className="col-md-2"></div>
    <div className="col-md-10">

    <span className="content">
    <h2>Login to Post a Comment</h2>    </span><br/>
    <div className="row">

    <div className="col-md-6">
    <span className="forum-by"></span>
    <br/>
    
    </div>

    <div className="col-md-2"></div>
    <div className="col-md-4 forum-report"><a href="/login"><button className="getstarted-button">Login</button></a></div>

    </div>

    </div>
    </div>
    
    <div className="col-md-2">
    </div>
    </div>
        </div>
        
        <div className="col-md-2">
    </div>
    <div className="clearfix"></div>
    </div>  
       
    <div className="clearfix"></div>
    </div>
        );
    }
}
