import React, {Component} from 'react';
import Navbar from './shared/navbar';
import Footer from './shared/footer'
import {MobileSidebar} from './shared/mobile_sidebar'
import { Match, Link } from 'react-router-dom'
import {User, Share} from 'react-feather'
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import settings from '../settings';
import moment from 'moment';
import _ from 'lodash';
import {
    Tooltip,
  } from 'react-tippy';
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    PaymentRequestButtonElement,
    StripeProvider,
    Elements,
    injectStripe,
  } from 'react-stripe-elements';
  import PaypalExpressBtn from 'react-paypal-express-checkout';
import {toastr} from 'react-redux-toastr'
const handleBlur = () => {
    //console.log('[blur]');
  };
  const handleChange = change => {
    //console.log('[change]', change);
  };
  const handleClick = () => {
    //console.log('[click]');
  };
  const handleFocus = () => {
    //console.log('[focus]');
  };
  const handleReady = () => {
    //console.log('[ready]');
  };
  const createOptions = (fontSize) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, Menlo, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };
const COUNTRIES = [
    { label: 'Algeria', value: 'Algeria' },
    { label: 'Angola', value: 'Angola' },
    { label: 'Benin', value: 'Benin' },
    { label: 'Botswana', value: 'Botswana' },
    { label: 'Burkina Faso', value: 'Burkina Faso' },
    { label: 'Cameroon', value: 'Cameroon' },
    { label: 'Central African Republic', value: 'Central African Republic' },
    { label: 'Chad', value: 'Chad' },
    { label: 'Congo', value: 'Congo' },
    { label: 'Cote dIvoire', value: 'Cote dIvoire' },
    { label: 'Democratic Republic of Congo', value: 'Democratic Republic of Congo' },
    { label: 'Egypt', value: 'Egypt' },
    { label: 'Eritrea', value: 'Eritrea' },
    { label: 'Ethiopia', value: 'Ethiopia' },
    { label: 'Gabon', value: 'Gabon' },
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Guinea', value: 'Guinea' },
    { label: 'Kenya', value: 'Kenya' },
    { label: 'Liberia', value: 'Liberia' },
    { label: 'Madagascar', value: 'Madagascar' },
    { label: 'Mali', value: 'Mali' },
    { label: 'Mauritania', value: 'Mauritania' },
    { label: 'Morocco', value: 'Morocco' },
    { label: 'Mozambique', value: 'Mozambique' },
    { label: 'Namibia', value: 'Namibia' },
    { label: 'Niger', value: 'Niger' },
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'Rwanda', value: 'Rwanda' },
    { label: 'Senegal', value: 'Senegal' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'Swaziland', value: 'Swaziland' },
    { label: 'Togo', value: 'Togo' },
    { label: 'Tunisia', value: 'Tunisia' },
    { label: 'United States', value: 'United States' },
    { label: 'Zambia', value: 'Zambia' },
    { label: 'Zimbabwe', value: 'Zimbabwe' },
];
const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const GENDERS = [
	{ label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' }
];
const SCHOOL_COUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
const TIMES = [
	{ label: '9am CST', value: '9am CST' },
    { label: '10am CST', value: '10am CST' },
    { label: '11am CST', value: '11am CST' },
    { label: '12pm CST', value: '12pm CST' },
    { label: '1pm CST', value: '1pm CST' },
    { label: '2pm CST', value: '2pm CST' },
    { label: '3pm CST', value: '3pm CST' },
    { label: '4pm CST', value: '4pm CST' }
];
const SEMESTERS = [
	{ label: 'Spring', value: 'Spring' },
	{ label: 'Fall', value: 'Fall' }
];
const BOOLEAN = [
	{ label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
];
const COMMUNICATION = [
    { label: 'Email', value: 'Email' },
    { label: 'Phone', value: 'Phone' }
]
const GPAS = [
    { label: '2.0', value: '2.0' },
    { label: '2.1', value: '2.1' },
    { label: '2.2', value: '2.2' },
    { label: '2.3', value: '2.3' },
    { label: '2.4', value: '2.4' },
    { label: '2.5', value: '2.5' },
    { label: '2.6', value: '2.6' },
    { label: '2.7', value: '2.7' },
    { label: '2.8', value: '2.8' },
    { label: '2.9', value: '2.9' },
    { label: '3.0', value: '3.0' },
    { label: '3.1', value: '3.1' },
    { label: '3.2', value: '3.2' },
    { label: '3.3', value: '3.3' },
    { label: '3.4', value: '3.4' },
    { label: '3.5', value: '3.5' },
    { label: '3.6', value: '3.6' },
    { label: '3.7', value: '3.7' },
    { label: '3.8', value: '3.8' },
    { label: '3.9', value: '3.9' },
    { label: '4.0', value: '4.0' }
];

class _CardForm extends Component {
    
    constructor(props){
      super(props)
      /*this.state = {
        stripeToken: '',
      }*/
      this.state = this.props.getStore();
    }
    
    
    onStripe(e) {
        if(e.error){
           console.log(e.error.message);
           return;  
        }

        this.setState({stripeToken:e.token.id});
        this.props.updateStore({stripeToken:e.token.id});

        //call stripe submit
        this.stripeCharge(); 
        //console.log(e.token.id)
        //console.log('submitted');
         
        //this.refs.body.className = "modal-body body-get-started is-showing animate-out";

        //TODO add success/fail handler, prevent moving to next stage if payment wasnt stripped succesfully 
        //setTimeout(()=>this.props.onNext(), 600);
    }
    stripeCharge(){
        const { currencyUser, stripeToken, fetching} = this.state;
        let amount = 25*100;
        let token = stripeToken;
        let currency = currencyUser;
        //send token to stripe for charge
        //console.log(stripeToken, amount);
        fetch(settings.urls.app_stripe_pay, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({token, currency})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error){
                    throw Error(json.error.message || 'Unknown fetch error');
                    toastr.error('Error!', 'An error occured, please try again')
                }
                this.setState({fetching: false, paymentStatus: 'Paid'});
                toastr.success('Payment Success!', 'Payment Success Please Submit your application')
                
            })
            .catch(error=>{ console.log(error.message)/*this.setState({fetching: false, error: error.message});*/});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
          this.props.stripe
              .createToken()
              .then(payload => this.onStripe(payload)); //set token state with token id
            //stripeCharge(token, user_id)
        } else {
          console.log('Form submitted before Stripe.js loaded.');
        }
    };

 
    render() {
        const { stripeToken } = this.state;

        return (
        <form onSubmit={this.handleSubmit}>
            <CardElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                className="StripeElement"
                {...createOptions(this.props.fontSize)}
            />
            <img className="card-align" src="https://theacademist.herokuapp.com/img/cards.png" />
            <button className="navbar-btn aligner" >Pay</button>
        </form>
        );
    }
}
const CardForm = injectStripe(_CardForm);

export class Application extends Component{
    constructor(props){
        super(props)
        this.state = {
            country: '',
            isHidden: true,
            countryOptions: [],
            option: '',
            date: new Date(),
            open: false,
            exchangeRate: 0,
            isloading: false,
            currencySymbol: '',
            currencyCode: '',
            majors: null,
            countries: null,
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            phone: '',
            ieltsScore: '',
            satScore: '',
            greScore: '',
            gmatScore: '',
            actScore: '',
            toeflScore: '',
            ieltsScore: '',
            gender: '',
            level: '',
            schoolCountry: '',
            firstChoiceMajor: '',
            secondChoiceMajor: '',
            expectedSemesterEntry: '',
            seekingScholarship: '',
            gpa: '',
            time: '',
            comm: '',
            stripeToken: '',
            currencyUser: 'USD',
            fetching: false,
            elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
            paymentID: '',
            paymentStatus: 'Paid'
    }
    this.setDate = this.setDate.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSchoolCountryChange = this.handleSchoolCountryChange.bind(this);
    this.handleFirstMajorChange = this.handleFirstMajorChange.bind(this);
    this.handleSecondMajorChange = this.handleSecondMajorChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleScholarshipChange = this.handleScholarshipChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleCommChange = this.handleCommChange.bind(this);
}
componentDidMount(){
    //this.onOpenModal()
    this.getCurrency();
    this.fetchCountries();
    this.fetchMajors();
}

handleGenderChange (gender) {
    this.setState({ gender }, ()=>{
    });
}
handleCommChange (comm) {
    this.setState({ comm }, ()=>{
    });
}
handleLevelChange (level) {
    this.setState({ level });
}
handleCountryChange (country) {
    this.setState({ country });
}
handleSchoolCountryChange(schoolCountry){
    this.setState({ schoolCountry });
}
handleFirstMajorChange(firstChoiceMajor){
    this.setState({ firstChoiceMajor });
}
handleSecondMajorChange(secondChoiceMajor){
    this.setState({ secondChoiceMajor });
}
handleSemesterChange(expectedSemesterEntry){
    this.setState({ expectedSemesterEntry });
}
handleScholarshipChange(seekingScholarship){
    this.setState({ seekingScholarship });
}
handleGpaChange (gpa) {
    this.setState({ gpa });
}
handleTimeChange(time){
    this.setState({ time }, ()=>{
    });
}
setDate(date){
    this.setState({date}, ()=> {
    })
}
fetchMajors() {
    this.setState({isloading: true});
        fetch(settings.urls.get_majors, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        })
        .then(
            response => response.json()
        )
        .then(
            data => this.setState({isloading: false, majors: data})
        )
    
}
fetchCountries() {
    this.setState({isloading: true});
        fetch(settings.urls.get_countries, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        })
        .then(
            response => response.json()
        )
        .then(
            data => this.setState({isloading: false, countries: data})
        )
    
}
getCurrency(){
    this.setState({isloading: true});
    return fetch(settings.urls.get_currency, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
    })
    .then( 
        response => response.json() 
    )
    .then(
        data => {
            this.setState({isloading: false, currencyCode: data.geoplugin_currencyCode, currencySymbol: data.geoplugin_currencySymbol_UTF8}, ()=>{
                this.apiRequest(data.geoplugin_currencyCode);
                //console.log(this.state.currencySymbol);
            })
        }
    )
}
apiRequest(currency){
    this.setState({isloading: true});
    return fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=O6V1VXTCO92BKKL1`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then( 
        response => response.json() 
    )
    .then(
        data => {
            //console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            this.setState({isloading: false, exchangeRate: data['Realtime Currency Exchange Rate']['5. Exchange Rate']}, ()=> {
                //console.log(this.state.exchangeRate)
            })
        }
    )
}
submitApplication(){
    const { paymentStatus, comm, ieltsScore,paymentID, satScore, toeflScore, greScore, gmatScore, actScore,expectedSemesterEntry, country, seekingScholarship, gpa, time, date,firstName, lastName, email, dateOfBirth, phone, gender, level, schoolCountry, firstChoiceMajor,currencyUser, stripeToken, fetching} = this.state;
    if(firstName == ''){
        toastr.error('Error!', 'First Name is REQUIRED')
    }
    else if(lastName == ''){
        toastr.error('Error!', 'Last Name is REQUIRED')
    }
    else if(email == ''){
        toastr.error('Error!', 'Email is REQUIRED')
    }
    else if(dateOfBirth == ''){
        toastr.error('Error!', 'Date of Birth is REQUIRED')
    }
    else if(phone == ''){
        toastr.error('Error!', 'Phone Number is REQUIRED')
    }
    else if(gender == ''){
        toastr.error('Error!', 'Gender is REQUIRED')
    }
    else if(level == ''){
        toastr.error('Error!', 'Level is REQUIRED')
    }
    else if(schoolCountry == ''){
        toastr.error('Error!', 'School Country is REQUIRED')
    }
    else if(firstChoiceMajor == ''){
        toastr.error('Error!', 'First Choice Major is REQUIRED')
    }
    else if(expectedSemesterEntry == ''){
        toastr.error('Error!', 'Expected Entry Semester is REQUIRED')
    }
    else if(seekingScholarship == ''){
        toastr.error('Error!', 'Seeking Scholarship is REQUIRED')
    }
    else if(gpa == ''){
        toastr.error('Error!', 'GPA is REQUIRED')
    }
    else if(time == ''){
        toastr.error('Error!', 'Appointment Time is REQUIRED')
    }
    else if(date == ''){
        toastr.error('Error!', 'First Name is REQUIRED')
    }
    else if(country == ''){
        toastr.error('Error!', 'Citizen Country is REQUIRED')
    }
    else{
    if (stripeToken == '' && paymentID == ''){
        toastr.error('Error!', 'An error occured, Please Pay the processing fee')
    }
    else{
        if (stripeToken == '' && paymentID == ''){
            toastr.error('Error!', 'An error occured, Please Pay the processing fee')
        }
        else{
        return fetch(settings.urls.new_application, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({paymentStatus, comm, ieltsScore, satScore, toeflScore, greScore, gmatScore, actScore, expectedSemesterEntry, country, seekingScholarship, gpa, time, date,firstName, lastName, email, dateOfBirth, phone, gender, level, schoolCountry, firstChoiceMajor, secondChoiceMajor})
        })
        .then(
            response => response.json()
        )
        .then(
            data => {
                toastr.success('Success!', 'Your Application has been submitted')
                this.setState({stripeToken: '', paymentID: ''})
                //console.log("Application Submitted")
            })
        }
    
    }
}
}
    render(){
        let {country, option, open, comm, elementFontSize, seekingScholarship, gpa, expectedSemesterEntry, secondChoiceMajor, firstChoiceMajor, time, gender, schoolCountry, date, ieltsScore, satScore, greScore, gmatScore, toeflScore, actScore, phone, firstName, lastName, dateOfBirth, email, level} = this.state;
        const countries = COUNTRIES;
        let options = this.state.countryOptions;
        const major = this.state.majors;
        const school_country = SCHOOL_COUNTRIES;
        const levels = LEVELS;
        const communication = COMMUNICATION;
        const genders = GENDERS;
        const semester = SEMESTERS;
        const scholar = BOOLEAN;
        const gpas = GPAS;
        const times = TIMES;
        const appCountries = this.state.countries;
        const amount = Math.round((25 * this.state.exchangeRate)*100) / 100;
        const priceAmount = amount.toFixed(2)
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            this.setState({paymentID: payment.paymentID});
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
            //verify paypal here
            //this.verifyPaypal()
        }		
		
		const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            
            //console.log('The payment was cancelled!', data);
            toastr.warning('Warning', 'You cancelled Paypal payment, select payment method to buy coin');
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}	
		
		const onError = (err) => {
			// The main Paypal's script cannot be loaded or somethings block the loading of that script!
            //console.log("Error!", err);
            toastr.error('Error', 'An error occured please contact customer service');
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
		}			
		let shipping = 1;	
		let env = 'sandbox'; // you can set here to 'production' for production
		let currency = 'USD'; // or you can set this value from your props or state  
		let total = 25; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
		let style = {
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        }

		const client = {
			sandbox:    'AcphHl8MmA17YkUMZ1B6Ik1yAwlHLCtjm6Kt94wDliCu9wdPFFwlWwbIEKz2TxUXXYCN1K6DgQAKmV4x',
			production: 'YOUR-PRODUCTION-APP-ID',
		}

        return <React.Fragment>
        <div className="container-fluid"> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <MobileSidebar />
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            
            <h1 className="home-headline">Admission Processing</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>

 <div className="row-fluid new-application-row">
 <div className="col-md-2">
 </div>
    <div className="col-md-8">
    <div className="col-spaced help-box">
   
    <div className="row article-sub-row">
    <div className="col-md-12">
    
    <br/>
    <span className="content">
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <span className="major-select"><input placeholder="First Name" className="textInput" type="text" value={firstName} onChange={e=>this.setState({firstName: e.target.value})}/></span>
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Last Name" className="textInput" type="text"value={lastName} onChange={e=>this.setState({lastName: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="left"
    arrow={true}
    hideOnClick={true}
    title="Gender (required)"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={gender}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Gender"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleGenderChange}
        options={genders}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Date Of Birth (dd/mm/yyyy) (required)"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Date Of Birth (dd/mm/yyyy)" className="textInput" type="text" value={dateOfBirth} onChange={e=>this.setState({dateOfBirth: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Email" className="textInput" type="text" value={email} onChange={e=>this.setState({email: e.target.value})}/></span>
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Include Country phone code (required)"
    trigger="click"
    >
    <span className="major-select"><input placeholder="Phone Number" className="textInput" type="text" value={phone} onChange={e=>this.setState({phone: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={level}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Level"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleLevelChange}
        options={levels}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={country}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Citizenship Country"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleCountryChange}
        options={appCountries}
        searchable={true}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={schoolCountry}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="School Country"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleSchoolCountryChange}
        options={school_country}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={firstChoiceMajor}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="First Choice Major"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleFirstMajorChange}
        options={major}
        searchable={true}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Optional"
    trigger="click"
    >
        <Select
        name="form-field-name"
        className="major-select"
        value={secondChoiceMajor}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Second Choice Major"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleSecondMajorChange}
        options={major}
        searchable={true}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
        <Select
        name="form-field-name"
        className="major-select"
        value={expectedSemesterEntry}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Expected Entry Semester"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleSemesterChange}
        options={semester}
        searchable={false}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Undergraduate Level Only (required)"
    trigger="click"
    >
        <span className="major-select"><input placeholder="SAT Score" className="textInput" type="text" value={satScore} onChange={e=>this.setState({satScore: e.target.value})}/></span>
    </Tooltip>
    </div>
    <div className="col-md-6">    
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Undergraduate Level Only"
    trigger="click"
    >
        <span className="major-select"><input placeholder="ACT Score" className="textInput" type="text" value={actScore} onChange={e=>this.setState({actScore: e.target.value})}/></span>
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">  
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Undergraduate Level Only"
    trigger="click"
    >  
        <span className="major-select"><input placeholder="TOEFL Score" className="textInput" type="text" value={toeflScore} onChange={e=>this.setState({toeflScore: e.target.value})}/></span>
    </Tooltip>
    </div> 
    <div className="col-md-6"> 
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Undergraduate Level Only"
    trigger="click"
    >  
        <span className="major-select"><input placeholder="IELTS Score" className="textInput" type="text" value={ieltsScore} onChange={e=>this.setState({ieltsScore: e.target.value})}/></span>
    </Tooltip>
    </div> 
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Graduate Level Only (required)"
    trigger="click"
    >    
        <span className="major-select"><input placeholder="GRE Score" className="textInput" type="text" value={greScore} onChange={e=>this.setState({greScore: e.target.value})}/></span>
    </Tooltip>
    </div> 
    <div className="col-md-6">   
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Graduate Level Only (required)"
    trigger="click"
    >
        <span className="major-select"><input placeholder="GMAT Score" className="textInput" type="text" value={gmatScore} onChange={e=>this.setState({gmatScore: e.target.value})}/></span>
    </Tooltip>
    </div> 
    </div> 
    <div className="row">
    <div className="col-md-6">  
    <Tooltip
    interactive
    position="top"
    arrow={true}
    hideOnClick={true}
    title="Optional"
    trigger="click"
    >
        <Select
        name="form-field-name"
        className="major-select"
        value={seekingScholarship}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Seeking Scholarship?"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleScholarshipChange}
        options={scholar}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    <Tooltip
    interactive
    position="left"
    arrow={true}
    hideOnClick={true}
    html={(
      <div>
        <p>Need Help?</p>
        <p>Calculate your gpa with our online gpa calculator</p>
        <p><a href="/gpa-calculator" target="_blank">Learn More</a></p>
      </div>
    )}
    trigger="click"
    >
        <Select
        name="form-field-name"
        className="major-select"
        value={gpa}
        onClick={() => { this.setState({open: true}) }}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="High School or University GPA"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleGpaChange}
        options={gpas}
        searchable={false}
        />
    </Tooltip>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <Tooltip
    interactive
    position="left"
    arrow={true}
    hideOnClick={true}
    title="Perferred Means of Communication (required)"
    trigger="click"
    >
    <Select
        name="form-field-name"
        className="major-select"
        value={comm}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Perferred Means of Communication"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleCommChange}
        options={communication}
        searchable={false}
        />
    </Tooltip>
    </div>
    <div className="col-md-6">
    </div>
    </div>
    <br />
    <p className="gpa-result">Book An Appointment</p>
    <br />
    <div className="row">
    <div className="col-md-6">
    <label>Appointment Date:</label>
    <span className="major-select">
    <DatePicker
          onChange={this.setDate}
          value={this.state.date}
          className="datePick"
        />
    </span>
    </div>
    <div className="col-md-6">
    <label>Appointment Time:</label>
    <Tooltip
    interactive
    position="left"
    arrow={true}
    hideOnClick={true}
    title="Required"
    trigger="click"
    >
        <Select
        name="form-field-name"
        className="major-select"
        value={time}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Appointment Time"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleTimeChange}
        options={times}
        searchable={false}
        />
    </Tooltip>
    </div>
    </div>
        <br />
        <p className="gpa-result">Processing Fee: {this.state.currencySymbol}{priceAmount}
        </p>
        <br />
        <div className="row">
            <div className="col-md-6">
            <StripeProvider apiKey="pk_test_WwdF2h2PYwDQCIJikhCAeBDx">
                        <div className="appCheckout">
                            <Elements>
                            <CardForm  getStore={() => ({...this.state})} updateStore={(u) => (this.setState(u))} fontSize={elementFontSize} stripe="pk_test_WwdF2h2PYwDQCIJikhCAeBDx" />
                            </Elements>
                        </div>
                    </StripeProvider>
            </div>
            <div className="col-md-1">
            <p className="application-or">OR</p>
            </div>
            <div className="col-md-5">
            <PaypalExpressBtn 
                        env={env} style={style} client={client} shipping={shipping} currency={currency} 
                        total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} 
                    />
            </div>
        </div>
    <br/>
    <br/>
    <span className="center-now"><button className="application-btn aligner" onClick={this.submitApplication.bind(this)}><span className="user-info">Submit Application</span></button></span>
    
    <br/>
    
    </span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-2">
      
    </div>
    <div className="clearfix">
    </div>
 </div>
</div>
<Footer />
</React.Fragment>    
    }
}