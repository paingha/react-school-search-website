import React, {Component} from 'react'
import {Compass} from 'react-feather'
import Section1 from './shared/section1'
import {MobileSidebar} from './shared/mobile_sidebar'
import {connect} from 'react-redux';
import settings from '../settings';
import Modal from 'react-responsive-modal'
import Footer from './shared/footer'
import FileViewer from 'react-file-viewer';
import {toastr} from 'react-redux-toastr'
import cookie from 'react-cookies'
let container;
let range = (start,end) => {
    let list = [];

    for(let i=start; i<=end; i++)
        list.push(i);

    return list;    
  };
  
  
class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.getStore();
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    componentWillMount(){
        let cookieStuff = cookie.load('rewardTerms') || 0;
        this.setState({ noneRewardModal: cookieStuff})
        if (cookie.load('rewardTerms') == 1){
            this.setState({ open: false, agreed: true})
        }
    }
    onOpenModal() {
        this.setState({ open: true });
      };
    
      onCloseModal() {
        this.setState({ open: false });
      };
    
      agree(){
          this.setState({agreed: true, open: false},()=>{
            console.log(this.state.agreed);
            console.log(this.state.open);
            this.createCookie();
          })
      }
    
    clickNext() {
        this.refs.body.className = "modal-body body-get-started is-showing animate-out";
        setTimeout(()=>this.props.onNext(), 500);
    }
    createCookie(){
        const expires = new Date()
        expires.setDate(expires.getDate() + 3)
        cookie.save('rewardTerms', 1, 
        {
            path: '/get_reward',
            expires,
            maxAge: 259200,
          }
    )
    }
    getReward(reward) {
        //post request here
        if (this.state.agreed){
        let rewardType = reward;
        console.log("User ID " + this.props.currentUser)
        return fetch(settings.urls.get_reward.replace('{user_id}', this.props.currentUser), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            body: JSON.stringify({rewardType})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.refs.body.className = "modal-body body-get-started is-showing animate-out";
                setTimeout(()=>{
                    this.props.onNext()
                }, 500);
            })
        }
        else{
            setTimeout(()=> {
                toastr.error('Error!', 'Please accept terms and conditions')
            }, 10);
            setTimeout(()=> {
                this.setState({open: true})
            }, 6000);
        }
    }
    onError(e) {
        console.log(e);
      }
    render () {
        const {open, agreed} = this.state;
        const file = '/doc/reward-terms.docx'
        const type = 'docx'
        return (
            <div ref="body" className="pricing-table">
            
    <ul className="pricing-cards monthly-pricing-cards clearfix">
        <li className="col-xs-12 col-md-4 pricing-card basic">
          <div className="pricing-card-inner pricing-match-height">
            <h3>3 Referrals</h3>
            <span className="monthly">
              <p className="pricing-number">1</p>
              <h4>free coin</h4>
              <button className="navbar-btn aligner" onClick={()=>this.getReward(3)}>Redeem!</button>
            </span>
            
          </div>
        </li>
        <li className="col-xs-12 col-md-4 pricing-card professional">
          <div className="pricing-card-inner pricing-match-height">
            <h3>10 Referrals</h3>
            <span className="monthly">
              <p className="pricing-number">$1,000</p>
              <h4>prize draw</h4>
              <button className="navbar-btn aligner" onClick={()=>this.getReward(10)}>Redeem!</button>
            </span>
            
          </div>
        </li>
        <li className="col-xs-12 col-md-4 pricing-card high-volume">
          <div className="pricing-card-inner pricing-match-height">
            <h3>25 Referrals</h3>
            <span className="monthly">
              <p className="pricing-number">$5,000</p>
              <h4>prize draw</h4>
              <button className="navbar-btn aligner" onClick={()=>this.getReward(25)}>Redeem!</button>
            </span>
            
          </div>
        </li>
    </ul>
    <Modal className="terms-doc" open={open} onClose={this.onCloseModal} showCloseIcon={false} little>
    <div className="doc-constraint">
    <FileViewer
        className="react-plyr"
        fileType={type}
        filePath={file}
        onError={this.onError}
        />
    <button className="agree-btn aligner" onClick={()=>this.agree()}>I Agree</button>
    </div>
    </Modal>
    </div>
        );
    }
}


class Step3 extends Component {
    clickNext() {
        this.props.onNext();
    }
    componentDidMount(){
        
    }
    
    render () {
        return (
            <div className="row coin_succeess">
            <div className="col-md-4">
            </div>
            <div className="col-md-4 col-sm-12">
                <div className="col-spaced box">
                <div className="align-success aligned">
            <svg id="createdAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
            <path id="createdAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
            <circle id="createdAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id="createdAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
            </svg></div>
                    <p className="success_text">Congratulations on your Reward! <br/>Keep Referring for more rewards!</p>
                  
                </div>
            </div>
            <div className="col-md-4">
            </div>
            <br />
            <br />
            </div>
        );
    }
}


/*
class StepsHeader extends Component{

    render () {
        const {step, total_steps} = this.props;
       
        return (
            this.props.total_steps<=0 ? null :
            <div className="row">
                <section className="five-simple-steps _6">
                    <div className="row centered">
                        <div className="col-xs-12">
                            <br/><br/><br/>
                            <ul className="steps-nav">
                                <div className="line"></div>
                                {
                                    range(1,this.props.total_steps)
                                    .map((s) => 
                                        <li key={`step-${s}`} className={step===s ? "steps active" : "steps"}>
                                            <a className="buy_coin_a" href="#" data-scroll="false">
                                                <h2>{s}</h2>
                                                <p>Step {s}</p>
                                            </a>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
*/


export class RewardMe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            open: false,
            fetching: false,
            created: false,
            coinNumber: 0,
            coinPrice: 0,
            userid: 0,
            open: true,
            agreed: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id) {
             this.setUser(nextProps.user_id);
             console.log("next props")
        console.log(this.props.user_id)
         } 
     }
    redirectFunc(){
      }
    
    setUser(user){
        this.setState({userid: user}, ()=>{
            console.log(user)
            console.log("User id state")
            console.log(this.state.userid)
        })
    }

     
    throwAwayModal = () => {
        this.refs.wrapper.className = "modal-wrap animate-up";
        setTimeout(this.setStep(3), 600); //next step - show nothing
    };


    getStore = () => ({...this.state});
    

    updateStore = (update) => this.setState(update);
    
    
    render() {
        const {step, userid} = this.state;

        if (step>2) return null; // show nothing 

        return (
            <React.Fragment>
            <div className="container-fluid">
            <div ref="wrapper" className="buy_coin">
                <Section1 title="Get Rewards"/>
                <div className="modal-bodies">
                    {
                        step===1 && 
                        <Step1 
                            currentUser={this.state.userid}
                            onNext={() => this.setState({step: 2})} 
                            getStore={() => this.getStore()} 
                            updateStore={(u) => this.updateStore(u)}
                        />
                    }
                    
                    {
                        step===2 && <Step3 onNext={() => this.redirectFunc()}/>
                    } 
                </div>
            </div>
            </div> 
            <Footer />
            </React.Fragment>
       );
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(RewardMe);