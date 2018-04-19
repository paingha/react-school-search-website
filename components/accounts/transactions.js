import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import ProfileBox from '../shared/profile_box'
import {connect} from 'react-redux';
import settings from '../../settings'
import {ProfileTabs} from './profile'

export class ProfileTransactions extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            transactions: [],
            isloading: false
        };
    }

    fetchTransactions(token, user_id){
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.list_transactions.replace('{user_id}', user_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, transactions: data})
            )
        }
    }

    fetchUser(token, user_id) {
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.get_user.replace('{user_id}', user_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, user: data})
            )
        }
    }
    

    componentDidMount() {
        this.fetchUser(localStorage.token, this.props.user_id);
        this.fetchTransactions(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
            this.fetchTransactions(localStorage.token, nextProps.user_id);
        }
    }
    render(){
        if(!this.state.user && this.state.transactions.length == 0){
            return <div>
                <h1>Loading</h1>
            </div>
        }
        let {
            applicantCountry,
            coin,
            createdAt,
            criteria,
            email,
            emailVerified,
            firstName,
            gpa,
            id,
            isActive,
            isAdmin,
            isDisabled,
            lastName,
            level,
            major,
            saved,
            scholarshipCountry,
            updatedAt
        } = this.state.user;
        let { transactions } = this.state;
        return <div>
            <div className="row">
            <section className="profile-section">
                     <Navbar />  
                    
                    <div className="row-fluid hero-box">
                        <div className="col-md-12">
                            <div className="headline-box">
                            <h1 className="home-headline">Welcome {firstName} {lastName} </h1>
                             
                            </div>
                        </div>
                        <div className="col-md-6">

                            </div>
                        </div>
                    
                </section>
                
                </div>
                <div className="row">
                <section className="profile-section-2">
                <div className="story-box">
                <div className="row">
                <div className="col-md-4 col-sm-12">
                             <ProfileBox userData={this.state.user}/>
                </div>
                                <div className="col-md-8 col-sm-12">
                              <div className="col-spaced box">
                              <ProfileTabs />
                              <table className="table">
                                <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Coins</th>
                                    <th>Paid With</th>
                                    <th>Currency</th>
                                    <th>Reference Code</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map((transaction, id)=>
                                <tr key={id} >
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.coin}</td>
                                    <td>{transaction.payWith}</td>
                                    <td>{transaction.currency}</td>
                                    <td>{transaction.reference}</td>
                                </tr>

                                )}
                                </tbody>
                            </table>
                                   </div></div>
                        </div>
                        </div>
                </section>
                </div>  
                </div>
        
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(ProfileTransactions);