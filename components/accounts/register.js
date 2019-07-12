import React, {Component} from 'react'
import settings from '../../settings';
import FacebookLogin from 'react-facebook-login';
import {withRouter} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { parse } from 'query-string';
import {toastr} from 'react-redux-toastr'
import KeyboardEventHandler from 'react-keyboard-event-handler';
const RegisterSuccess = () =>
    <div className="container-fluid register-wrapper-background aligned">
        <svg id="successAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
            <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
            <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id="successAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
        </svg>
        <div className="email-confirmed-wrapper">
            <div className="container-fluid">
                <div className="row paddings"></div>
                <div className="container-fluid">
                    <div className="row">
                        <h1 className="grey move-center">Thank you for signing up</h1>
                        <p className="grey move-center bottom-pad">Verify your email to begin searching for scholarships </p>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            fetching: false,
            error: undefined,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            refCode: '',
            redirectScholarship: false
        };
        this.componentClicked = this.componentClicked.bind(this);
    }
    componentDidMount(){
        const {history, location} = this.props;
        const query = parse(location.search);
        if(localStorage.token){
            history.push(location.state? location.state.from : {pathname: '/'});
        }
        if(query.referrer){
            this.setState({redirectScholarship: true})
        }
        if(query.ref){
            this.setState({refCode: query.ref})
        }
        
    }
    async responseFacebook(response){
        const {fetching, error, registered} = this.state;
        let email = response.email;
        let firstName = response.first_name;
        let lastName = response.last_name;
        let token = response.accessToken;
        let userId = response.userID;
        //post to facebook register api
        console.log(response)
        this.setState({fetching: true});
        await fetch(settings.urls.facebook_register, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, email, token, userId})
        })
            .then(response=>response.json())
            .then(json=>{
                console.log(json)
                if (json.error){
                    //toastr.error('Error!', 'Account already exists or an error occured')
                    //this.setState({fetching: false});
                    let error = json.error
                    if (error.status == 409){
                        toastr.error('Error!', 'User already exists please login')
                        this.setState({fetching: false});
                    }
                    else if (error.status == 500){
                        toastr.error('Error!', 'An error occured please try again')
                        this.setState({fetching: false});
                    }
                }
                else{
                this.setState({fetching: false, registered: true}, ()=>{
                    //toastr.success('Success!', 'Profile Updated Successfully')
                });
            }
            })
            .catch(error=>this.setState({fetching: false}, ()=>{
                //toastr.error('Error!', 'An error occured, please try again')
                console.log(error)
            }));
    
      }
      componentClicked(){
        //console.log("Clicked");
      }
      facebookFailure(response){
        toastr.error('Error!', 'An error occured, please try again')
      }
      async responseGoogle(response){
        const {fetching, error, registered} = this.state
        let userObj = response.profileObj;
        //post to google register api
        let email = userObj.email;
        let firstName = userObj.givenName;
        let lastName = userObj.familyName;
        this.setState({fetching: true});
        await fetch(settings.urls.google_register, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, email})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error){
                    //toastr.error('Error!', 'Account already exists or an error occured')
                    //this.setState({fetching: false});
                    let error = json.error
                    if (error.status == 409){
                        toastr.error('Error!', 'User already exists please login')
                        this.setState({fetching: false});
                    }
                    else if (error.status == 500){
                        toastr.error('Error!', 'An error occured please try again')
                        this.setState({fetching: false});
                    }
                }
                else{
                this.setState({fetching: false, registered: true}, ()=>{
                    //toastr.success('Success!', 'Profile Updated Successfully')
                });
            }
            })
            .catch(error=>this.setState({fetching: false}, ()=> {
                //toastr.error('Error!', 'An error occured, please try again')
                console.log(error)
            }));
    
      }
    
    doRegister() {
        const {firstName, lastName, email, password, confirmPassword, refCode} = this.state;
        
        if ( email == ""){
            toastr.error('Error!', 'A valid email is required')
        }
        else if ( firstName == ""){
            toastr.error('Error!', 'First Name is required')
        }
        else if ( lastName == ""){
            toastr.error('Error!', 'Last Name is required')
        }
        else if ( password == ""){
            toastr.error('Error!', 'Password is required')
        }
        else{
        if ( password == confirmPassword){
            this.setState({fetching: true, error: undefined});
        return fetch(settings.urls.register.replace('{referral}', refCode), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, email, password})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.setState({fetching: false, error: undefined, registered: true});
            })
            .catch(error=>this.setState({fetching: false, error: error.message}));
        }
        else {
            this.setState({error: 'Passwords do not match', fetching: false});
        }
    }
    }
    

    render() {
        const {registered, error, fetching, firstName, lastName, email, password, confirmPassword} = this.state;
        if (registered)
            return <RegisterSuccess/>;

        return (
            <div className="container-fluid register-wrapper-background">
            {this.state.redirectScholarship == true?
                <div className="row scholarship-register-row">
                    <span>Register an Account to view Scholarships</span>
                </div>
                :null
            }
                <div className="row row-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 register-padding">
                        <div className="register-inner-box">
                        <h3 className="register-header">Register An Account</h3>
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doRegister()} >
                        <input type="text" placeholder="First Name" className="textInput"
                                value={firstName} onChange={e=>this.setState({firstName: e.target.value})}/>
                        </KeyboardEventHandler>
                        </span>
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doRegister()} >
                        <input type="text" placeholder="Last Name" className="textInput"
                                value={lastName} onChange={e=>this.setState({lastName: e.target.value})}/>
                        </KeyboardEventHandler>
                        </span>
                            {/*<input type="text" placeholder="Username" className="register-input"/>*/}
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doRegister()} >
                        <input type="email" placeholder="Email" className="textInput"
                                   value={email} onChange={e=>this.setState({email: e.target.value})}/>
                        </KeyboardEventHandler>          
                        </span>
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doRegister()} >
                        <input type="password" placeholder="Password" className="textInput"
                                   value={password} onChange={e=>this.setState({password: e.target.value})}/>
                        </KeyboardEventHandler>          
                        </span>
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doRegister()} >
                        <input type="password" placeholder="Confirm Password" className="textInput"
                                   value={confirmPassword} onChange={e=>this.setState({confirmPassword: e.target.value})}/>
                        </KeyboardEventHandler>           
                        </span>
                            {error && <div className="register-validation-error">{error}</div>}
                            {fetching?
                                <div className="register-button"><img className="register-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="register-button" value="Register" onClick={()=>this.doRegister()}/>
                            }
                            
                        </div>
                        <br />
                        <div className="row">
                        <div className="col-md-6">
                        <FacebookLogin
                            appId="198600234003675"
                            autoLoad={false}
                            textButton="Facebook"
                            fields="first_name, last_name ,email"
                            cssClass="social-button facebook-connect"
                            //icon={<TiSocialFacebookCircular size={30}/>}
                            //onClick={this.componentClicked}
                            onFailure={this.facebookFailure.bind(this)}
                            callback={this.responseFacebook.bind(this)} />
                             </div>
                        <div className="col-md-6">
                        <GoogleLogin 
                            clientId="638073687773-flr8fq4sifc9eue2bs4001dr23rjjtb4.apps.googleusercontent.com"
                            buttonText="Google"
                            autoLoad={false}
                            className="social-button google-connect"
                            //icon={<TiSocialFacebookCircular size={30}/>}
                            onSuccess={this.responseGoogle.bind(this)}
                            //onFailure={this.failureGoogle.bind(this)}
                        />
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doRegister()} >
                        </KeyboardEventHandler>
                        </div>
                        </div>
                        <span className="register-link">Already have an Account? &nbsp;<a href="/login"><strong>Login</strong></a>
                        <br />Forgot your Password? &nbsp;<a href="/forgot"><strong>Reset Here</strong></a>
                        </span>
                    </div>
                    <div className="col-md-4"></div>
                    
                </div>
            </div>
        );
    }
}