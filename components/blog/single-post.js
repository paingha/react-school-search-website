import React, {Component} from 'react';
import Navbar from '../shared/navbar';
import settings from '../../settings'
import Footer from '../shared/footer'
import {MobileSidebar} from '../shared/mobile_sidebar'
import { Match, Link } from 'react-router-dom'
import {User, Share, Share2} from 'react-feather'
import Moment from 'react-moment';
import {Helmet} from "react-helmet";
import BlogComments from './comments'
import NewBlogComment from './new-comment'
import NotLoggedin from './not-loggedin'

export class SinglePost extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.blog_id,
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
        this.getBlog(id);
        this.moreComments(id);
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps) {
        //console.log('willreceiveprops', nextProps.isCreated)
        if(nextProps.isCreated != this.props.isCreated){
            this.getBlog(this.state.id)
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
    getBlog = (blogid) => {                
        this.setState({isloading: true});
            fetch(settings.urls.get_singleblog.replace('{blog_id}', blogid ), {
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
    moreComments = (blogid) => {   
        let {commentNo} = this.state             
        this.setState({isloading: true, commentNo: this.state.commentNo + 5});
            fetch(settings.urls.get_singleblog.replace('{blog_id}', `${blogid}?limit=${commentNo}` ), {
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
            return <div className="container-fluid"> 
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
                <div className="col-md-4 forum-report">
                <Share2 />
                <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.theacademist.com${pathname}&quote=${topic}`}><img src="/img/facebook_icon.svg" className="footerImg" width="32px"/></a>&nbsp;
                <a href={`https://www.twitter.com/intent/tweet?url=https://www.theacademist.com${pathname}&via=the_academist&text=${topic}`}><img src="/img/twitter_icon.svg" className="footerImg" width="32px"/></a>&nbsp;
                <a href={`http://www.linkedin.com/shareArticle?mini=true&url=https://www.theacademist.com${pathname}&title=${topic}&source="The Academist"`}><img src="/img/linked_in.svg" className="footerImg" width="32px"/></a>
                </div>
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
            <Footer />
            </div>
        }
        let {topic, content, by, comments, createdAt, id, featuredImage} = this.state.thing;
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
<meta property='og:image' content={`${featuredImage}`}/>
<meta name="twitter:image" content={`${featuredImage}`}/>

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
    <div className="col-md-4 forum-report">
    <Share2 />&nbsp;&nbsp;
    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.theacademist.com${pathname}`}><img src="/img/facebook_icon.svg" className="footerImg" width="32px"/></a>&nbsp;
    <a href={`https://www.twitter.com/intent/tweet?url=https://www.theacademist.com${pathname}&via=the_academist&text=${topic}`}><img src="/img/twitter_icon.svg" className="footerImg" width="32px"/></a>&nbsp;
    <a href={`http://www.linkedin.com/shareArticle?mini=true&url=https://www.theacademist.com${pathname}&title=${topic}&source="The Academist"`}><img src="/img/linked_in.svg" className="footerImg" width="32px"/></a>
    </div>
    </div>
    <br/>
    <img className="blog-single-img" src={`${featuredImage}`} />
    <br/>
    <span className="content" dangerouslySetInnerHTML={{__html: content}}></span>
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
}
