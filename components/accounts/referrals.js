import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import {MobileSidebar} from '../shared/mobile_sidebar'
import ProfileBox from '../shared/profile_box'
import ReferBox from '../shared/refer_box'
import {connect} from 'react-redux';
import settings from '../../settings'
import {ProfileTabs} from './profile'
import {ShoppingCart} from 'react-feather'
import Moment from 'react-moment';
import Pagination from "react-js-pagination";

export class ProfileReferrals extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            referrals: [],
            isloading: false,
            offset: 0,
            activePage: 1,
            resultCount: 0,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.refreshImg = this.refreshImg.bind(this);
        
    }

    refreshImg(e){
        //console.log(e)
        this.setState({update: e}, ()=>{
        this.fetchUser(localStorage.token, this.props.user_id);
    })
    }
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        //(n-1)15
        let mathStuff = pageNumber - 1;
        let multiplyStuff = mathStuff * 7;
        this.setState({activePage: pageNumber, offset: multiplyStuff }, ()=>{
            this.fetchTransactions(localStorage.token, this.props.user_id)
            window.scrollTo(0, 0);
        });
         
    }
    fetchReferrals(token, user_id){
        let {offset, resultCount} = this.state;
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.get_referrals.replace('{user_id}', user_id ), {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
                body: JSON.stringify({offset})
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, referrals: data.rows, resultCount: data.count})
            )
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
                data => this.setState({isloading: false, user: data})
            )
        }
    }
    

    componentDidMount() {
        this.fetchUser(localStorage.token, this.props.user_id);
        this.fetchReferrals(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
            this.fetchReferrals(localStorage.token, nextProps.user_id);
        }
    }
    render(){
        if(!this.state.user && this.state.referrals.length == 0){
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
                              <table className="table">
                                <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Referred On</th>
                                </tr>
                                </thead>
                                <tbody>
                                {referrals.map((referral, id)=>
                                <tr key={id} >
                                    <td>{referral.firstName}</td>
                                    <td>{referral.lastName}</td>
                                    <td>
                                    <Moment format="MMM Do, YYYY">
                                    {referral.createdAt}
                                    </Moment>
                                    </td>
                                </tr>

                                )}
                                </tbody>
                            </table>
                            {referrals.length > 0 ?
            <div className="row page-row">
            <div className="col-md-3"></div>
            <div className="col-md-6 pagination-col">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={7}
            totalItemsCount={resultCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
            />
            </div>
            <div className="col-md-3"></div>
            </div>
             : null }
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

export default connect(mapper)(ProfileReferrals);