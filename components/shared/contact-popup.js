import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import settings from '../../settings'
import {Link2, Send} from 'react-feather'
import {toastr} from 'react-redux-toastr'
export default class ContactPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            open: this.props.open,
            sent: false,
            name: '',
            phone: '',
            content: '',
            from: ''
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
        this.sendInvite()
    }
    sendInvite() {
        this.setState({isloading: true});
        const {content, phone, name, from} = this.state;
        if (from && name && content) {
            fetch(settings.urls.contact_us, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                body: JSON.stringify({from, content, phone, name})
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, sent: true, name: '', phone: '', content: ''}, ()=> {
                    //success toastr
                    toastr.success('Success!', 'Message Sent Successfully')
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
        
        let {open, name, phone, content, from} = this.state;
        return(
        <Modal className="more-modal" open={open} onClose={this.onCloseModal} showCloseIcon={true} little>
        {this.state.isloading ?
        <img className="popup-button-puff" src="/img/puff.svg"/>
        :   <React.Fragment>
            <div className="more-modal">
            <p className="gpa-result">Contact Us</p>
            <span className="major-select"><input type="text" placeholder="Your Name" className="textInput"
                                   value={name} onChange={e=>this.setState({name: e.target.value})}/></span>

            <span className="major-select"><input type="text" placeholder="Your Email" className="textInput"
                                   value={from} onChange={e=>this.setState({from: e.target.value})}/></span>

            <span className="major-select"><input type="text" placeholder="Your Phone Number" className="textInput"
                                   value={phone} onChange={e=>this.setState({phone: e.target.value})}/></span>

            <span className="major-select"><textarea placeholder="Message" className="textInput"
                                   value={content} onChange={e=>this.setState({content: e.target.value})}/></span>
            </div>
            <br/>
            <div className="more-modal"><button className="search-btn aligner" onClick={()=>this.inviteNow()}><Send className="user-icon"/> <span className="user-info">Send Message</span></button></div>
            </React.Fragment>
        }
        </Modal>
        );
    }
}