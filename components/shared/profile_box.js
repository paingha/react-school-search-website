import React, {Component} from 'react'
import {ShoppingCart} from 'react-feather'
//import {connect} from 'react-redux';
//import settings from '../../settings'

export default class ProfileBox extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    /*componentDidMount() {
        this.fetchUser(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        }
    }

    fetchUser(token, user_id) {
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.get_user.replace('{user_id}', user_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => console.log(data)/*this.setState({isloading: false, user: data})
            )
        }
    }*/
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
            updatedAt
        } = this.props.userData;
        return <div className="col-spaced box profile-box">
                <div className="profile-img">
                <div className="profile-img-tag">
                    <img src="/img/user-img.png" className="profile-image"/>
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
                </div>
        
    }
}

/*function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(ProfileBox);*/