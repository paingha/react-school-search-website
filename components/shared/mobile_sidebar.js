import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Collapse} from 'react-bootstrap'

export class MobileSidebar extends Component {
    render() {
        let loggedIn;
        if(localStorage.token == null){
            loggedIn = (
                <React.Fragment>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                </React.Fragment>
            )
        }
        else{
            loggedIn = (
                <React.Fragment>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                </React.Fragment>
            )
        }
        const expanded = this.state && this.state.expanded;
        return (
            <section className="mobile-nav"><nav className="navbar navbar-default navbar-static-top mobile-nav-1" role="navigation">
                <div className="container">
                    {/*<!-- Brand and toggle get grouped for better mobile display -->*/}
                    <div className="navbar-header">
                        <button type="button" className={'navbar-toggle navbar-left'+(expanded?'':' collapsed')}
                                onClick={()=>this.setState({expanded: !expanded})}>
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>

                        <div className="navbar-brand navbar-brand-centered">
                        </div>
                    </div>
                    {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                    <Collapse in={expanded}>
                        <div className="collapse navbar-collapse" id="navbar-brand-centered">
                            <ul className="nav navbar-nav navbar-right" onClick={()=>this.setState({expanded: false})}>
                                <li></li>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about_us">About Us</Link></li>
                                <li><Link to="/gpa-calculator">GPA Calculator</Link></li>
                                <li><Link to="/school-search">School Search</Link></li>
                                <li><Link to="/scholarship-search">Scholarship Search</Link></li>
                                <li><Link to="/admission-processing">Admissions</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/forum">Forum</Link></li>
                                {loggedIn}
                            </ul>
                        </div>
                    </Collapse>
                </div>
            </nav></section>
        );
    }
}