import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import settings from '../../settings'
import {Link2, Upload} from 'react-feather'
import {toastr} from 'react-redux-toastr'
export default class UploadPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            open: this.props.open,
            uploaded: false,
            userId: this.props.userId,
            key: '',
            signedRequest: null,
            awsURL: '',
            file: null,
            truthy: false
        }
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        //this.sendInvite = this.sendInvite.bind(this);
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
    sendInvite() {
        //console.log(this.state.file)
        const {key, signedRequest, awsURL, file} = this.state
        if(file == null){
            toastr.error('Error!', 'No Changes image selected')
        }
        else{
            this.setState({isloading: true}, ()=>{
                if(file != null) {
                    // Upload image to S3
                    const file = this.state.file;
                    const fileKey = Date.now() + file.name;
                    const contentType = file.type;
                    const extension = file.type
                //const {key, signedRequest, featuredImage} = this.state;
                this.setState({isloading: true});
                //change to put
                    fetch(settings.urls.upload, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
                        mode: 'cors',
                        body: JSON.stringify({contentType, extension, fileKey})
                    })
                    .then(
                        response => response.json()
                    )
                    .then(
                        data => this.setState({isloading: false, key: data.key, signedRequest: data.signedRequest}, ()=>{
                           
                            //console.log(data.url);
                            ///then
                            let thingy = this.state.file;
                            let uri = data.url;
                            const contentType = thingy.type
                const {signedRequest} = this.state;
                this.setState({isloading: true}, ()=>{
                    //console.log("2nd");
                });
                //change to put
                    fetch(signedRequest, {
                        method: 'PUT',
                        headers: {'Content-Type': contentType},
                        body: thingy
                    })   ////////////
                    
                        .then(response=>{
                            
                                
                                    let image = uri;
                                    //console.log(this.props.userId)
                                      //console.log(JSON.stringify({firstName, lastName, gpa, criteria, level, major, applicantCountry, scholarshipCountry}))
            return fetch(settings.urls.update_user_image.replace('{user_id}', this.props.userId ), {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
                mode: 'cors',
                body: JSON.stringify({image})
            })
                .then(response=>response.json())
                .then(json=>{
                    if (json.error){
                        throw Error(json.error.message || 'Unknown fetch error');
                        toastr.error('Error!', 'An error occured, please try again')
                    }
                    this.setState({isloading: false}, ()=>{
                        toastr.success('Success!', 'Profile Image Updated Successfully');
                        this.props.onUpdating();
                        this.onCloseModal;
                    });
                })
                .catch(error=>this.setState({isloading: false}));
                        })
                    }))
                }
            ///end here    
            else{
                let {image} = this.props.image;
                return fetch(settings.urls.update_user_image.replace('{user_id}', this.props.userId ), {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
                    mode: 'cors',
                    body: JSON.stringify({image})
                })
                    .then(response=>response.json())
                    .then(json=>{
                        if (json.error){
                            throw Error(json.error.message || 'Unknown fetch error');
                            toastr.error('Error!', 'An error occured, please try again')
                        }
                        this.setState({isloading: false}, ()=>{
                            toastr.success('Success!', 'Profile Image Updated Successfully');
                            this.props.onUpdating();
                            this.onCloseModal;
                        });
                    })
                    .catch(error=>this.setState({isloading: false}));
            }       
              
            })
        }
         
    }
    
    render(){
        
        let {open} = this.state;
        return(
        <Modal className="more-modal" open={open} onClose={this.onCloseModal} showCloseIcon={true} little>
        {this.state.isloading ?
        <img className="popup-button-puff" src="/img/puff.svg"/>
        :   <React.Fragment>
            <div className="more-modal">
            <p className="gpa-result">Upload Profile Picture</p>
            <input type="file" onChange={(e)=> this.setState({file: e.target.files[0]})} className="image-upload" accept="image/*" ref={ref => this.fileUpload = ref}/>
            </div>
            <p>* Only Png, gif and Jpeg images accepted</p>
            <div className="more-modal"><button className="search-btn aligner" onClick={()=>this.sendInvite()}><Upload className="user-icon"/> <span className="user-info">Upload</span></button></div>
            </React.Fragment>
        }
        </Modal>
        );
    }
}