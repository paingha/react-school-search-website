import React, {Component} from 'react'
import {connect} from 'react-redux';
import {requestLogin, receiveLogin, errorLogin} from '../../actions/user';
import settings from '../../settings';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {toastr} from 'react-redux-toastr'
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '', 
            password:'',
            fetching: false,
            error: undefined,
        };
    }
    componentDidMount(){
        const {history, location} = this.props;
        if(localStorage.token){
            history.push(location.state? location.state.from : {pathname: '/'});
        }
        
    }
    async responseFacebook(response){
        const {fetching, error} = this.state;
        const {dispatch, history, location} = this.props;
        let email = response.email;
        let firstName = response.first_name;
        let lastName = response.last_name;
        let token = response.accessToken;
        let userId = response.userID;
        //console.log(response)
        //post to facebook register api
        this.setState({fetching: true});
        //dispatch(requestLogin());
        //console.log(JSON.stringify({email, token, userId}))
        await fetch(settings.urls.facebook_login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email, token, userId})
        })
            .then(response=>response.json())
            .then(json=>{
                //console.log(json)
                if (json.error){
                    let error = json.error
                    if (error.status == 401){
                        toastr.error('Error!', 'User not registered or email not verified')
                        this.setState({fetching: false});
                    }
                    else if (error.status == 500){
                        toastr.error('Error!', 'An error occured please try again')
                        this.setState({fetching: false});
                    }
                }
                else{
                dispatch(receiveLogin(json));
                localStorage.token = json.token;
                if (!json.user.firstLogin){
                    this.setState({fetching: false}, ()=> {
                history.push(location.state? location.state.from : {pathname: '/'});
                });
                }
                else{
                    this.setState({fetching: false}, ()=> {
                    history.push(location.state? location.state.from : {pathname: '/get-started'});  
                });
                }
            }
            })
        
            .catch(error=>this.setState({fetching: false}, ()=>{
                //toastr.error('Error!', 'An error occured!');
                console.log(error);
            }));
        
      }
      componentClicked(){
        //console.log("Clicked");
      }
      failureGoogle(response){
        toastr.error('Error!', 'An error occured, please try again')
      }
      facebookFailure(response){
        toastr.error('Error!', 'An error occured, please try again')
      }
      responseGoogle(response){
        const {fetching, error} = this.state;
        const {dispatch, history, location} = this.props;
        let userObj = response.profileObj;
        console.log(response);
        //post to google register api
        let email = userObj.email;
        let firstName = userObj.givenName;
        let lastName = userObj.familyName;
        this.setState({fetching: true});
        //dispatch(requestLogin());
        return fetch(settings.urls.google_login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email})
        })
            .then(response=>response.json())
            .then(json=>{
                //console.log(json)
                /*if (json.error.status == 401){
                    //throw Error(json.error.message || 'Unknown fetch error');
                    toastr.error('Error!', 'User not registered or email not verified');
                    this.setState({fetching: false});
                }
                if(json.error.status == 500 || json.error.status == 403){
                    toastr.error('Error!', 'An error occured, please try again');
                    this.setState({fetching: false});
                }*/
                if (json.error){
                    let error = json.error
                    if (error.status == 401){
                        toastr.error('Error!', 'User not registered or email not verified')
                        this.setState({fetching: false});
                    }
                    else if (error.status == 500){
                        toastr.error('Error!', 'An error occured please try again')
                        this.setState({fetching: false});
                    }
                }
                else{
                dispatch(receiveLogin(json));
                localStorage.token = json.token;
                if (!json.user.firstLogin){
                    this.setState({fetching: false}, ()=> {
                history.push(location.state? location.state.from : {pathname: '/'});
                });
                }
                else{
                    this.setState({fetching: false}, ()=> {
                    history.push(location.state? location.state.from : {pathname: '/get-started'});  
                });
                }
            }
            })
            .catch(error=>this.setState({fetching: false},()=>{
                //toastr.error('Error!', 'User not registered or email not verified');
                console.log(error)
            }));
    
      }
    doLogin(login, password) {
        const {dispatch, history, location} = this.props;
        //console.log('location', location)
        if ( login == ""){
            toastr.error('Error!', 'A valid email is required')
        }
        else if ( password == ""){
            toastr.error('Error!', 'Password is required')
        }
        else{
        dispatch(requestLogin());
        return fetch(settings.urls.login, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email: login, password: password})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                dispatch(receiveLogin(json));
                localStorage.token = json.token;
                if (json.user.firstLogin !== false){
                history.push(location.state? location.state.from : {pathname: '/get-started'});
                }
                else{
                    history.push(location.state? location.state.from : {pathname: '/'});  
                }
            })
            .catch(error=>dispatch(errorLogin(error.message)));
        }
    }


    render() {
        const {login, password} = this.state;
        const {is_fetching, error} = this.props;
        return (
            <div className="container-fluid login-wrapper-background">
                <div className="row login-row-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 login-padding">
                        <div className="login-inner-box">
                        <h3 className="login-header">Login</h3>
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doLogin(login, password)} >
                        <input type="email" placeholder="Email" className="textInput"
                                   value={login} onChange={e=>this.setState({login: e.target.value})}/>
                        </KeyboardEventHandler>
                        </span>
                        <span className="major-select">
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doLogin(login, password)} >
                        <input type="password" placeholder="Password" className="textInput"
                                   value={password} onChange={e=>this.setState({password: e.target.value})}/>
                        </KeyboardEventHandler>           
                        </span>
                            {error && <div className="d-flex text-danger">{error}</div>}
                            {this.props.is_fetching?
                                <div className="login-button"><img className="login-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="login-button" value="Login" onClick={()=> this.doLogin(login, password)}/>
                            }
                        </div>
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
                            onFailure={this.failureGoogle.bind(this)}
                        />
                        <KeyboardEventHandler
                        handleKeys={['enter', 'return']}
                        onKeyEvent={(key, e) => this.doLogin(login, password)} >
                        </KeyboardEventHandler>
                        </div>
                        </div>
                        <span className="register-link">Need an Account? &nbsp;<a href="/register"><strong>Register</strong></a>
                        <br />Forgot your Password? &nbsp;<a href="/forgot"><strong>Reset Here</strong></a>
                        </span>
                    </div>
                    <div className="col-md-4"></div>
                    
                </div>
            </div>
        );
    }
}

function mapper(state) {
    return {
        is_fetching: state.user.is_fetching,
        error: state.user.error,
        user_id: state.user.data && state.user.data.id,
    }
}

export default connect(mapper)(Login);