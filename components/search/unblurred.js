import React, {Component} from 'react';
import {Search, DollarSign, Calendar, Edit, Lock, Heart, Check, X} from 'react-feather'
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';

export default class UnBlurred extends Component{
    render(){
        let blurredArray = this.props.BlurredArray;
        let blurredObj = blurredArray[0];
        let {id, name, amount, description, criteria, level, applicantCountry, country, gpa, deadline, institution, comment, url} = blurredObj;
        return(
            
            <div className="row">
                    <div className="col-md-1">
                    </div>
                                <div key={id} className="col-md-10 col-sm-12">
                                <div className="col-spaced box">
                                 <div className="row">
                                    <div className="col-md-5">
                                    <h3 className="word-wrap"><TextTruncate
                                        line={3}
                                        truncateText="…"
                                        text={name}
                                    /></h3>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="aligner">
                                    <span className="search-info"><h3>{amount}</h3></span></div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="aligner"><Calendar className="date-icon" />
                                    <span className="search-info"><h3>
                                    { deadline !== null ?
                                        
                                        <Moment parse="D/MMM/YYYY" format="MMMM Do">
                                        {deadline}
                                        </Moment> :
                                        <span>N/A</span>
                                    }  
                                    </h3></span></div>
                                    </div>
                                </div>
                                
                                <div className="row search-push-down">
                                    <div className="col-md-2">
                                    <h4>{criteria}</h4>
                                    </div>
                                    <div className="col-md-2">
                                    <h4>{applicantCountry}</h4>
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

        )
    }
}