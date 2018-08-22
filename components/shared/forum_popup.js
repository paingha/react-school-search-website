import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import settings from '../../settings'
import {Link2, BookOpen} from 'react-feather'
import {Link} from 'react-router-dom';
export default class ForumPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            results: this.props.results,
            open: this.props.open,
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
        if (!this.props.results) {
            this.setState({results: nextProps.results});
        }
        //console.log(nextProps.results)
    }

    
    render(){
        let {open, results} = this.state;
        return(
        <Modal className="more-modal" open={open} onClose={this.onCloseModal} showCloseIcon={true} little>
        {!this.state.results ?
        <h1>Loading</h1>
        :   <React.Fragment>
            <div className="more-modal">
            <h1 className="home-headline">Search Results</h1>
            <div className="row article-sub-row">
            {results.map((result, id)=>
            <div className="col-md-6" key={result.id}>
            <span className="word-wrap">
            <BookOpen className="book-align" />&nbsp;<Link to={`/forum/${result.urlParam}/${result.id}`}>{result.topic}</Link>
            </span>
            </div>
            )}
            </div>
            </div>
            </React.Fragment>
        }
        </Modal>
        );
    }
}