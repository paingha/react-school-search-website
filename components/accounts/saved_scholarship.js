import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import ProfileBox from '../shared/profile_box'
import {MobileSidebar} from '../shared/mobile_sidebar'
import ReferBox from '../shared/refer_box'
import ScholarshipPopup from '../shared/scholarship_popup'
import {connect} from 'react-redux';
import settings from '../../settings'
import {ProfileTabs} from './profile'
import {ShoppingCart} from 'react-feather'
import Pagination from "react-js-pagination";
import {Search, DollarSign, Calendar, Edit, Lock, Heart, Check, X} from 'react-feather'
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';
export class SavedScholarship extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            transactions: [],
            isloading: false,
            offset: 0,
            activePage: 1,
            resultCount: 0,
            opened: false,
            id: 0
        };
        this.OpenModal = this.OpenModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(x){
        this.setState({opened: x})
    }
    OpenModal(param) {
        this.setState({ opened: true, id: param }, ()=>{
            //this.getMore(param)
        });
        
      };
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
    
    UnSave(e) {        
        let scholarship_id = e;        
        let {id, savedID} = this.state.user
        //let saved_ID = savedID
        //saved_ID.push(parseInt(scholarship_id))
        return fetch(settings.urls.unsave_scholarship.replace('{user_id}', id), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({scholarship_id})
        })
        .then(
            response => response.json()
        )
        .then(
            data => {                
                this.setState({isloading: false}, ()=>{
                    this.fetchUser(localStorage.token, this.props.user_id);
                })
        }
        )
    }
    componentDidMount() {
        this.fetchUser(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        }
    }
    render(){
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
                    <img src="/img/user-img.png" className="profile-image"/>
                </div>
                </div>
                <div className="profile-sub-box">
                    <p className="story-paragraph">
                        <br/>
                        <div className='text-input__loading--line3'></div>
                        <br/>
                        </p>
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
                <section className="profile-section-3">
                <div className="story-box">
                <div className="row">
                <div className="col-md-4 col-sm-12">
                             <ProfileBox userData={this.state.user}/>
                             <ReferBox userData={this.state.user} />
                </div>
                                <div className="col-md-8 col-sm-12">
                              <div className="col-spaced box1">
                              <ProfileTabs />
                              <React.Fragment>
                                {saved.map((save, id)=>
                                <div className="row">
                                <div key={save.id} className="col-md-12 col-sm-12">
                                <div className="col-spaced box-smaller">
                                <div onClick={this.UnSave.bind(this, `${save.id}`)} className="ribbon-wrapper-unsave"><div className="ribbon-unsave"><X className="heart-icon"/> <span className="unsave-info">UNSAVE</span></div></div>
                                <div className="row">
                                    <div className="col-md-5">
                                    <h3 className="word-wrap"><TextTruncate
                                        line={3}
                                        truncateText="…"
                                        text={save.name}
                                    /></h3>
                                    </div>
                                    <div className="col-md-2">
                                    <div className="aligner">
                                    <span className="search-info"><h3>{save.amount}</h3></span></div>
                                    </div>
                                    <div className="col-md-5">
                                    <div className="aligner"><Calendar className="date-icon" />
                                    <span className="search-info"><h3>
                                    { save.deadline !== null ?
                                        
                                        <Moment parse="D/MMM/YYYY" format="MMMM Do">
                                        {save.deadline}
                                        </Moment> :
                                        <span>N/A</span>
                                    }  
                                    </h3></span></div>
                                    </div>
                                </div>
                                
                                <div className="row search-push-down">
                                    <div className="col-md-2">
                                    <h4>{save.criteria}</h4>
                                    </div>
                                    <div className="col-md-2">
                                    <h4>{save.applicantCountry}</h4>
                                    </div>
                                    <div className="col-md-1">
                                    
                                    </div>
                                    <div className="col-md-3">
                                   
                                    </div>
                                    <div className="col-md-4">
                                    <button className="search-btn aligner" onClick={this.OpenModal.bind(this, `${save.id}`)}><Edit className="user-icon"/> <span className="user-info">View More</span></button> 
                                    </div>
                                </div>
                                
                                </div>

                                </div>
                    </div>
                                )}
                            </React.Fragment>
                            
                                   </div></div>
                        </div>
                        </div>
                </section>
                </div>  
                <ScholarshipPopup open={this.state.opened} scholarship_id={this.state.id} getInput={this.handleClose}/>
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

export default connect(mapper)(SavedScholarship);