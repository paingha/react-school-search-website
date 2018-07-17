import React, {Component} from 'react'
import Navbar from '../../shared/navbar';
import Footer from '../../shared/footer'
import { Match, Link } from 'react-router-dom'
import {User, Share} from 'react-feather'
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import settings from '../../../settings';
import moment from 'moment';
import _ from 'lodash';
import {
    Tooltip,
  } from 'react-tippy';
  const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const SCHOOL_COUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];const AMOUNTS = [
	{ label: '$0 - $5,000', value: '$0 - $5,000' },
	{ label: '$5,000 - above', value: '$5,000 above' },
	{ label: 'Full Tuition', value: 'Full tuition' },
	{ label: 'Variable', value: 'Variable' },
];
const CRITERIAS = [
	{ label: 'Merit', value: 'Merit' },
    { label: 'Need', value: 'Need' },
    { label: 'Other', value: 'Other' }
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
export class ScholarshipCreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            amount: '',
            amountType: '',
            description: '',
            criteria: '',
            level: '',
            major: [],
            applicantCountry: '',
            country: '',
            gpa: 0,
            deadline: '',
            institution: '',
            comment: '',
            url: '',
            majors: [],
            countries: []
        }
        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleAmountTypeChange = this.handleAmountTypeChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleApplicantCountryChange = this.handleApplicantCountryChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);

    }

    componentDidMount(){
        this.fetchCountries();
        this.fetchMajors();
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
                data => this.setState({isloading: false, majors: data})
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
    handleApplicantCountryChange(applicantCountry){
        this.setState({ applicantCountry });
    }
    handleCriteriaChange (criteria) {
		console.log('You\'ve selected:', criteria);
		this.setState({ criteria }, ()=>{
            console.log(this.state.criteria)
        });
    }

    handleLevelChange (level) {
		console.log('You\'ve selected:', level);
		this.setState({ level });
    }

    handleMajorChange (major) {
		console.log('You\'ve selected:', major);
		this.setState({ major }, ()=>{
            console.log(this.state.major)
        });
    }

    handleAmountTypeChange (amountType) {
		console.log('You\'ve selected:', amountType);
		this.setState({ amountType });
    }
    
    handleCountryChange (country) {
		console.log('You\'ve selected:', country);
		this.setState({ country });
    }
    handleGpaChange (gpa) {
		console.log('You\'ve selected:', gpa);
		this.setState({ gpa }, ()=>{
            console.log(this.state.gpa)
        });
    }
    createScholarship(){
        console.log(this.state);
    }
    
    render(){
        let {majors, countries, name, amount, amountType, description, criteria, major, applicantCountry, country, gpa, deadline, institution, comment, url, level} = this.state;
        //const countriess = COUNTRIES;
        //let options = this.state.countryOptions;
        const Majors = this.state.majors;
        const school_country = SCHOOL_COUNTRIES;
        const levels = LEVELS;
        const amounts = AMOUNTS;
        const gpas = GPAS;
        const criterias = CRITERIAS
        const appCountries = this.state.countries;
        
        return <div className="container-fluid"> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            
            <h1 className="home-headline">Create Scholarship</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>

 <div className="row-fluid new-application-row">
 <div className="col-md-2">
 </div>
    <div className="col-md-8">
    <div className="col-spaced help-box">
   
    <div className="row article-sub-row">
    <div className="col-md-12">
    
    <br/>
    <span className="content">
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Name" className="textInput" type="text" value={name} onChange={e=>this.setState({name: e.target.value})}/></span>
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Deadline" className="textInput" type="text"value={deadline} onChange={e=>this.setState({deadline: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="left"
    arrow={true}
    hideOnClick={true}
    title="Criteria (required)"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={criteria}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Criteria"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleCriteriaChange}
        options={criterias}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Institution (required)"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Institution" className="textInput" type="text" value={institution} onChange={e=>this.setState({institution: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Amount" className="textInput" type="text" value={amount} onChange={e=>this.setState({amount: e.target.value})}/></span>
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Amount Type (required)"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={amountType}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Amount Type"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleAmountTypeChange}
        options={amounts}
        searchable={false}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={level}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Level"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleLevelChange}
        options={levels}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={applicantCountry}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Applicant Country"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleApplicantCountryChange}
        options={appCountries}
        searchable={true}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={country}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="School Country"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleCountryChange}
        options={school_country}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={major}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Majors"
        simpleValue
        multi={true}
        clearable={true}
        onChange={this.handleMajorChange}
        options={Majors}
        searchable={true}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Optional"
    trigger="click"
    >
        <Select
        name="form-field-name"
        className="major-select"
        value={gpa}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Gpa"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleGpaChange}
        options={gpas}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
       <span className="major-select"><input placeholder="URL" className="textInput" type="text" value={url} onChange={e=>this.setState({url: e.target.value})}/></span>
   
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="(optional)"
    trigger="click"
    >
        <span className="major-select"><input placeholder="Comment" className="textInput" type="text" value={comment} onChange={e=>this.setState({comment: e.target.value})}/></span>
    </Tooltip>
    </div>
    <div className="col-md-6">    
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="(optional)"
    trigger="click"
    >
        <span className="major-select"><input placeholder="description" className="textInput" type="text" value={description} onChange={e=>this.setState({description: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    
        
    <br/>
    <span className="center-now"><button className="application-btn aligner" onClick={this.createScholarship.bind(this)}><span className="user-info">Create Scholarship</span></button></span>
    
    <br/>
    
    </span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-2">
      
    </div>
    <div className="clearfix">
    </div>
 </div>
<Footer />
</div>
        
    }
}