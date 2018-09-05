import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import {MobileSidebar} from '../shared/mobile_sidebar'
import ProfileBox from '../shared/profile_box'
import ReferBox from '../shared/refer_box'
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import settings from '../../settings'
import {ShoppingCart} from 'react-feather'
import Select from 'react-select';
import {toastr} from 'react-redux-toastr'
const CRITERIAS = [
	{ label: 'Merit', value: 'Merit' },
    { label: 'Need', value: 'Need' }
];
const GPAS = [
    { label: '2.0', value: '2.0' },
    { label: '2.1', value: '2.1' },
    { label: '2.2', value: '2.2' },
    { label: '2.3', value: '2.3' },
    { label: '2.4', value: '2.4' },
    { label: '2.5', value: '2.5' },
    { label: '2.6', value: '2.6' },
    { label: '2.7', value: '2.7' },
    { label: '2.8', value: '2.8' },
    { label: '2.9', value: '2.9' },
    { label: '3.0', value: '3.0' },
    { label: '3.1', value: '3.1' },
    { label: '3.2', value: '3.2' },
    { label: '3.3', value: '3.3' },
    { label: '3.4', value: '3.4' },
    { label: '3.5', value: '3.5' },
    { label: '3.6', value: '3.6' },
    { label: '3.7', value: '3.7' },
    { label: '3.8', value: '3.8' },
    { label: '3.9', value: '3.9' },
    { label: '4.0', value: '4.0' }
];
const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const COUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
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
            majors: [],
            countries: [],
            firstName: '',
            lastName: '',
            criteria: '',
            level: '',
            applicantCountry: '',
            scholarshipCountry: '',
            gpa: '',
            major: '',
            error: null,
            update: false
        };
        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleApplicantCountryChange = this.handleApplicantCountryChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
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
        this.fetchCountries();
        this.fetchMajors();
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        }
    }

    doUpdate(token, user_id) {
        const {firstName, lastName, gpa, criteria, level, major, applicantCountry, scholarshipCountry, isloading} = this.state;
        const userStuff = this.state.user;
        if(firstName == '' && lastName == '' && gpa == '' && criteria == '' && level == '' && major == '' && applicantCountry == '' && scholarshipCountry == ''){
            toastr.error('Error!', 'No Changes made')
        }
        else{
        //async validate
        //Bug being called before setState
        
        this.setState({isloading: true}, ()=>{
            return fetch(settings.urls.update_user.replace('{user_id}', user_id ), {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, gpa, criteria, level, major, applicantCountry, scholarshipCountry})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error){
                    throw Error(json.error.message || 'Unknown fetch error');
                    toastr.error('Error!', 'An error occured, please try again')
                }
                this.setState({isloading: false}, ()=>{
                    toastr.success('Success!', 'Profile Updated Successfully');
                    this.fetchUser(localStorage.token, this.props.user_id);
                });
            })
            .catch(error=>this.setState({isloading: false}));

        })
        }
            
    }
    handleCountryChange (country) {
		//console.log('You\'ve selected:', country);
		this.setState({ country });
    }
    handleGpaChange (gpa) {
		//console.log('You\'ve selected:', gpa);
		this.setState({ gpa }, ()=>{
            //console.log(this.state.gpa)
        });
    }
    handleApplicantCountryChange(applicantCountry){
        this.setState({ applicantCountry });
    }
    handleCriteriaChange (criteria) {
		//console.log('You\'ve selected:', criteria);
		this.setState({ criteria }, ()=>{
            //console.log(this.state.criteria)
        });
    }
    handleLevelChange (level) {
        //console.log('You\'ve selected:', level);
        this.setState({ level });
    }
    handleMajorChange (major) {
		//console.log('You\'ve selected:', major);
		this.setState({ major }, ()=>{
            //console.log(this.state.major)
        });
    }
    handleCountryChange (scholarshipCountry) {
        //console.log('You\'ve selected:', scholarshipCountry);
        this.setState({ scholarshipCountry });
    }
    fetchMajors() {
        this.setState({isloading: true});
            fetch(settings.urls.get_majors, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, majors: data}, ()=>{
                   /* let result = data.sort(function(a, b){
                        var nameA = a.label.toLowerCase(), nameB = b.label.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                         return -1;
                        if (nameA > nameB)
                         return 1;
                        return 0; //default return value (no sorting)
                       });
                       console.log(result)*/
                })
            )
        
    }
    fetchCountries() {
        this.setState({isloading: true});
            fetch(settings.urls.get_countries, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, countries: data})
            )
        
    }
    render(){
        const options = this.state.majors;
        const gpas = GPAS;
        const levels = LEVELS;
        const criterias = CRITERIAS;
        const countries = COUNTRIES;
        const applicantCountries = this.state.countries;
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
            referralToken,
            isActive,
            isAdmin,
            isDisabled,
            lastName,
            level,
            major,
            saved,
            image,
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
                                    <ProfileBox userData={this.state.user} getUpdateImg={this.refreshImg}/>
                                    <ReferBox userData={this.state.user} />
                        </div>
                                    <div className="col-md-8 col-sm-12">
                                    
                                    <div className="col-spaced box box-set">
                                    <ProfileTabs />
                                    <div className="row">
                                        <div className="col-md-6">
                                        <span className="major-select"><input placeholder={firstName} className="textInput" type="text" onChange={e=>this.setState({firstName: e.target.value})}/></span>
                                    
                                        </div>
                                        <div className="col-md-6">
                                        <span className="major-select"><input placeholder={lastName} className="textInput" type="text" onChange={e=>this.setState({lastName: e.target.value})}/></span>
                 
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            onBlurResetsInput={false}
                                            onSelectResetsInput={false}
                                            value={this.state.criteria}
                                            placeholder={criteria}
                                            simpleValue
                                            multi={false}
                                            clearable={true}
                                            onChange={this.handleCriteriaChange}
                                            options={criterias}
                                            searchable={false}
                                        />
                                        </div>
                                        <div className="col-md-6">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={this.state.level}
                                            placeholder={level}
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleLevelChange}
                                            options={levels}
                                            searchable={false}
                                        />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-6">
                                        <Select
                                            name="applicantcountry"
                                            className="major-select"
                                            onBlurResetsInput={false}
                                            onSelectResetsInput={false}
                                            value={this.state.applicantCountry}
                                            placeholder={applicantCountry}
                                            simpleValue
                                            multi={false}
                                            clearable={true}
                                            onChange={this.handleApplicantCountryChange}
                                            options={applicantCountries}
                                            searchable={true}
                                        />
                                        </div>
                                        <div className="col-md-6">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={this.state.scholarshipCountry}
                                            placeholder={scholarshipCountry}
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleCountryChange}
                                            options={countries}
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Select
                                            name="gpa"
                                            className="gpa-select"
                                            value={this.state.gpa}
                                            placeholder={gpa}
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleGpaChange}
                                            options={gpas}
                                            searchable={false}
                                        />
                                        </div>
                                        <div className="col-md-6">
                                        <Select
                                            name="gpa"
                                            className="gpa-select"
                                            value={this.state.major}
                                            placeholder={major}
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleMajorChange}
                                            options={options}
                                            searchable={true}
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <button className="navbar-btn aligner" onClick={()=> {this.doUpdate(localStorage.token, this.props.user_id)}}><span className="user-info">Update Profile</span></button>
                                    
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className="col-md-6">
                                    
                                    </div>
                                    </div>
                                    </div>

                                    </div>
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


export default connect(mapper)(Profile);