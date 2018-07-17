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
  
export class ScholarshipList extends Component{
    constructor(props){
        super(props)
        this.state = {
            scholarships: [],
            isloading: false
        }

    }

    componentDidMount(){
        this.fetchScholarships();
    }
    fetchScholarships() {
        this.setState({isloading: true});
            fetch(settings.urls.get_scholarships, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, scholarships: data})
            )
        
    }
    
    render(){
        let {scholarships} = this.state;
        
        return <div className="container-fluid"> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            
            <h1 className="home-headline">Scholarships</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>

 <div className="row-fluid new-application-row">
 <div className="col-md-1">
 </div>
    <div className="col-md-10">
    <div className="col-spaced help-box scholarship-list">
   
    <div className="row article-sub-row">
    <div className="col-md-12">
    
    <br/>
    <span className="content">
    <table className="table scholarship-list">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Amount Type</th>
                                    <th>Criteria</th>
                                    <th>Level</th>
                                    <th>Country</th>
                                    <th>Applicant Country</th>
                                    <th>Gpa</th>
                                    <th>Deadline</th>
                                    <th>URL</th>
                                </tr>
                                </thead>
                                <tbody>
                                {scholarships.map((scholarship, id)=>
                                <tr key={id} >
                                    <td>{scholarship.name}</td>
                                    <td>{scholarship.amount}</td>
                                    <td>{scholarship.amountType}</td>
                                    <td>{scholarship.criteria}</td>
                                    <td>{scholarship.level}</td>
                                    <td>{scholarship.country}</td>
                                    <td>{scholarship.applicantCountry}</td>
                                    <td>{scholarship.gpa}</td>
                                    <td>{scholarship.deadline}</td>
                                    <td>{scholarship.url}</td>
                                </tr>

                                )}
                                </tbody>
                     
                            </table>
    </span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-1">
      
    </div>
    <div className="clearfix">
    </div>
 </div>
<Footer />
</div>
        
    }
}