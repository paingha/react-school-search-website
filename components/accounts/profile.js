import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import settings from '../../settings'

const ProfileTab = withRouter(function (props) {
    let {name} = props;
    if (props.link == location.pathname)
        name = <span className="current">{name}</span>;
    return <span onClick={()=>props.history.push(props.link)}
                 className="tab">{name}</span>;
});

export class ProfileTabs extends Component {
    render() {
        return (
            <div className="row tabs-row">
                <ProfileTab link="/profile" name="Profile"/>
                <ProfileTab link="/profile/transactions"name="Transactions"/>
                <ProfileTab link="/profile/saved" name="Saved Scholarships"/>
                <ProfileTab link="/profile/settings" name="Settings"/>
                <ProfileTab link="/profile/referrals" name="Referrals"/>
            </div>
        );
    }
}

export class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            users: [],
        };

    }
    fetchUser(token, user_id) {
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.get_user.replace('{user_id}', user_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
                .then(response => response.json())
                .then(data => this.setState({ isloading: false, users: data }, ()=>{console.log(this.state.users.firstName);}))
                
        }
        
    }

    componentDidMount() {
        this.fetchUser(localStorage.token, this.props.user_id);
        
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && this.state.users.length == 0) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        }
    }
    render(){
        let profileBlock;
        
        /*if (this.state.users.length == 0){
            //no info
            profileBlock = (
            <div>
                <h3>loading</h3>
            </div>
            )
        }
        else{
            profileBlock = (
            <div>
                
            </div>
                /*<div className="row">
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
                                        <p className="story-paragraph">
                                        Joe
                                        </p>
                                       </div></div>
                            </div>
                            </div>
                    </section>
                    </div>  
                    </div>
        

            )}
            */
        return(
            //begin user map
            //{profileBlock}
            <p>Loading</p>
                //end user map here
        );
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(Profile);