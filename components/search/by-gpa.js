import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import settings from '../../settings'
import {SearchTabs} from './school-search'
import GpaResult from './gpa-result'
import LoadingResult from './loading-result'
import {Search} from 'react-feather'
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Pagination from "react-js-pagination";
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import {MobileSidebar} from '../shared/mobile_sidebar';
//import ScholarshipResult from './scholarship-result'

const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
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

export class ByGpa extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            level: '',
            state: '',
            country: '',
            gpa: '',
            USstate: true,
            error: null,
            results: [],
            states: null,
            activePage: 1,
            offset: 0,
            resultCount: 0,
            opened: false
        };
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.OpenModal = this.OpenModal.bind(this);
        this.CloseShareModal = this.CloseShareModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleCriteriaChange (criteria) {
		console.log('You\'ve selected:', criteria);
		this.setState({ criteria }, ()=>{
            console.log(this.state.criteria)
        });
    }
    handleClose(x){
        this.setState({opened: x})
    }
    OpenModal() {
        this.setState({ opened: true });
      };
      CloseShareModal(){
        this.setState({ opened: false });
      }
    handleLevelChange (level) {
		this.setState({ level });
    }

    handleGpaChange (gpa) {
		console.log('You\'ve selected:', gpa);
		this.setState({ gpa }, ()=>{
            console.log(this.state.gpa)
        });
    }

    handleStateChange (state) {
		console.log('You\'ve selected:', state);
		this.setState({ state });
    }
    
    handleCountryChange (country) {
		console.log('You\'ve selected:', country);
        this.setState({ country }, ()=>{;
        if (country == "Canada"){
            this.setState({USstate: false})
        }
        else{
            this.setState({USstate: true})
        }
    })
    }

    componentDidMount(){
        this.fetchStates()
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //(n-1)15
        let mathStuff = pageNumber - 1;
        let multiplyStuff = mathStuff * 15;
        this.setState({activePage: pageNumber, offset: multiplyStuff }, ()=>{
            this.DoSearch();
            window.scrollTo(0, 0);
        });
         
    }
    DoSearch(){
        this.Search(localStorage.token, this.props.user_id)
    }
    Search(token, user_id) {
        const {gpa, state, level, isloading, results, error, offset} = this.state
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.gpa_search, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            mode: 'cors',
            body: JSON.stringify({gpa, state, level, offset})
        })
        .then(
            response => response.json()
        )
        .then(
            data => this.setState({isloading: false, results: data.rows, resultCount: data.count}, () => {
                console.log(this.state.results)
            })
        )
        
    }

    fetchStates() {
        let firstMajor = {
            label: 'All',
            value: 'All'
        }
        this.setState({isloading: true});
            fetch(settings.urls.get_states, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, states: [firstMajor, ...data]})
            )
        
    }

    render(){

        let { opened, state, level, gpa, country, USstate, isloading, results, resultCount} = this.state;
        const gpas = GPAS;
        const levels = LEVELS;
        const states = this.state.states;
        let SelectBlock;
        let resultsBlock
        
        if (isloading == true){
            resultsBlock = (
                <LoadingResult />
            );
            
        }
        else{
            resultsBlock = (
                <GpaResult /*none={noneResult}*/getInput={this.handleClose} school={results}/>
                );
            
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
                        <h1 className="home-headline">School Search By Gpa</h1>
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
                                            name="gpa"
                                            className="gpa-select"
                                            value={gpa}
                                            placeholder="GPA"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleGpaChange}
                                            options={gpas}
                                            searchable={false}
                                        />
                                        </div>
                                        
                                        <div className="col-md-6">
                                        <Select
                                            name="level"
                                            className="gpa-select"
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
                                        name="state"
                                        className="gpa-select"
                                        value={state}
                                        placeholder="Pick a State"
                                        multi={false}
                                        simpleValue
                                        onChange={this.handleStateChange}
                                        options={states}
                                        searchable={true}
                                        />
                                        </div>
                                        
                                        <div className="col-md-6">
                                        <button className="search-btn aligner" onClick={()=>this.DoSearch()}><Search className="user-icon"/> <span className="user-info">Search</span></button>
                                       
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
            {resultsBlock}
            {results.length > 0 ?
            <div className="row pagination-row">
            <div className="col-md-4"></div>
            <div className="col-md-4 pagination-col">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={15}
            totalItemsCount={resultCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
            />
            </div>
            <div className="col-md-4"></div>
            </div>
             : null }
            <Modal className="video-modal share-modal" open={opened} onClose={this.CloseShareModal} showCloseIcon={true} little>
                <h1>Share School to Friends</h1>
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <a className="btn-facebook" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://theacademist.herokuapp.com/school-search/by-gpa`}>Share on Facebook</a><br/>
                <a className="btn-twitter" target="_blank" href={`https://www.twitter.com/intent/tweet?url=https://theacademist.herokuapp.com/school-search/by-gpa&via=the_academist&text="I just found schools on The Academist"`}>Share on Twitter</a><br/>
                <a className="btn-linkedin" target="_blank" href={`http://www.linkedin.com/shareArticle?mini=true&url=https://theacademist.herokuapp.com/school-search/by-gpa&title="I just found schools on The Academist"&source="The Academist"`}>Share on LinkedIn</a>
                <br/>
                </div>
                <div className="col-md-2"></div>
                </div>
            </Modal>
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


export default connect(mapper)(ByGpa);