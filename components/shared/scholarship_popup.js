import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import settings from '../../settings'
import {Link2} from 'react-feather'
export default class ScholarshipPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            scholarship: {},
            open: this.props.open,
        }
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    onOpenModal() {
        this.setState({ open: true });
      };
    
      onCloseModal() {
        this.setState({ open: false }, ()=>{
            this.props.getInput(this.state.open);
        });
        
      };

    componentDidMount() {
        this.fetchScholarship(localStorage.token, this.props.scholarship_id);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.scholarship_id != nextProps.scholarship_id) {
            //console.log(nextProps.scholarship_id)
            this.fetchScholarship(localStorage.token, nextProps.scholarship_id);
        }
        if (!this.props.open && !!nextProps.open) {
            this.setState({open: nextProps.open});
        }
    }

    fetchScholarship(token, scholarship_id) {
        this.setState({isloading: true});
        if (token && scholarship_id) {
            fetch(settings.urls.get_scholarship.replace('{scholarship_id}', scholarship_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, scholarship: data})
            )
        }
    }
    
    render(){
        let 
        {
        name,
        amount,
        amountType,
        description,
        major,
        gpa,
        level,
        deadline,
        criteria,
        applicantCountry,
        country,
        institution,
        comment,
        url
        } = this.state.scholarship;
        let {open} = this.state;
        return(
        <Modal className="more-modal" open={open} onClose={this.onCloseModal} showCloseIcon={true} little>
        {this.state.isloading ?
        <img className="popup-button-puff" src="/img/puff.svg"/>
        :   <React.Fragment>
            <div className="more-modal">
            <p><strong>Scholarship Name:</strong> {name}</p>
            <p><strong>Scholarship Description:</strong> {description}</p>
            <p><strong>Scholarship Gpa:</strong> {gpa}</p>
            <p><strong>Scholarship Level:</strong> {level}</p>
            <p><strong>Scholarship Applicant Country:</strong> {applicantCountry}</p>
            <p><strong>Scholarship Institution:</strong> {institution}</p>
            <p><strong>Scholarship Criteria:</strong> {criteria}</p>
            <p><strong>Scholarship Country:</strong> {country}</p>
            <p><strong>Scholarship Deadline:</strong> {deadline}</p>
            </div>
            <br/>
            <div className="more-modal"><a href={`${url}`} target="_blank"><button className="search-btn aligner"><Link2 className="user-icon"/> <span className="user-info">Apply</span></button></a></div>
            </React.Fragment>
        }
        </Modal>
        );
    }
}