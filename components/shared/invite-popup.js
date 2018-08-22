import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import settings from '../../settings'
import {Link2, Send} from 'react-feather'
import {toastr} from 'react-redux-toastr'
export default class InvitePopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            open: this.props.open,
            sent: false,
            referralLink: this.props.referralLink,
            to: '',
            from: this.props.from,
            name: this.props.name,
        }
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    onOpenModal() {
        this.setState({ open: true });
      };
    
      onCloseModal() {
        this.setState({ open: false }, ()=>{
            this.props.getInput(this.state.open);
        });
        
      };

    componentDidMount() {
    }


     componentWillReceiveProps(nextProps) {
        if (!this.props.open && !!nextProps.open) {
            this.setState({open: nextProps.open});
        }
    } 
    inviteNow(){
        this.sendInvite(localStorage.token)
    }
    sendInvite(token) {
        this.setState({isloading: true});
        const {referralLink, to, from, name} = this.state;
        if (token && to) {
            fetch(settings.urls.send_invite, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
                body: JSON.stringify({referralLink, to, from, name})
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, sent: true, to: ''}, ()=> {
                    //success toastr
                    toastr.success('Success!', 'Invitation Sent Successfully')
                })
            )
        }
        else{
        this.setState({isloading: false}, ()=>{
            toastr.error('Error!', 'Fill all required fields')
        })
    }
    }
    
    render(){
        
        let {open, to} = this.state;
        return(
        <Modal className="more-modal" open={open} onClose={this.onCloseModal} showCloseIcon={true} little>
        {this.state.isloading ?
        <img className="popup-button-puff" src="/img/puff.svg"/>
        :   <React.Fragment>
            <div className="more-modal">
            <p className="gpa-result">Refer A Friend</p>
            <span className="major-select"><input type="text" placeholder="Invitee Email" className="textInput"
                                   value={to} onChange={e=>this.setState({to: e.target.value})}/></span>
            </div>
            <p>Separate emails with a comma to send to multiple email addresses</p>
            <div className="more-modal"><button className="search-btn aligner" onClick={()=>this.inviteNow()}><Send className="user-icon"/> <span className="user-info">Send Invite</span></button></div>
            </React.Fragment>
        }
        </Modal>
        );
    }
}