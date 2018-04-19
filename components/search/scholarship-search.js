import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import {connect} from 'react-redux';
import settings from '../../settings'
import {Search} from 'react-feather'

export class ScholarshipSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            school: '',
            criteria: '',
            level: '',
            major: '',
            amount: '',
            country: '',
            aaplicantCountry: '',
            gpa: '',
            deadline: '',
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
        let { criteria, level, school, gpa, amount, major, deadline, country } = this.state;
        
            return <div> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Scholarship Search</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="search-section-2">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-1">
                        </div>
                                    <div className="col-md-10 col-sm-12">
                                    
                                    <div className="col-spaced box">
                                    <div className="row">
                                        <div className="col-md-4">
                                        <input type="text" placeholder="School" className="register-input"
                                        value={school} onChange={e=>this.setState({school: e.target.value})}/>
                                        </div>
                                        <div className="col-md-4">
                                        <input type="text" placeholder="Criteria" className="register-input"
                                        value={criteria} onChange={e=>this.setState({criteria: e.target.value})}/>
                                        </div>
                                        <div className="col-md-4">
                                        <input type="text" placeholder="Level" className="register-input"
                                        value={level} onChange={e=>this.setState({level: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                        <input type="text" placeholder="GPA" className="register-input"
                                        value={gpa} onChange={e=>this.setState({gpa: e.target.value})}/>
                                        </div>
                                        <div className="col-md-4">
                                        <input type="text" placeholder="Major" className="register-input"
                                        value={major} onChange={e=>this.setState({major: e.target.value})}/>
                                        </div>
                                        <div className="col-md-4">
                                        <input type="text" placeholder="Amount" className="register-input"
                                        value={amount} onChange={e=>this.setState({amount: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                        <input type="text" placeholder="Country" className="register-input"
                                        value={country} onChange={e=>this.setState({country: e.target.value})}/>
                                        </div>
                                        <div className="col-md-4">
                                        <input type="text" placeholder="Deadline" className="register-input"
                                        value={deadline} onChange={e=>this.setState({deadline: e.target.value})}/>
                                        </div>
                                        <div className="col-md-4">
                                        <button className="navbar-btn aligner"><Search className="user-icon"/> <span className="user-info">Search</span></button>
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
        </div>   
        
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(ScholarshipSearch);