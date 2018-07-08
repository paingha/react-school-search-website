import React, {Component} from 'react'
import { render } from "react-dom";
import Navbar from './shared/navbar'
import Footer from './shared/footer'
import {Play} from 'react-feather'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Plyr from 'react-plyr';

export class Home extends Component {
    //svg background color #FFB770
    constructor(props) {
        super(props)
        this.state = {
          open: false,
          showCloseIcon: false,
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
      }
    
    
      onOpenModal() {
        this.setState({ open: true });
      };
    
      onCloseModal() {
        this.setState({ open: false });
      };
          render () {
        const { open, showCloseIcon } = this.state;
        return (
            <div className="container-fluid">
            <div className="row">
            <section className="section1">
                     <Navbar />  
                    
                    <div className="row-fluid hero-box">
                        <div className="col-md-6">
                            <div className="headline-box">
                            <h1 className="home-headline">Welcome to The Academist </h1>
                            <p className="home-text">Where Education Transcends Borders</p>
                            <p className="home-text-paragraph">A reliable host where students are empowered with adequate information that helps shape their academic careers outstandingly.</p>
                            <div className="row">
                            <div className="col-md-6">
                            <div className="col-spacer">
                            <a href="/register"><input type="submit" className="home-button" value="Get Started" /></a>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="col-spacer-2">
                            <button className="home-button-2 aligner" onClick={this.onOpenModal} ><Play className="user-icon" /> <span className="learn-more-text">Learn More</span></button>
                            <Modal className="video-modal" open={open} onClose={this.onCloseModal} showCloseIcon={showCloseIcon} little>
                            <Plyr
                                type="video"
                                autoplay
                                url="https://www.theacademist.com/wp-content/uploads/2018/02/videoplayback.mp4"
                                onEnd={this.onCloseModal}
                                />
                            </Modal>
                            </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img className="featured-img" src="/img/Website_0_main-illustration.png" />
                            </div>
                        </div>
                    
                </section>
                <svg className="curve-down" id="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <style type="text/css">
                  { `.st0{fill:#f6f9fc;}`}
                   { `.st1{background: url(./img/curve_down_background.JPG);
    background-repeat: no-repeat;
    background-size: auto;}`}
                  </style>
                  <defs>
        <pattern id="img1" patternUnits="userSpaceOnUse" width="53" height="15">
            <image className='twombly' xlinkHref="./img/curve_down_background.JPG" x="0" y="0"
                width="53" height="15" />
        </pattern>

    </defs>
                  
                  <g>
                          <rect id="path-1" x="0.1" className="st0" width="380.9" height="52" />
                      </g>
                  <path width="380.9" height="52" fill="url(#img1)" d="M0 0 C 50 100 80 100 100 0 Z"/>
              </svg>

                </div>
                <div className="row">
                <section className="section2">
                <div className="story-box">
                <div className="row">
                              <div className="col-md-4 col-sm-12">
                              <div className="col-spaced box">
                                    <img src="./img/Website_2.png" className="hero-img" />
                                    <h4 className="hero-heading-1"><a href="/school-search/by-gpa">SEARCH SCHOOL BY GPA</a></h4>
                                    <p className="story-paragraph-1">Personalize your evaluated GPA to search for schools you might qaspiring to study thereualify for and the opportunities abound. Search schools based on your GPA</p>
                                   
                                   </div></div>
                              <div className="col-md-4 col-sm-12"><div className="col-spaced box">
                                    <img src="./img/Website_3.png" className="hero-img" />
                                    <h4 className="hero-heading-2"><a href="/scholarship-search">SCHOLARSHIP SEARCH</a></h4>
                                    <p className="story-paragraph-2">Over 3,000 scholarships are made available specifically for international students. Find out which you qualify for!!!</p>
                                    
                              </div></div>
                              <div className="col-md-4 col-sm-12"><div className="col-spaced box">
                                    <img src="./img/Website_4.png" className="hero-img" />
                                    <h4 className="hero-heading-3"><a href="/gpa-calculator">GPA CALCULATOR</a></h4>
                                    <p className="story-paragraph-3">As an aspiring undergraduate/graduate student, evaluate your GPA to the US and Canada grade system; and it’s eligibility to your school of interest.</p>
                                   
                              </div></div>
                        </div>
                        </div>
                </section>
                </div>
                <div className="row">
                <section className="section4">
                <div className="row-fluid full-height">
                    <div className="col-md-6 stands-for">
                    <h2>WHAT THE ACADEMIST STANDS FOR?</h2>
                    <ul>
                        <li>Source of college scholarship opportunities for international students, both at the graduate and undergraduate level</li>
                        <li>Admission information to over 50 million students around the world</li>
                        <li>Platform to share and recognize the different experiences from U.S. &#38; Canadian students</li>
                        <li>The link between international students already in the U.S &#38; Canada and those aspiring to study there</li>
                    </ul>
                    <a className="center-btn" href="/about-us">Read More</a>
                    </div>
                    <div className="col-md-6 no-padding-md">
                        <img className="how-to-search-img" src="/img/how-to-search.png"/>
                    </div>
                </div>
                </section>
                </div>
                <div className="row">
                <section className="section3">
                <div className="row-fluid multi-countries-row">
                    <div className="col-md-6">
                        <img className="multi-country-img" src="./img/Website_5.png" />
                    </div>
                    <div className="col-md-6 column-text-push">
                    <h3 className="multi-country-heading">“Greatest barrier to education abroad: Cost. 80% of students require financial assistance in order to participate”<span className="by-side"> – Canadian Bureau of International Education</span></h3>
                    <p>The U.S. and Canada being top destinations for international students, has over $19 billion worth of scholarships where you can tap from. Let’s source this information to you, and help shape your academic career outstandingly</p>
                    </div>
                </div>
                </section>
                </div>
                <div className="row">
                <section className="section5">
                <div className="row-fluid testimonial-row">
                <h2 className="testimonial-heading">TESTIMONIALS</h2>
                <h4 className="testimonial-subheading">– Read from those who have exceeded borders –</h4>
                <div className="testimonial-wrapper">
                    <figure className="snip1192">
                    <blockquote>As an international student already studying in the U.S., I was almost dropping out of college due to lack of finances. A friend told me about this platform, since then I have had more than enough information to further my studies here.</blockquote>
                    <div className="author">
                        <img src="/img/test1.jpg" alt="sq-sample1"/>
                        <h5>ALEX <span> BOSTON, USA</span></h5>
                    </div>
                    </figure>
                    <figure className="snip1192 hover">
                    <blockquote>Although I had as much information I as needed, yet I got lost while trying to find the right fit. I just didn’t know how and where to apply the information I had. This is where The Academist came in and through its scholarship information, I have 75% of my 2018 tuition taken care of. I am still using its tool to find the remaining 25%, Lol.</blockquote>
                    <div className="author">
                        <img src="/img/test2.jpg" alt="sq-sample24"/>
                        <h5>SELASSIE R.<span> MEKELE, ETHIOPIA</span></h5>
                    </div>
                    </figure>
                    <figure className="snip1192">
                    <blockquote>Being a student currently admitted into college in Saskatchewan for the Fall; I am taking full advantage of all information from this website. It has made coming to Canada a good start and a pleasant experience so far. Keep it up guys.</blockquote>
                    <div className="author">
                        <img src="/img/test3.png" alt="sq-sample29"/>
                        <h5>AARADHYA<span> INDIA</span></h5>
                    </div>
                    </figure>
                </div>
                </div>
                </section>
                </div>
                <Footer />
            </div>
        );
    }
}