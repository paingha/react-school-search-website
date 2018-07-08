import React, {Component} from 'react'
import {ShoppingCart} from 'react-feather'
//import {connect} from 'react-redux';
//import settings from '../../settings'

export default class ReferBox extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
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
        return <div className="col-spaced box refer-box">
                
                <div className="profile-sub-box">
                <p className="gpa-result">Refer A Friend</p>    
                <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`https://www.facebook.com/sharer/sharer.php?u=https://theacademist.herokuapp.com/register?ref=${referralCode}`}>
            <img src="/img/facebook_icon.svg" className="footerImg" width="42px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`https://www.twitter.com/intent/tweet?url=https://theacademist.herokuapp.com/register?ref=${referralCode}&via=TWITTER_HANDLE_HERE&text="I just found scholarships on The Academist"`}>
            <img src="/img/twitter_icon.svg" className="footerImg" width="42px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`http://www.linkedin.com/shareArticle?mini=true&url=https://theacademist.herokuapp.com/register?ref=${referralCode}&title="I just found scholarships on The Academist"&source="The Academist"`}>
            <img src="/img/linked_in.svg" className="footerImg" width="42px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href={`whatsapp://send?text="I just found scholarships on The Academist - https://theacademist.herokuapp.com/register?ref=${referralCode}"`}>
            <img src="/img/whatsapp_icon.svg" className="footerImg" width="42px"/>
            </a>&nbsp; 
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.linkedin.com">
            <img src="/img/mail_icon.svg" className="footerImg" width="42px"/>
            </a>           
                </div>
                </div>
        
    }
}
