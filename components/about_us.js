import React, {Component} from 'react'
import { render } from "react-dom";
import Navbar from './shared/navbar'
import Footer from './shared/footer'
import {Play} from 'react-feather'
import Modal from 'react-responsive-modal'
import Plyr from 'react-plyr';

export class AboutUs extends Component {
    render(){
        return(
            <div className="container-fluid"> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">About Us</h1>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="about-section">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-1 col-sm-12">

                        </div>
                                    <div className="col-md-10 col-sm-12">
                                    
                                    <div className="col-spaced box">
                                    <h2>Our Pride</h2>
                                   <p>– The only scholarship source service for international students –</p>
                                   <div className="row">
                                   <div className="col-md-4">
                                   <img src="/img/academist-logo-300x300.jpg" />
                                   </div>
                                   <div className="col-md-8">
                                   <p>At “The Academist” our biggest aim is to help the international students who plan on studying abroad in the US, and Canada with the necessary information. It is quite hard for students as they lack the know-how of how to change their GPA to the standard US and Canada grade as well as being able to match their GPA to the most appropriate university or school. We also provide scholarship information. Getting all this in one place is very hard for the students as they must search various sites to get the information and even then, they may not be accurate. </p>
                                   <p>The Academist ensures that all information provided is accurate. Most countries do not have the same system as the US, and Canada, and this is where we come in to help . Are you a high school student looking to acquire undergraduate study in the US or an undergraduate student intending to get your masters in the US, or Canada? Well, this is the place to get all the information you need.</p>
                                   <p>The Academist is all about providing a helping hand in the society therefore most of our services are free…</p>
                                    </div>
                                    </div>
                                    
                                    
                                    </div>

                                    </div>

                               <div className="col-md-1 col-sm-12">

                                </div>     
                        </div>
                    </div>
                </section>
            </div> 
            <Footer />
        </div>   
        );
    }
}