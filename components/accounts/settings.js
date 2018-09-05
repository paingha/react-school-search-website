import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import {connect} from 'react-redux';
import settings from '../../settings'
import {ProfileTabs} from './profile'
import ProfileBox from '../shared/profile_box'
import {MobileSidebar} from '../shared/mobile_sidebar'
import ReferBox from '../shared/refer_box'
import {ShoppingCart} from 'react-feather'
import {toastr} from 'react-redux-toastr'
export class ProfileSettings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            user: null,
            isloading: false,
        };
        this.refreshImg = this.refreshImg.bind(this);
        
    }

    refreshImg(e){
        //console.log(e)
        this.setState({update: e}, ()=>{
        this.fetchUser(localStorage.token, this.props.user_id);
    })
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

    doChange(){
        const {oldPassword, newPassword, isloading} = this.state;
        this.setState({isloading: true}, ()=>{
            
            //console.log(JSON.stringify({firstName, lastName, gpa, criteria, level, major, applicantCountry, scholarshipCountry}))
        return fetch(settings.urls.change_password.replace('{user_id}', this.props.user_id ), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({oldPassword, newPassword})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error){
                    throw Error(json.error.message || 'Unknown fetch error');
                    toastr.error('Error!', 'An error occured, please try again')
                }
                this.setState({isloading: false}, ()=>{
                    toastr.success('Success!', 'Password Updated Successfully')
                });
            })
            .catch(error=>this.setState({isloading: false}));
        })
    
    }
    render(){
        const { oldPassword, newPassword } = this.state
        
            if(!this.state.user){
            return <React.Fragment>
            <div className="row">
            <section className="profile-section">
                     <Navbar />  
                     <MobileSidebar />
                    <div className="row-fluid hero-box">
                        <div className="col-md-12">
                            <div className="headline-box">
                            <h1 className="home-headline">Loading </h1>
                             
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
                </div>
                </div>
                <div className="profile-sub-box">
                    <div className="story-paragraph">
                        <br/>
                        <div className='text-input__loading--line3'></div>
                        <br/>
                        </div>
                        <a href="/buy_coin"><button className="navbar-btn aligner"><ShoppingCart className="user-chevron-down-icon"/><span className="user-info">Buy Coins</span></button></a>
                                    
                </div>
                </div>
                </div>
                                <div className="col-md-8 col-sm-12">
                              <div className="col-spaced box">
                              <ProfileTabs />
                              
                                <div className='text-input__loading--line3'></div>
                                <div className='text-input__loading--line3'></div>
                                <div className='text-input__loading--line3'></div>
                                <div className='text-input__loading--line3'></div>
                                <div className='text-input__loading--line3'></div>
                                <div className='text-input__loading--line3'></div>
                                   </div></div>
                        </div>
                        </div>
                </section>
                </div>  
                </React.Fragment>
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
        let { referrals, resultCount } = this.state;
        return <React.Fragment>
        <div className="container-fluid">
        <div className="row">
            <section className="profile-section">
                     <Navbar />  
                     <MobileSidebar />
                    <div className="row-fluid hero-box">
                        <div className="col-md-12">
                            <div className="headline-box">
                            <h1 className="home-headline">Welcome {firstName} {lastName} </h1>
                             
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
                             <ProfileBox userData={this.state.user} getUpdateImg={this.refreshImg}/>
                             <ReferBox userData={this.state.user} />
                </div>
                                <div className="col-md-8 col-sm-12">
                              <div className="col-spaced box">
        
                              <ProfileTabs />
                              <div className="row">
                                        <div className="col-md-6">
                                        <span className="major-select"><input placeholder="Current Password" className="textInput" type="password" value={oldPassword} onChange={e=>this.setState({oldPassword: e.target.value})}/></span>
          
                                        </div>
                                        <div className="col-md-6">
                                        <span className="major-select"><input placeholder="New Password" className="textInput" type="password" value={newPassword} onChange={e=>this.setState({newPassword: e.target.value})}/></span>
          
                                        </div>
                                    </div>
                                    <button className="navbar-btn aligner" onClick={()=>this.doChange()}><span className="user-info">Change Password</span></button>
                                    
                                   </div></div>
                        </div>
                        </div>
                </section>
                </div> 
                </div>
                <Footer />
        </React.Fragment>
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(ProfileSettings);