import React, {Component} from 'react'
import Navbar from '../shared/navbar'
//import {connect} from 'react-redux';
import settings from '../../settings'
import {ProfileTabs} from './profile'

export class ProfileTransactions extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        return(
            <div>
            <div className="row">
            <section className="profile-section">
                     <Navbar />  
                    
                    <div className="row-fluid hero-box">
                        <div className="col-md-12">
                            <div className="headline-box">
                            <h1 className="home-headline">Welcome Joe </h1>
                             
                            </div>
                        </div>
                        <div className="col-md-6">

                            </div>
                        </div>
                    
                </section>
                
                </div>
                <div className="row">
                <section className="profile-section-2">
                <div className="story-box">
                <div className="row">
                              <div className="col-md-4 col-sm-12">
                              <div className="col-spaced box profile-box">
                              <div className="profile-img">
                                <div className="profile-img-tag">
                                <img src="https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzQzMTY2NDc4/will-smith-9542165-1-402.jpg" className="profile-image"/>
                                </div>
                              </div>
                              <div className="profile-sub-box">
                                    <p className="story-paragraph">
                                    
                                    Personalize your evaluated GPA to search for schools you might qaspiring to study.</p>
                                </div>
                                   </div></div>

                                <div className="col-md-8 col-sm-12">
                              <div className="col-spaced box">
                              <ProfileTabs />
                                    <p className="story-paragraph">Personalize your evaluated GPA to search for schools you might qaspiring to study thereualify for and the opportunities abound. Search schools based on your GPA</p>
                                   
                                   </div></div>
                        </div>
                        </div>
                </section>
                </div>  
                </div>
        );
    }
}

/*function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(ProfileTransactions);*/