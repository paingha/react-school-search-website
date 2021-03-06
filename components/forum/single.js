import React, {Component} from 'react';
import Navbar from '../shared/navbar';
import {MobileSidebar} from '../shared/mobile_sidebar'
import settings from '../../settings'
import Footer from '../shared/footer'
import { Match, Link } from 'react-router-dom'
import {User, EyeOff} from 'react-feather'
import Moment from 'react-moment';
import {Helmet} from "react-helmet";
import CommentList from './comments'
import NewComment from './comment'
import NotLoggedin from './not-loggedin'
export class SingleForum extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.forum_id,
            thing: null,
            firstName: '',
            lastName: '',
            image: '',
            isloading: false,
            update: false,
            commentNo: 5
        };
        this.updateComment = this.updateComment.bind(this);
    }
    
    componentDidMount() {
        let {id} = this.state
        this.getForum(id);
        this.moreComments(id);
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isCreated != this.props.isCreated){
            this.getForum(this.state.id)
        }
    }
    updateComment(val){
        this.setState(prevState => ({
            update: !prevState.update
          }), ()=>{
          });
    }
    loadPoster(poster_id){
        this.setState({isloading: true});
            fetch(settings.urls.show_info.replace('{user_id}', poster_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, firstName: data.firstName, lastName: data.lastName, image: data.image}, ()=>{
                    //console.log(data);
                })
            )
    }
    getForum = (forumid) => {                
        this.setState({isloading: true});
            fetch(settings.urls.get_singleforum.replace('{forum_id}', forumid ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, thing: data}, ()=>{
                    this.loadPoster(data.by);
                })
            )
    }
    moreComments = (forumid) => {   
        let {commentNo} = this.state             
        this.setState({isloading: true, commentNo: this.state.commentNo + 5});
            fetch(settings.urls.get_singleforum.replace('{forum_id}', `${forumid}?limit=${commentNo}` ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, thing: data}, ()=>{
                    this.loadPoster(data.by);
                })
            )
    }
    render(){
        if(!this.state.thing){
            return <React.Fragment>
            <div className="container-fluid"> 
            <div className="row">
                <section className="help-center-section">
                    <Navbar /> 
                    <MobileSidebar /> 
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        
                        <h1 className="home-headline"><div className='text-input__loading--line'></div></h1>
                        
                        </div>
                    </div>
                    </div>
                </section>
            </div>
             
             <div className="row-fluid new-article-row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                <div className="col-spaced help-box">
               
                <div className="row article-sub-row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                <div className="row">
                <div className="col-md-4">
                <span className="forum-by"><div className='text-input__loading--line'></div></span>
                <br/>
                <span className="forum-posted-date"><div className='text-input__loading--line'></div></span>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4 forum-report"><EyeOff />&nbsp;Report</div>
                </div>
                <br/>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                <span className="content">
                <div className='text-input__loading--line'></div>
                </span>
                </div>
                
                </div>
                </div>
                </div>
                <div className="col-md-2">
                </div>
             </div>
            
            </div>
            <Footer />
            </React.Fragment>
        }
        let {topic, content, by, replies, createdAt, id} = this.state.thing;
        let {firstName, lastName, image} = this.state;
        const {pathname} = this.props.location;
        return <React.Fragment>
         <div className="container-fluid"> 
        <Helmet>
                <meta charSet="utf-8" />
                <title>{topic} | The Academist</title>

<meta name="description" content={`${content}`}/>
<meta name="keywords" content="The Academist, International, International Student, Scholarship, Grant, School, Schools, Universities"/>

<meta name="og:title" content={`${topic} | The Academist`}/>
<meta name="og:description" content={`${content}`}/>
<meta name="og:site_name" content="The Academist"/>
<meta name="og:type" content="article"/>

<meta name="twitter:site" content="The Academist" />
<meta name="twitter:title" content={`${topic} | The Academist`}/>
<meta name="twitter:description" content={`${content}`}/>
<meta name="twitter:creator" content="The Academist"/>
<meta name="twitter:card" content="photo" />
<meta name="twitter:url" content={`https://www.theacademist.com${pathname}`}/>
<link rel='canonical' href={`https://www.theacademist.com${pathname}`}/>

            </Helmet>
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <MobileSidebar />
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            <h1 className="home-headline">{topic}</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>
 
 <div className="row-fluid new-article-row">
    <div className="col-md-2">
    </div>
    <div className="col-md-8">
    <div className="col-spaced help-box">
   
    <div className="row article-sub-row">
    <div className="col-md-2"><img className="forum-poster-img" src={image} /></div>
    <div className="col-md-10">
    <div className="row">
    <div className="col-md-4">
    <span className="forum-by">By <span className="forum-poster-name">{firstName} {lastName}</span></span>
    <br/>
    <span className="forum-posted-date">Posted on &nbsp;
            <Moment format="MMM Do, YYYY">
                {createdAt}
                </Moment></span>
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-4 forum-report"><EyeOff />&nbsp;Report</div>
    </div>
    <br/>
    <span className="content" dangerouslySetInnerHTML={{__html: content}}></span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-2">
    </div>
 </div>
    <CommentList reply={replies}/>
    { replies.length > 4 ?
    <div className='blog-view-more-button-wrapper'><button onClick={() => this.moreComments(this.state.id)} className="blog-view-more-button">View More</button></div>
    : null
    }
    {!localStorage.token ?
    <NotLoggedin />
    :
    <NewComment parentForum={this.state.id} getforum = {this.getForum}/>
    }

</div>
     <Footer />
     </React.Fragment>   
    }
}