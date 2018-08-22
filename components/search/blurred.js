import React, {Component} from 'react'
import {Search, DollarSign, Calendar, Edit, Lock, Heart, Check, X} from 'react-feather'
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';

export default class Blurred extends Component{

    render(){
        let blurredArray = this.props.BlurredArray;
        let splicedArray = blurredArray.splice(1);
        return(
            <React.Fragment>
            {splicedArray.map((spliced, id)=>
            <div className="row">
            <div className="col-md-1">
            </div>

                        
                        <div key={id} className="col-md-10 col-sm-12">
                        <div className="col-spaced box">
                        <div className="row">
                            <div className="col-md-5">
                            <h3 className="word-wrap blur"><TextTruncate
                                line={3}
                                truncateText="…"
                                text={spliced.name}
                            /></h3>
                            </div>
                            <div className="col-md-3">
                            <div className="aligner"><DollarSign className="dollar-icon" />
                            <span className="search-info"><h3 className="blur">{spliced.amount}</h3></span></div>
                            </div>
                            <div className="col-md-4">
                            <div className="aligner"><Calendar className="date-icon" />
                            <span className="search-info"><h3 className="blur">
                            { spliced.deadline !== null ?
                                
                                <Moment parse="D/MMM/YYYY" format="MMMM Do">
                                {spliced.deadline}
                                </Moment> :
                                <span>N/A</span>
                            }  
                            </h3></span></div>
                            </div>
                        </div>
                        
                        <div className="row search-push-down">
                            <div className="col-md-2">
                            <h4 className="blur">{spliced.criteria}</h4>
                            </div>
                            <div className="col-md-2">
                            <h4 className="blur">{spliced.applicantCountry}</h4>
                            </div>
                            <div className="col-md-1">
                            
                            </div>
                            <div className="col-md-3">
                            
                            </div>
                            <div className="col-md-4">
                            <a href={`${this.props.buyUrl}`}><button disabled className="search-btn aligner"><Lock className="user-icon"/> <span className="user-info">Buy Coin</span></button></a>
                            
                            </div>
                        </div>
                        
                        </div>

                        </div>
                        <div className="col-md-1">
            </div>
            </div>
                        )}
                </React.Fragment>
        )
    }
}