import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import settings from '../../settings'
import {Link2} from 'react-feather'
export default class GpaPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            school: {},
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
        this.fetchSchool(localStorage.token, this.props.school_id);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.school_id != nextProps.school_id) {
            //console.log(nextProps.scholarship_id)
            this.fetchSchool(localStorage.token, nextProps.school_id);
        }
        if (!this.props.open && !!nextProps.open) {
            this.setState({open: nextProps.open});
        }
    }

    fetchSchool(token, school_id) {
        this.setState({isloading: true});
        if (token && school_id) {
            fetch(settings.urls.get_school.replace('{school_id}', school_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, school: data})
            )
        }
    }
    
    render(){
        let 
        {
        name,
        gpa,
        level,
        address,
        description,
        span,
        city,
        state,
        sat,
        act,
        zip,
        comment,
        website
        } = this.state.school;
        let {open} = this.state;
        return(
        <Modal className="more-modal" open={open} onClose={this.onCloseModal} showCloseIcon={true} little>
        {this.state.isloading ?
        <img className="popup-button-puff" src="/img/puff.svg"/>
        :   <React.Fragment>
            <div className="more-modal">
            <p><strong>School Name:</strong> {name}</p>
            <p><strong>School Description:</strong> {description}</p>
            <p><strong>School GPA:</strong> {gpa}</p>
            <p><strong>School Level:</strong> {level}</p>
            <p><strong>School SAT:</strong> {sat}</p>
            <p><strong>School ACT:</strong> {act}</p>
            <p><strong>Scholarship Address:</strong> {address}</p>
            <p><strong>School City:</strong> {city}</p>
            <p><strong>School ZIP Code:</strong> {zip}</p>
            <p><strong>School State:</strong> {state}</p>
            </div>
            <br/>
            <div className="more-modal"><a href={`${website}`} target="_blank"><button className="search-btn aligner"><Link2 className="user-icon"/> <span className="user-info">Visit</span></button></a></div>
            </React.Fragment>
        }
        </Modal>
        );
    }
}