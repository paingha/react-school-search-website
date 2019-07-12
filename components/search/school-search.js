import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import {MobileSidebar} from '../shared/mobile_sidebar'
import settings from '../../settings'
import LoadingResult from './loading-result'
import SchoolResult from './school-result'
import {Link, withRouter} from "react-router-dom";
import {Search} from 'react-feather'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
//import ScholarshipResult from './scholarship-result'

const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
	{ label: 'Undergraduate', value: 'Undergraduate' }
];
const COUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
const CANSTATE = [{
    value: 'AB',
    label: 'Alberta'
  },
  {
    value: 'BC',
    label: 'British Columbia'
  },
  {
    value: 'MB',
    label: 'Manitoba'
  },
  {
    value: 'NB',
    label: 'New Brunswick'
  },
  {
    value: 'NL',
    label: 'Newfoundland and Labrador'
  },
  {
    value: 'NS',
    label: 'Nova Scotia'
  },
  {
    value: 'NT',
    label: 'Northwest Territories'
  },
  {
    value: 'NU',
    label: 'Nunavut'
  },{
    value: 'ON',
    label: 'Ontario'
  },{
    value: 'PE',
    label: 'Prince Edward Island'
  },{
    value: 'QC',
    label: 'Québec'
  },{
    value: 'SK',
    label: 'Saskatchewan'
  },{
    value: 'YT',
    label: 'Yukon'
  }
];


const SearchTab = withRouter(function (props) {
    let {name} = props;
    if (props.link == location.pathname)
        name = <span className="search-current">{name}</span>;
    return <span onClick={()=>props.history.push(props.link)}
                 className="search-tab">{name}</span>;
});

export class SearchTabs extends Component {
    render() {
        return (
            <div className="row search-tabs-row">
                <SearchTab link="/school-search" name="By Major"/>
                <SearchTab link="/school-search/by-gpa" name="By GPA"/>
            </div>
        );
    }
}

export class SchoolSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            level: '',
            Majors: '',
            majors: [],
            country: '',
            state: '',
            USstate: true,
            states: [],
            error: null,
            results: [],
            refresh: false,
            offset: 0
        };
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

   

    handleLevelChange (level) {
		//console.log('You\'ve selected:', level);
		this.setState({ level });
    }

    handleMajorChange (Majors) {
		//console.log('You\'ve selected:', Majors);
		this.setState({ Majors }, ()=>{
            //console.log(this.state.Majors)
        });
    }

    handleStateChange (state) {
		//console.log('You\'ve selected:', state);
		this.setState({ state });
    }
    
    handleCountryChange (country) {
		//console.log('You\'ve selected:', country);
        this.setState({ country }, ()=>{;
        if (country == "Canada"){
            this.setState({USstate: false})
        }
        else{
            this.setState({USstate: true})
        }
    })
    }

   
    Search() {
        const {state, level, country, isloading, results, error, Majors, offset} = this.state
        let major = Majors
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.major_search, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({state, major, country, level, offset})
        })
        .then(
            response => response.json()
        )
        .then(
            data => this.setState({isloading: false, results: data}, () => {
                console.log(this.state.results)
            })
        )
        
    }
    fetchStates() {
        let firstMajor = {
            label: 'All',
            value: 'All'
        }
        fetch(settings.urls.get_states, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({states: [firstMajor, ...data]})
            )
        
    }
    fetchMajors() {
            fetch(settings.urls.get_majors, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({majors: data})
            )
    }
    componentDidMount(){
        this.fetchMajors();
        this.fetchStates();
    }
    render(){
        let resultBlock;
        let {isloading, results} = this.state;
        if (isloading == true){
            resultBlock = (

                <LoadingResult />
                
            );
        }
        else{
            resultBlock = (
                <SchoolResult school={results}/>
            );
        }
        let { level, gpa, country, majors, Majors, USstate, state} = this.state;
        const options = majors;
        const levels = LEVELS;
        const countries = COUNTRIES;
        const canstate = CANSTATE;
        let SelectBlock;
        if (USstate){
            SelectBlock = (
                <Select
                 name="state"
                className="gpa-select"
                value={state}
                placeholder="Pick a State"
                multi={false}
                simpleValue
                onChange={this.handleStateChange}
                options={this.state.states}
                searchable={false}
                />
            )
        }
        else{
            SelectBlock = (
                <Select
                 name="state"
                className="gpa-select"
                value={state}
                placeholder="Pick a State"
                multi={false}
                simpleValue
                onChange={this.handleStateChange}
                options={canstate}
                searchable={false}
                />
            )
        }
            return <React.Fragment>
            <div className="container-fluid">
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <MobileSidebar />
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">School Search By Major</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="school-search-section-2">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-1">
                        </div>
                                    <div className="col-md-10 col-sm-12">
                                    
                                    <div className="col-spaced box">
                                    <SearchTabs />
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={Majors}
                                            placeholder="Majors"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleMajorChange}
                                            options={options}
                                        />
                                        </div>
                                        
                                        <div className="col-md-6">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={level}
                                            placeholder="Level"
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
                                            name="form-field-name"
                                            className="major-select"
                                            value={country}
                                            placeholder="Select a Country"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleCountryChange}
                                            options={countries}
                                            searchable={false}
                                        />
                                        </div>
                                        
                                        <div className="col-md-6">
                                        {SelectBlock}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                        
                                        </div>
                                        <div className="col-md-8">
                                        <button className="search-btn aligner" onClick={()=>this.Search()}><Search className="user-icon"/> <span className="user-info">Search</span></button>
                                        </div>
                                        <div className="col-md-2">
                                        
                                        </div>
                                    </div>
                                    </div>

                                    </div>
                                    <div className="col-md-1">
                        </div>
                        </div>
                    </div>
                </section>
                
            </div> 
            {resultBlock}
            
          </div>
        <Footer />
        </React.Fragment>
    }
}
