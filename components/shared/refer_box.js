import React, {Component} from 'react'
import {ShoppingCart} from 'react-feather'
//import {connect} from 'react-redux';
//import settings from '../../settings'
import InvitePopup from './invite-popup';

export default class ReferBox extends Component{
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
        if (!this.props.userData){
               return <div>
                    <h1>Loading</h1>
                </div>
            
        }
        let {
            applicantCountry,
            coin,
            createdAt,
            criteria,
            email,
            emailVerified,
            firstName,
            gpa,
            id,
            isActive,
            isAdmin,
            isDisabled,
            lastName,
            referralToken,
            referralCode,
            level,
            major,
            saved,
            scholarshipCountry,
            updatedAt
        } = this.props.userData;
        let name = `${firstName} ${lastName}`
        return <div className="col-spaced box refer-box">
                
                <div className="profile-sub-box">
                <p className="gpa-result">Refer a Friend. Get Rewarded!</p>    
                <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`https://www.facebook.com/sharer/sharer.php?u=https://theacademist.herokuapp.com/register?ref=${referralCode}`}>
            <img src="/img/facebook_icon.svg" className="footerImg" width="42px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`https://www.twitter.com/intent/tweet?url=https://theacademist.herokuapp.com/register?ref=${referralCode}&via=the_academist&text="I just found scholarships on The Academist"`}>
            <img src="/img/twitter_icon.svg" className="footerImg" width="42px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`http://www.linkedin.com/shareArticle?mini=true&url=https://theacademist.herokuapp.com/register?ref=${referralCode}&title="I just found scholarships on The Academist"&source="The Academist"`}>
            <img src="/img/linked_in.svg" className="footerImg" width="42px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`whatsapp://send?text="I just found scholarships on The Academist - https://theacademist.herokuapp.com/register?ref=${referralCode}"`}>
            <img src="/img/whatsapp_icon.svg" className="footerImg" width="42px"/>
            </a>&nbsp; 
            <span className="social-icon pointer" onClick={this.OpenModal}>
            <img src="/img/mail_icon.svg" className="footerImg" width="42px"/>
            </span>           
                </div>
                <InvitePopup referralLink={referralCode} from={email} name={name} open={this.state.opened} getInput={this.handleClose}/>
                </div>
        
    }
}
