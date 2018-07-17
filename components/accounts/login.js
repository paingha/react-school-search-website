import React, {Component} from 'react'
import {connect} from 'react-redux';
import {requestLogin, receiveLogin, errorLogin} from '../../actions/user';
import settings from '../../settings';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {toastr} from 'react-redux-toastr'

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
    responseFacebook(response){
        const {fetching, error} = this.state;
        const {dispatch, history, location} = this.props;
        let email = response.email;
        let firstName = response.first_name;
        let lastName = response.last_name;
        let token = response.accessToken;
        let userId = response.userID;
        console.log(response)
        //post to facebook register api
        this.setState({fetching: true});
        return fetch(settings.urls.facebook_login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email, token, userId})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error){
                    throw Error(json.error.message || 'Unknown fetch error');
                    toastr.error('Error!', 'An error occured, please try again - facebook')
                }
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
                
            })
            .catch(error=>this.setState({fetching: false}));
    
      }
      componentClicked(){
        console.log("Clicked");
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
        //post to google register api
        let email = userObj.email;
        let firstName = userObj.givenName;
        let lastName = userObj.familyName;
        this.setState({fetching: true});
        return fetch(settings.urls.google_login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error){
                    throw Error(json.error.message || 'Unknown fetch error');
                    toastr.error('Error!', 'An error occured, please try again')
                }
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
                
            })
            .catch(error=>this.setState({fetching: false}, ()=> {
                toastr.error('Error!', 'An error occured, please try again')
            }));
    
      }
    doLogin(login, password) {
        const {dispatch, history, location} = this.props;
        console.log('location', location)
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
                if (!json.user.firstLogin){
                history.push(location.state? location.state.from : {pathname: '/'});
                }
                else{
                    history.push(location.state? location.state.from : {pathname: '/get-started'});  
                }
            })
            .catch(error=>dispatch(errorLogin(error.message)));
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
                        <span className="major-select"><input type="email" placeholder="Email" className="textInput"
                                   value={login} onChange={e=>this.setState({login: e.target.value})}/></span>
                        <span className="major-select"><input type="password" placeholder="Password" className="textInput"
                                   value={password} onChange={e=>this.setState({password: e.target.value})}/></span>
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
                            appId="221044735203389"
                            autoLoad={false}
                            isMobile={true}
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
                            clientId="607932067834-c7accuf92bvs0m9u8gego87v61d5daoq.apps.googleusercontent.com"
                            buttonText="Google"
                            autoLoad={false}
                            className="social-button google-connect"
                            //icon={<TiSocialFacebookCircular size={30}/>}
                            onSuccess={this.responseGoogle.bind(this)}
                            onFailure={this.failureGoogle.bind(this)}
                        />
                        </div>
                        </div>
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
        error: state.user.error
    }
}

export default connect(mapper)(Login);