import React, {Component} from 'react'
//import {connect} from 'react-redux';
import settings from '../../settings'
import {Search, DollarSign, Calendar, Edit, Lock, Heart, Check, X} from 'react-feather'
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal'
import _ from 'lodash'
import UnBlurred from './unblurred'
import Blurred from './blurred'
import ScholarshipPopup from '../shared/scholarship_popup'

export default class ScholarshipResult extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            error: null,
            modalStuff: null,
            saved: false,
            open: false,
            opened: false,
          showCloseIcon: false,
          results: {},
          reply: '',
          stuffs: null,
          visible: true,
          visibleID: null,  
          id: 0,  
          warningTime: 1000 * 60 * 1,
          signoutTime: 1000 * 60 * 2,    
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        //this.OpenModal = this.OpenModal.bind(this);
        this.CloseModal = this.CloseModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    clearTimeoutFunc = () => {
        if (this.warnTimeout) clearTimeout(this.warnTimeout);
  
        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
      };
  
      setTimeout = () => {
        this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
        this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
      };
  
      resetTimeout = () => {
        this.clearTimeoutFunc();
        this.setTimeout();
      };
  
      warn = () => {
        console.log('You will be logged out automatically in 1 minute.');
      };
  
      logout = () => {
        // Send a logout request to the API
        console.log('Sending a logout request to the API...');
        this.destroy();
      };
  
      destroy = () => {
       //clear the session
        //browserHistory.push('/');
        //window.location.assign('/');
        console.log("Show modal here and end search")
      };
    handleClose(x){
        this.setState({opened: x})
    }
    onOpenModal() {
        this.setState({ open: true })
      };
      OpenModal(param) {
        this.setState({ opened: true, id: param }, ()=>{
            //this.getMore(param)
        });
        
      };
      onCloseModal() {
        this.setState({ open: false });
      };
      CloseModal() {
        this.setState({ opened: false });
      };
    getMore(e){
        return fetch(settings.urls.get_scholarship.replace('{scholarship_id}', e), {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
        })
        .then(
            response => response.json()
        )
        .then(
            data => {
                if(data.length != 0){
                this.setState({isloading: false, results: data})
        }else{
            this.setState({isloading: false})
        }
        }
        )
    }
    delete(e){
        let {refreshResults} = this.props.refresh
        return fetch(settings.urls.delete_scholarship.replace('{scholarship_id}', e), {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
        })
        .then(
            response => response.json()
        )
        .then(
            data => {
                this.setState({isloading: false, reply: data.message})
                //added deleted toast here
                console.log(this.state.reply);
                this.refreshResults
        }
        )
    }
    clickSave(e) {        
        let scholarship_id = e;        
        let {id, savedID} = this.props.currentUser
        let saved_ID = savedID
        saved_ID.push(parseInt(scholarship_id))
        return fetch(settings.urls.save_scholarship.replace('{user_id}', id), {
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
                this.setState({isloading: false})
        }
        )
    }
    UnSave(e) {        
        let scholarship_id = e;        
        let {id, savedID} = this.props.currentUser
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
                this.setState({isloading: false})
        }
        )
    }

    componentDidMount() {
        this.events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
          ];
    
          for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
          }
    
          this.setTimeout();
    }
    mouseEnter(e){
        this.setState({visibleID: e, visible: false},()=>{
            //console.log("hover")
        })
    }
    mouseLeave(){
        this.setState({visible: true},()=>{
            //console.log("leave")
        })
    }
    doStuff(e){
        let childArray = this.props.visibility
        //console.log(childArray);
        let give = _.find(childArray, { 'id': e })
        //console.log(give);
        return give;
    }
    render(){
        let { school, showCloseIcon, open, opened, isloading, visible, visibleID} = this.state;
        //let { name, criteria, level, applicantCountry, gpa, amount, deadline, country, description, major, institution, comment, url} = this.state.results;
        let searchResults = this.props.search;
        let {isAdmin, coin, savedID} = this.props.currentUser;
        let userCoin = this.props.coin       
        
        let noCoinBlock;
       
        if (userCoin == true){
            noCoinBlock = (
                <React.Fragment>
                  <UnBlurred buyUrl={this.props.buyCoin} BlurredArray={this.props.noCoinObj} />
                  <Blurred buyUrl={this.props.buyCoin} BlurredArray={this.props.noCoinObj} /> 
                    </React.Fragment>           
            )
        }
        else{
            noCoinBlock = (
                <React.Fragment>
                    
                {searchResults.map((result, id)=>
                    <div key={result.id} className="row">
                    <div className="col-md-1">
                    </div>

                                
                                <div className="col-md-10 col-sm-12">
                                <div className="col-spaced box">
                                { _.includes(savedID, result.id) ? 
                                    <React.Fragment>
                                        { visible ?
                                            <div> 
                                            {
                                                this.doStuff(`${result.id}`) != false ?
                                                <div onMouseEnter={this.mouseEnter.bind(this, result.id)} className="ribbon-wrapper-saved"><div className="ribbon-saved"><Check className="heart-icon"/> <span className="saved-info">SAVED</span></div></div>
                                                :
                                                <div onClick={this.UnSave.bind(this, `${result.id}`)} onMouseLeave={this.mouseLeave.bind(this)} className="ribbon-wrapper-unsave"><div className="ribbon-unsave"><X className="heart-icon"/> <span className="unsave-info">UNSAVE</span></div></div>
                                            }
                                            </div>
                                        :
                                            <div>
                                            {
                                                this.doStuff(`${result.id}`) != false && visibleID != result.id ?
                                                <div onMouseEnter={this.mouseEnter.bind(this, result.id)} className="ribbon-wrapper-saved"><div className="ribbon-saved"><Check className="heart-icon"/> <span className="saved-info">SAVED</span></div></div>
                                                :
                                                <div onClick={this.UnSave.bind(this, `${result.id}`)} onMouseLeave={this.mouseLeave.bind(this)} className="ribbon-wrapper-unsave"><div className="ribbon-unsave"><X className="heart-icon"/> <span className="unsave-info">UNSAVE</span></div></div>
                                            }
                                            </div>
                                        }
                                    </React.Fragment>
                                : 
                                <a className="delete" onClick={this.clickSave.bind(this, `${result.id}`)}><div className="ribbon-wrapper-green"><div className="ribbon-green"><Heart className="heart-icon"/> <span className="save-info">SAVE</span></div></div></a>
                                }
                                <div className="row">
                                    <div className="col-md-5">
                                    <h3 className="word-wrap"><TextTruncate
                                        line={3}
                                        truncateText="…"
                                        text={result.name}
                                    /></h3>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="aligner">
                                    <span className="search-info"><h3>{result.amount}</h3></span></div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="aligner"><Calendar className="date-icon" />
                                    <span className="search-info"><h3>
                                    { result.deadline !== null ?
                                        
                                        <Moment parse="D/MMM/YYYY" format="MMMM Do">
                                        {result.deadline}
                                        </Moment> :
                                        <span>N/A</span>
                                    }  
                                    </h3></span></div>
                                    </div>
                                </div>
                                
                                <div className="row search-push-down">
                                    <div className="col-md-2">
                                    <h4>{result.criteria}</h4>
                                    </div>
                                    <div className="col-md-2">
                                    <h4>{result.applicantCountry}</h4>
                                    </div>
                                    <div className="col-md-1">
                                    { isAdmin ?
                                    <a className="delete" onClick={this.delete.bind(this, `${result.id}`)}>Delete</a>
                                    : null
                                    }
                                    </div>
                                    <div className="col-md-3">
                                   
                                    </div>
                                    <div className="col-md-4">
                                    <button className="search-btn aligner" onClick={this.OpenModal.bind(this, `${result.id}`)}><Edit className="user-icon"/> <span className="user-info">View More</span></button>
                                    
                                    </div>
                                </div>
                                
                                </div>

                                </div>
                                <div className="col-md-1">
                    </div>
                    </div>
                )}
                </React.Fragment>
            )
        }
            return (<React.Fragment>
            <div className="row">
                <section className="search-result-section-2">
                    <div className="story-box">
                    {noCoinBlock}
                    
                    <br />
                   
                    </div>
                </section>
            </div> 
            <ScholarshipPopup open={this.state.opened} scholarship_id={this.state.id} getInput={this.handleClose}/>
            </React.Fragment>
            ); 
         //}
    }
}
