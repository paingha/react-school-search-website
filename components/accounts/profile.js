import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import ProfileBox from '../shared/profile_box'
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import settings from '../../settings'
import {ShoppingCart} from 'react-feather'


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
            user: null,
            FirstName: '',
            LastName: '',
            Criteria: '',
            Level: '',
            ApplicantCountry: '',
            ScholarshipCountry: '',
            Gpa: '',
            error: null,
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
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, user: data})
            )
        }
    }
    

    componentDidMount() {
        this.fetchUser(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        }
    }

    /*doUpdate(token, user_id) {
        const {firstName, lastName, gpa, criteria, level, applicantCountryId, scholarshipCountryId} = this.state;
        this.setState({fetching: true, error: undefined});
        return fetch(settings.urls.update_user.replace('{user_id}', user_id ), {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, gpa, criteria, level, applicantCountryId, scholarshipCountryId})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.setState({fetching: false, error: undefined/*, registered: true});
            })
            .catch(error=>this.setState({fetching: false, error: error.message}));
        
    }*/

    render(){
        if(!this.state.user){
            return <div> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Loading...</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="profile-section-2">
                    <div className="story-box">
                        <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                    
                                    <div>Loading</div>
                                    
                                    </div>
                        </div>
                    </div>
                </section>
            </div> 
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
            level,
            major,
            saved,
            scholarshipCountry,
            updatedAt
        } = this.state.user;

        
            return <div> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Welcome {firstName} {lastName}</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="profile-section-2">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-4 col-sm-12">
                                    <ProfileBox userData={this.state.user} />
                        </div>
                                    <div className="col-md-8 col-sm-12">
                                    
                                    <div className="col-spaced box">
                                    <ProfileTabs />
                                    <div className="row">
                                        <div className="col-md-6">
                                        <input type="text" placeholder="First Name" className="register-input"
                                        value={firstName} onChange={e=>this.setState({FirstName: e.target.value})}/>
                                        </div>
                                        <div className="col-md-6">
                                        <input type="text" placeholder="Last Name" className="register-input"
                                        value={lastName} onChange={e=>this.setState({LastName: e.target.value})}/>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                        <input type="text" placeholder="Criteria" className="register-input"
                                        value={criteria} onChange={e=>this.setState({Criteria: e.target.value})}/>
                                        </div>
                                        <div className="col-md-6">
                                        <input type="text" placeholder="Level" className="register-input"
                                        value={level} onChange={e=>this.setState({Level: e.target.value})}/>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-6">
                                        <input type="text" placeholder="Applicant Country" className="register-input"
                                        value={applicantCountry} onChange={e=>this.setState({ApplicantCountry: e.target.value})}/>
                                        </div>
                                        <div className="col-md-6">
                                        <input type="text" placeholder="Scholarship Country" className="register-input"
                                        value={scholarshipCountry} onChange={e=>this.setState({ScholarshipCountry: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <input type="text" placeholder="GPA" className="register-input"
                                        value={gpa} onChange={e=>this.setState({Gpa: e.target.value})}/>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <button className="navbar-btn aligner"><span className="user-info">Update Profile</span></button>
                                    </div>
                                    <div className="col-md-6">
                                    <button className="navbar-btn aligner"><span className="user-info">View Matches</span></button>
                                    </div>
                                    </div>
                                    </div>

                                    </div>
                        </div>
                    </div>
                </section>
            </div> 
        </div>   
        
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(Profile);