import React, {Component} from 'react'
import Navbar from '../shared/navbar'
//import {connect} from 'react-redux';
import settings from '../../settings'
import Footer from '../shared/footer'
import {Search, BookOpen} from 'react-feather'
import ContactPopup from '../shared/contact-popup';
import ForumPopup from '../shared/forum_popup';
import {MobileSidebar} from '../shared/mobile_sidebar'
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
export class Forum extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            error: null,
            noneResult: false,
            things: [],
            offset: 0,
            activePage: 1,
            offset: 0,
            resultCount: 0,
            q: '',
            searchResult: null,
            searchCount: 0,
            opened: false,
            open: false
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClosed = this.handleClosed.bind(this);
        this.OpenModal = this.OpenModal.bind(this);
    }
    OpenModal() {
        this.setState({ opened: true}, ()=>{
            //this.getMore(param)
        });
        
      };
    handleClose(x){
        this.setState({opened: x})
    }
    handleClosed(x){
        this.setState({open: x})
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //(n-1)15
        let mathStuff = pageNumber - 1;
        let multiplyStuff = mathStuff * 20;
        this.setState({activePage: pageNumber, offset: multiplyStuff }, ()=>{
            this.fetchForum();
            window.scrollTo(0, 0);
        });
         
    }
    fetchForum() {
        this.setState({isloading: true});
            fetch(settings.urls.get_forum.replace("{off}", this.state.offset), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, things: data.rows, resultCount: data.count}, ()=>{
                })
            )
    } 
    searchNow(e) {
        e.preventDefault();
        const {q} = this.state
        if(q !== ''){
        this.setState({isloading: true});
            fetch(settings.urls.forum_search, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                body: JSON.stringify({q})
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, searchResult: data.rows, searchCount: data.count}, ()=>{
                    this.setState({open: true}, ()=>{
                        //console.log(this.state.searchResult)
                    })
                })
            )
        }
    } 

    componentDidMount() {
        this.fetchForum();
        window.scrollTo(0, 0);
    }


    componentWillReceiveProps(nextProps) {
       /* if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        } */
    }

    componentDidUpdate(previousProps, previousState) {
        /*if(previousState.results !== this.state.results) {
            this.fetchUser(localStorage.token, this.props.user_id);
          } */
        
    }
    render(){
        
        let { things, isloading, resultCount } = this.state;
     /*   if(!this.state.user){
            return <React.Fragment> 
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
                                    <div className='text-input__loading--line2'></div>
                                    <div className='text-input__loading--line2'></div>
                                    <div className='text-input__loading--line2'></div>
                                    <div className='text-input__loading--line2'></div>
                                    </div>

                                    </div>
                                    <div className="col-md-1">
                        </div>
                        </div>
                    </div>
                </section>
                
            </div> 
        </React.Fragment>
        } */
        let resultsBlock; 
        let noResult;
        
        /*if(noneResult){
            noResult = (
                <NoResult />
            );
        } 
        if (isloading == true){
            resultsBlock = (
                <LoadingResult />
            );
            
        }
        else{
            resultsBlock = (
                <ScholarshipResult search={results}/>
                );
            
        } */
        
            return <React.Fragment>
            <div className="container-fluid"> 
            <div className="row">
                <section className="help-center-section">
                    <Navbar /> 
                    <MobileSidebar />
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Forum</h1>
                        
                        </div>
                    </div>
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                    <div className="headline-box">
                    <form className="help-center-search">
                    <input type="text" className="help-center-search-input" placeholder="Need Help?" onChange={e=>this.setState({q: e.target.value})}/>
                        <button className="help-center-search-btn" onClick={this.searchNow.bind(this)}>Search</button>
                        </form>
                        </div>
                    </div>
                    </div>
                    </div>
                </section>
            </div>
             
             <div className="row-fluid recent-article-row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                <div className="col-spaced help-box">
                <h2>Recent Articles</h2>
                <a href="/new-forum"><h4 className="new-forum-link">New Forum Post</h4></a>
                <div className="row article-sub-row">
                {things.map((stuff, id)=> 
                    <div className="col-md-6" key={stuff.id}>
                    <span className="word-wrap">
                    <BookOpen className="book-align" />&nbsp;<Link to={`/forum/${stuff.urlParam}/${stuff.id}`}>{stuff.topic}</Link>
                    </span>
                    </div>
                    )}
                </div>
               
                {things.length > 0 ?
            <div className="row pagination-row">
            <div className="col-md-4"></div>
            <div className="col-md-4 pagination-col">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={resultCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
            />
            </div>
            <div className="col-md-4"></div>
            </div>
             : null }
                </div>
                </div>
                <div className="col-md-2">
                </div>
             </div>
             <div className="row-fluid more-help-row">
             <h2 className="more-help-heading">Still Need Help?</h2>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                <div className="row-fluid">
                <div className="col-md-4">
                <div className="col-spaced help-box center-align">
                <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.facebook.com/TheAcademistCommunity">
                <img src="/img/facebook_icon.svg" className="footerImg" width="70px"/><br/><br/>
                <strong className="align-Text">FACEBOOK</strong>
                </a>
                </div>
                </div>
                <div className="col-md-4">
                <div className="col-spaced help-box center-align">
                <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://twitter.com/the_academist">
                <img src="/img/twitter_icon.svg" className="footerImg" width="70px"/><br/><br/>
                <strong className="align-Text">TWITTER</strong>
                </a>
                </div>
                </div>

                <div className="col-md-4">
                <div className="col-spaced help-box center-align">
                <span className="social-icon pointer" onClick={this.OpenModal}>
                <img src="/img/mail_icon.svg" className="footerImg" width="70px"/><br/><br/>
                <strong className="align-Text">EMAIL</strong>
                </span>
                </div>
                </div>
                </div>
                </div>
                <div className="col-md-1">
                </div>
            </div>
            
            <ContactPopup open={this.state.opened} getInput={this.handleClose}/>
            <ForumPopup open={this.state.open} getInput={this.handleClosed} results={this.state.searchResult}/>
        </div>
        <Footer />   
        </React.Fragment>
    }
}
