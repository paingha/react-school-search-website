import React, {Component} from 'react'
import ContactPopup from './contact-popup';

export default class Footer extends Component{
  constructor(props){
    super(props);
    this.state = {
        opened: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.OpenModal = this.OpenModal.bind(this);
}
OpenModal() {
    this.setState({ opened: true}, ()=>{
        //this.getMore(param)
    });
    
  };
handleClose(x){
    this.setState({opened: x})
}
    render(){
        return(
            
  <div className="container-fluid footer-container">
  
    <div className="row-fluid footer-row">
      <div className="col-sm-4 first-section">
        <ul className="new-homepage-footer-links">
          <h4>About Us:</h4>
        
          <strong>The Academist</strong> is an educational resource center providing information for international students looking to go abroad to further their studies.
          <hr className="horizontal-bar"/>
          <strong>Our Mission:</strong> to be a reliable host where students (future leaders) are empowered with adequate information that helps shape their academic careers outstandingly.
        
        </ul>
      </div>
      <div className="col-sm-2 third-section">
        <ul className="new-homepage-footer-links">
          <h4>Company</h4>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/admission-processing">Admission Processing</a>
          </li>
          <h4>Learn</h4>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="/forum">Forum</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="/blog">Blog</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-3">
        <ul className="new-homepage-footer-links">
        <h4>Resources</h4>
          <li>
            <a href="/scholarship-search">Scholarships</a>
          </li>
          <li>
            <a href="/school-search">Schools By Major</a>
          </li>
          <li>
            <a href="/school-search/by-gpa">Schools by Gpa</a>
          </li>
          <h4>Legal</h4>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-use">Terms of Use</a>
          </li>
          <li>
            <a href="/disclaimer">Disclaimer</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-3">
        <ul className="new-homepage-footer-links">
          <h4>Get in touch</h4>
          <li>We're here if you need us:</li>
          <li>
          <span className="pointer" onClick={this.OpenModal}>Contact us</span>
          </li>
          <li className="social-icons">
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.facebook.com/TheAcademistCommunity">
            <img src="/img/facebook_icon.svg" className="footerImg" width="32px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://twitter.com/the_academist">
            <img src="/img/twitter_icon.svg" className="footerImg" width="32px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.linkedin.com">
            <img src="/img/linked_in.svg" className="footerImg" width="32px"/>
            </a>
            
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12 new-homepage-footer-logo">
        
        <span>All rights reserved The Academist&trade; 2018</span>
      </div>
    </div>
    <ContactPopup open={this.state.opened} getInput={this.handleClose}/>
  </div>
        );
    }
}