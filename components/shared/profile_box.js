import React, {Component} from 'react'
import {ShoppingCart, User} from 'react-feather'
import UploadPopup from './upload-popup';
//import {connect} from 'react-redux';
//import settings from '../../settings'

export default class ProfileBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            opened: false,
        }
        this.onOpenModal = this.onOpenModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onUpdateImg = this.onUpdateImg.bind(this);
    }
    onOpenModal() {
        this.setState({ opened: true });
      };
    
      handleClose(x){
        this.setState({opened: x})
    };
    onUpdateImg() {
        this.props.getUpdateImg(true); 
      };
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
            level,
            major,
            saved,
            scholarshipCountry,
            image,
            updatedAt
        } = this.props.userData;
        return <div className="col-spaced box profile-box">
                <div className="profile-img">
                <div className="profile-img-tag">
                    <img src={image} className="profile-image"/>
                    <div className="overlay">
                    <span className="icon">
                    <button className="navbar-btn aligner" onClick={this.onOpenModal}><User className="user-chevron-down-icon"/><span className="user-info">Change Profile Picture</span></button>
                    </span>
                    </div>
                </div>
                </div>
                <div className="profile-sub-box">
                    <p className="story-paragraph">
                    You have {referralToken} referral Points
                    <br/>
                    { referralToken < 3 ?
                        <a href="/get_reward">Redeem Points</a>
                        : null
                    }
                        <br/>
                        You have {coin} coins
                        <br/>
                        </p>
                        <a href="/buy_coin"><button className="navbar-btn aligner"><ShoppingCart className="user-chevron-down-icon"/><span className="user-info">Buy Coins</span></button></a>
                                    
                </div>
                <UploadPopup image={image} userId={id} open={this.state.opened} onUpdating={this.onUpdateImg} getInput={this.handleClose}/>
                
                </div>
        
    }
}

/*function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(ProfileBox);*/