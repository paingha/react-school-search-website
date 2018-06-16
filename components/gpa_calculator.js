import React, {Component} from 'react';
import Navbar from './shared/navbar';
import Footer from './shared/footer'
import { Match, Link } from 'react-router-dom'
import {User, Share} from 'react-feather'
import Select from 'react-select';
import _ from 'lodash';
const COUNTRIES = [
    { label: 'Algeria', value: 'Angola' },
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
const NIGERIA_OPTIONS = [
    { label: 'Waec', value: 'Waec' },
    { label: 'University', value: 'University' },
]
const GHANA_OPTIONS = [
    { label: 'Waec', value: 'Waec' },
    { label: 'University', value: 'University' },
]
const EGYPT_OPTIONS = [
    { label: 'University Scale A', value: 'University Scale A' },
    { label: 'University Scale B', value: 'University Scale B' },
    { label: 'University Scale C', value: 'University Scale C' },
]
const KENYA_OPTIONS = [
    { label: 'University', value: 'University' },
    { label: 'Certificate of Secondary School Education', value: 'Certificate of Secondary School Education' },
    { label: 'Most Common', value: 'Most Common' },
    { label: 'Secondary Level', value: 'Secondary Level' },
]
const LIBERIA_OPTIONS = [
    { label: 'Wassce', value: 'Wassce' },
    { label: 'Most Common', value: 'Most Common' },
]
const NAMIBIA_OPTIONS = [
    { label: 'IGCSE', value: 'IGCSE' },
    { label: 'University', value: 'University' },
]
const ETHIOPIA_OPTIONS = [
    { label: 'Secondary Certificate', value: 'Secondary Certificate' },
    { label: 'University', value: 'University' },
]
const RWANDA_OPTIONS = [
    { label: 'Scale 1', value: 'Scale 1' },
    { label: 'Scale 2', value: 'Scale 2' },
]
const CAMEROON_OPTIONS = [
    { label: 'French System', value: 'French System' },
    { label: 'University of Buea', value: 'University of Buea' },
    { label: 'Gce A Level', value: 'Gce A Level' },
]
export class GpaCalculator extends Component{
    constructor(props){
        super(props)
        this.state = {
            country: '',
            isHidden: true,
            countryOptions: [],
            option: '',
            rowNumber: 5,
            rows: [{
              id: 1,
            },
            {
              id: 2,
            },
            {
              id: 3,
            },
            {
              id: 4,
            },
            {
              id: 5,
            }],
        }
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.addRow = this.addRow.bind(this);   
        //this.calculateFunc = this.calculateFunc.bind(this);
    }
    addRow(){
      let {rows, rowNumber} = this.state;
      let addNum = rowNumber + 1;
      let updates = {
        id: `${addNum}`
      }
      let updatedRow = _.concat(rows, updates);
      this.setState({rows: updatedRow, rowNumber: addNum})
    }
    handleOptionChange(option){
        console.log('You\'ve selected:', option);
		this.setState({ option })
    }
    handleCountryChange (country) {
        let {countryOptions} = this.state;
		console.log('You\'ve selected:', country);
		this.setState({ country: country }, ()=>{
      console.log(this.state.country)
            if (country == "Egypt"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(EGYPT_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Nigeria"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(NIGERIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Ghana"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(GHANA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Ethiopia"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(ETHIOPIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Kenya"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(KENYA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Liberia"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(LIBERIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Namibia"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(NAMIBIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Rwanda"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(RWANDA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
            if (country == "Cameroon"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(CAMEROON_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        console.log(this.state.countryOptions)
                    })
                })
                })
            }
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    calculateFunc(country, type, grade){
            switch(true) {
                case country == "Nigeria":
                    if (type == "Waec"){
                      switch(true) {
                        case grade == "A1":
                          return "A+"
                        break;
                        case grade == "B2":
                          return "A"
                        break;
                        case grade == "B3":
                          return "B"
                        break;
                        case grade == "C4":
                          return "B"
                        break;
                        case grade == "C5":
                          return "C"
                        break;
                        case grade == "C6":
                          return "C"
                        break;
                        case grade == "D7":
                          return "D"
                        break;
                        case grade == "E8":
                          return "D"
                        break;
                        case grade == "F9":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "University"){
                      switch(true) {
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "B":
                          return "B+"
                        break;
                        case grade == "C":
                          return "B"
                        break;
                        case grade == "D":
                          return "C+"
                        break;
                        case grade == "E":
                          return "C"
                        break;
                        case grade == "F":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    
                    break;
                case country == "Ghana":
                    if (type == "University"){
                      switch(true) {
                        case grade == "A":
                          return "A+"
                        break;
                        case grade == "A-":
                          return "A"
                        break;
                        case grade == "B":
                          return "B"
                        break;
                        case grade == "C":
                          return "B-"
                        break;
                        case grade == "D":
                          return "C"
                        break;
                        case grade == "F":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Waec"){
                      switch(true) {
                        case grade == "A1":
                          return "A+"
                        break;
                        case grade == "B2":
                          return "A"
                        break;
                        case grade == "B3":
                          return "B"
                        break;
                        case grade == "C4":
                          return "B"
                        break;
                        case grade == "C5":
                          return "C"
                        break;
                        case grade == "C6":
                          return "C"
                        break;
                        case grade == "D7":
                          return "D"
                        break;
                        case grade == "E8":
                          return "D"
                        break;
                        case grade == "F9":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Algeria":
                    switch(true) {
                        case (20 >= grade) && (grade >= 15):
                          return "A+"
                        break;
                        case (14.99 >= grade) && (grade >= 13):
                          return "A"
                        break;
                        case (12.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Benin":
                    switch(true) {
                        case grade == "A+":
                          return "A+"
                        break;
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "A-":
                          return "A-"
                        break;
                        case grade == "B+":
                          return "B+"
                        break;
                        case grade == "B-":
                          return "B-"
                        break;
                        case grade == "B":
                          return "B"
                        break;
                        case grade == "C+":
                          return "C+"
                        break;
                        case grade == "C":
                          return "C"
                        break;
                        case grade == "C-":
                          return "C-"
                        break;
                        case grade == "D":
                          return "D"
                        break;
                        case grade == "F":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Botswana":
                    switch(true) {
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "B":
                          return "A-"
                        break;
                        case grade == "C":
                          return "B"
                        break;
                        case grade == "D":
                          return "C"
                        break;
                        case grade == "E":
                          return "D"
                        break;
                        case grade == "F":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Swaziland":
                    switch(true) {
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "B":
                          return "A-"
                        break;
                        case grade == "C":
                          return "B"
                        break;
                        case grade == "D":
                          return "C"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Zimbabwe":
                    switch(true) {
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "B":
                          return "B"
                        break;
                        case grade == "C":
                          return "C"
                        break;
                        case grade == "D":
                          return "D"
                        break;
                        case grade == "E":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Angola":
                    switch(true) {
                        case (20 >= grade) && (grade >= 16):
                          return "A"
                        break;
                        case (15 >= grade) && (grade >= 13):
                          return "B"
                        break;
                        case (12 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9 >= grade) && (grade >= 1):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Burkina Faso":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Central African Republic":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Chad":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Cote D'ivoire":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Gabon":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Guinea":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Madagascar":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Mali":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Mauritania":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Niger":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Tunisia":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Democratic Republic Of Congo":
                    switch(true) {
                        case (100 >= grade) && (grade >= 90):
                          return "A"
                        break;
                        case (89 >= grade) && (grade >= 80):
                          return "A-"
                        break;
                        case (79 >= grade) && (grade >= 70):
                          return "B"
                        break;
                        case (69 >= grade) && (grade >= 60):
                          return "B-"
                        break;
                        case (59 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Congo":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Eqypt":
                    if (type == "University Scale A"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 90):
                          return "A"
                        break;
                        case (89.99 >= grade) && (grade >= 80):
                          return "A-"
                        break;
                        case (79.99 >= grade) && (grade >= 65):
                          return "B"
                        break;
                        case (64.99 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49.99 >= grade) && (grade >= 35):
                          return "D"
                        break;
                        case (34.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "University Scale B"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 85):
                          return "A"
                        break;
                        case (84.99 >= grade) && (grade >= 80):
                          return "A-"
                        break;
                        case (79.99 >= grade) && (grade >= 65):
                          return "B"
                        break;
                        case (64.99 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49.99 >= grade) && (grade >= 30):
                          return "D"
                        break;
                        case (29.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "University Scale C"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 85):
                          return "A"
                        break;
                        case (84.99 >= grade) && (grade >= 80):
                          return "A-"
                        break;
                        case (79.99 >= grade) && (grade >= 75):
                          return "B+"
                        break;
                        case (74.99 >= grade) && (grade >= 70):
                          return "B"
                        break;
                        case (69.99 >= grade) && (grade >= 65):
                          return "B-"
                        break;
                        case (64.99 >= grade) && (grade >= 60):
                          return "C+"
                        break;
                        case (59.99 >= grade) && (grade >= 55):
                          return "C"
                        break;
                        case (54.99 >= grade) && (grade >= 30):
                          return "D"
                        break;
                        case (29.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Eritrea":
                    switch(true) {
                        case (100 >= grade) && (grade >= 75):
                          return "A"
                        break;
                        case (74.99 >= grade) && (grade >= 65):
                          return "B"
                        break;
                        case (64.99 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49.99 >= grade) && (grade >= 40):
                          return "D"
                        break;
                        case (39.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Ethiopia":
                    if (type == "University"){
                      switch(true) {
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "B+":
                          return "B+"
                        break;
                        case grade == "B":
                          return "B"
                        break;
                        case grade == "C+":
                          return "C+"
                        break;
                        case grade == "C":
                          return "C"
                        break;
                        case grade == "D":
                          return "D"
                        break;
                        case grade == "F":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                if (type == "Secondary Certificate"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 90):
                          return "A"
                        break;
                        case (89.99 >= grade) && (grade >= 80):
                          return "B"
                        break;
                        case (79.99 >= grade) && (grade >= 60):
                          return "C"
                        break;
                        case (59.99 >= grade) && (grade >= 50):
                          return "D"
                        break;
                        case (49.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Kenya":
                    if (type == "University"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 70):
                          return "A"
                        break;
                        case (69 >= grade) && (grade >= 60):
                          return "A-"
                        break;
                        case (59 >= grade) && (grade >= 50):
                          return "B"
                        break;
                        case (49 >= grade) && (grade >= 40):
                          return "C"
                        break;
                        case (39 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Certificate of Secondary School Education"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 80):
                          return "A"
                        break;
                        case (79.99 >= grade) && (grade >= 75):
                          return "A-"
                        break;
                        case (74.99 >= grade) && (grade >= 70):
                          return "B+"
                        break;
                        case (69.99 >= grade) && (grade >= 65):
                          return "B"
                        break;
                        case (64.99 >= grade) && (grade >= 60):
                          return "B-"
                        break;
                        case (59.99 >= grade) && (grade >= 55):
                          return "C+"
                        break;
                        case (54.99 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49.99 >= grade) && (grade >= 45):
                          return "C-"
                        break;
                        case (44.99 >= grade) && (grade >= 40):
                          return "D+"
                        break;
                        case (39.99 >= grade) && (grade >= 35):
                          return "D"
                        break;
                        case (34.99 >= grade) && (grade >= 30):
                          return "D-"
                        break;
                        case (29.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Most Common"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 70):
                          return "A"
                        break;
                        case (69.99 >= grade) && (grade >= 65):
                          return "A-"
                        break;
                        case (64.99 >= grade) && (grade >= 60):
                          return "B+"
                        break;
                        case (59.99 >= grade) && (grade >= 50):
                          return "B"
                        break;
                        case (49.99 >= grade) && (grade >= 45):
                          return "C+"
                        break;
                        case (44.99 >= grade) && (grade >= 40):
                          return "C"
                        break;
                        case (39.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Secondary Level"){
                      switch(true) {
                        case grade == 12:
                          return "A+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "A"
                        break;
                        case (10.99 >= grade) && (grade >= 10):
                          return "A-"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "B+"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "B"
                        break;
                        case (7.99 >= grade) && (grade >= 7):
                          return "C+"
                        break;
                        case (6.99 >= grade) && (grade >= 6):
                          return "C"
                        break;
                        case (5.99 >= grade) && (grade >= 2):
                          return "D"
                        break;
                        case (1.99 >= grade) && (grade >= 1):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Liberia":
                    if (type == "Most Common"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 90):
                          return "A"
                        break;
                        case (89 >= grade) && (grade >= 80):
                          return "B"
                        break;
                        case (79 >= grade) && (grade >= 70):
                          return "C"
                        break;
                        case (69 >= grade) && (grade >= 60):
                          return "D"
                        break;
                        case (59 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Wassce"){
                      switch(true) {
                        case (1.99 >= grade) && (grade >= 1):
                          return "A"
                        break;
                        case (2.99 >= grade) && (grade >= 2):
                          return "A"
                        break;
                        case (3.99 >= grade) && (grade >= 3):
                          return "B"
                        break;
                        case (4.99 >= grade) && (grade >= 4):
                          return "B"
                        break;
                        case (5.99 >= grade) && (grade >= 5):
                          return "C"
                        break;
                        case (6.99 >= grade) && (grade >= 6):
                          return "C"
                        break;
                        case (7.99 >= grade) && (grade >= 7):
                          return "D"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case grade == 9:
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Morocco":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.49 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case (10.09 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Mozambique":
                    switch(true) {
                        case (20 >= grade) && (grade >= 15):
                          return "A"
                        break;
                        case (14.99 >= grade) && (grade >= 12):
                          return "B"
                        break;
                        case (11 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Namibia":
                    if (type == "IGCSE"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 90):
                          return "A+"
                        break;
                        case (89.99 >= grade) && (grade >= 80):
                          return "A"
                        break;
                        case (79.99 >= grade) && (grade >= 70):
                          return "A-"
                        break;
                        case (69.99 >= grade) && (grade >= 60):
                          return "B"
                        break;
                        case (59.99 >= grade) && (grade >= 50):
                          return "C+"
                        break;
                        case (49.99 >= grade) && (grade >= 40):
                          return "C"
                        break;
                        case (39.99 >= grade) && (grade >= 30):
                          return "D+"
                        break;
                        case (29.99 >= grade) && (grade >= 20):
                          return "D"
                        break;
                        case (19.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "University"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 80):
                          return "A+"
                        break;
                        case (79.99 >= grade) && (grade >= 70):
                          return "A"
                        break;
                        case (69.99 >= grade) && (grade >= 60):
                          return "B"
                        break;
                        case (59.99 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Rwanda":
                    if (type == "Scale 1"){
                      switch(true) {
                        case (11 >= grade) && (grade >= 10.5):
                          return "A"
                        break;
                        case (10.49 >= grade) && (grade >= 9.5):
                          return "A-"
                        break;
                        case (9.49 >= grade) && (grade >= 8.5):
                          return "B+"
                        break;
                        case (8.49 >= grade) && (grade >= 7.5):
                          return "B"
                        break;
                        case (7.49 >= grade) && (grade >= 6.5):
                          return "B-"
                        break;
                        case (6.49 >= grade) && (grade >= 5.5):
                          return "C+"
                        break;
                        case (5.49 >= grade) && (grade >= 4.5):
                          return "C"
                        break;
                        case (4.49 >= grade) && (grade >= 3.5):
                          return "C-"
                        break;
                        case (3.49 >= grade) && (grade >= 1.5):
                          return "D"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Scale 2"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 85):
                          return "A"
                        break;
                        case (84.99 >= grade) && (grade >= 80):
                          return "A-"
                        break;
                        case (79.99 >= grade) && (grade >= 75):
                          return "B+"
                        break;
                        case (74.99 >= grade) && (grade >= 70):
                          return "B"
                        break;
                        case (69.99 >= grade) && (grade >= 65):
                          return "B-"
                        break;
                        case (64.99 >= grade) && (grade >= 60):
                          return "C+"
                        break;
                        case (59.99 >= grade) && (grade >= 55):
                          return "C"
                        break;
                        case (54.99 >= grade) && (grade >= 50):
                          return "C-"
                        break;
                        case (49.99 >= grade) && (grade >= 40):
                          return "D"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Senegal":
                    switch(true) {
                        case (20 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.9 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.9 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.9 >= grade) && (grade >= 10.5):
                          return "B-"
                        break;
                        case (10.4 >= grade) && (grade >= 10.1):
                          return "C+"
                        break;
                        case grade == 10:
                          return "C"
                        break;
                        case (9.9 >= grade) && (grade >= 9):
                          return "C-"
                        break;
                        case (8.9 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        case (7.9 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Togo":
                    switch(true) {
                        case (20 >= grade) && (grade >= 16):
                          return "A+"
                        break;
                        case (15.99 >= grade) && (grade >= 14):
                          return "A"
                        break;
                        case (13.99 >= grade) && (grade >= 12):
                          return "B"
                        break;
                        case (11.99 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 8):
                          return "D"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "South Africa":
                    switch(true) {
                        case (100 >= grade) && (grade >= 75):
                          return "A"
                        break;
                        case (74.99 >= grade) && (grade >= 70):
                          return "B+"
                        break;
                        case (69.99 >= grade) && (grade >= 60):
                          return "B"
                        break;
                        case (59.99 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "Cameroon":
                    if (type == "French System"){
                      switch(true) {
                        case (20 >= grade) && (grade >= 15):
                          return "A+"
                        break;
                        case (14.99 >= grade) && (grade >= 13):
                          return "A-"
                        break;
                        case (12.99 >= grade) && (grade >= 12):
                          return "B+"
                        break;
                        case (11.99 >= grade) && (grade >= 11):
                          return "B"
                        break;
                        case (10.99 >= grade) && (grade >= 10):
                          return "C"
                        break;
                        case (9.99 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "University of Buea"){
                      switch(true) {
                        case (100 >= grade) && (grade >= 80):
                          return "A"
                        break;
                        case (79 >= grade) && (grade >= 70):
                          return "B+"
                        break;
                        case (69 >= grade) && (grade >= 60):
                          return "B"
                        break;
                        case (59 >= grade) && (grade >= 55):
                          return "C+"
                        break;
                        case (54 >= grade) && (grade >= 50):
                          return "C"
                        break;
                        case (49 >= grade) && (grade >= 45):
                          return "F"
                        break;
                        case (44 >= grade) && (grade >= 40):
                          return "F"
                        break;
                        case (39 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    if (type == "Gce A Level"){
                      switch(true) {
                        case grade == "A":
                          return "A"
                        break;
                        case grade == "B":
                          return "B"
                        break;
                        case grade == "C":
                          return "B"
                        break;
                        case grade == "D":
                          return "C"
                        break;
                        case grade == "E":
                          return "C"
                        break;
                        case grade == "F":
                          return "F"
                        break;
                        default:
                          return null
                        }
                    }
                    break;
                case country == "Zambia":
                    switch(true) {
                        case (2 >= grade) && (grade >= 1):
                          return "A"
                        break;
                        case (4 >= grade) && (grade >= 3):
                          return "B"
                        break;
                        case (6 >= grade) && (grade >= 5):
                          return "C"
                        break;
                        case (8 >= grade) && (grade >= 7):
                          return "D"
                        break;
                        case grade == 9:
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                case country == "China":
                    switch(true) {
                        case (100 >= grade) && (grade >= 90):
                          return "A"
                        break;
                        case (89 >= grade) && (grade >= 80):
                          return "B"
                        break;
                        case (79 >= grade) && (grade >= 70):
                          return "C"
                        break;
                        case (69 >= grade) && (grade >= 60):
                          return "D"
                        break;
                        case (59 >= grade) && (grade >= 0):
                          return "F"
                        break;
                        default:
                          return null
                        }
                    break;
                default:
                    null;
            }
            
    }
    handleChange(e){
      console.log(e.target.value);
      let country = this.state.country;
      let type = this.state.option;
      let grade = e.target.value;
      console.log(country);
      console.log(type);
      let result = (country, type, grade) => {
        switch(country) {
          case "Nigeria":
              if (type == "Waec"){
                switch(grade) {
                  case "A1":
                    return "A+"
                    console.log("A+")
                  break;
                  case "B2":
                    return "A"
                  break;
                  case "B3":
                    return "B"
                  break;
                  case "C4":
                    return "B"
                  break;
                  case "C5":
                    return "C"
                  break;
                  case "C6":
                    return "C"
                  break;
                  case "D7":
                    return "D"
                  break;
                  case "E8":
                    return "D"
                  break;
                  case "F9":
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "University"){
                switch(grade) {
                  case "A":
                    return "A"
                  break;
                  case "B":
                    return "B+"
                  break;
                  case "C":
                    return "B"
                  break;
                  case "D":
                    return "C+"
                  break;
                  case "E":
                    return "C"
                  break;
                  case "F":
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              
              break;
          case "Ghana":
              if (type == "University"){
                switch(grade) {
                  case "A":
                    return "A+"
                  break;
                  case "A-":
                    return "A"
                  break;
                  case "B":
                    return "B"
                  break;
                  case "C":
                    return "B-"
                  break;
                  case "D":
                    return "C"
                  break;
                  case "F":
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Waec"){
                switch(grade) {
                  case "A1":
                    return "A+"
                  break;
                  case "B2":
                    return "A"
                  break;
                  case "B3":
                    return "B"
                  break;
                  case "C4":
                    return "B"
                  break;
                  case "C5":
                    return "C"
                  break;
                  case "C6":
                    return "C"
                  break;
                  case "D7":
                    return "D"
                  break;
                  case "E8":
                    return "D"
                  break;
                  case "F9":
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Algeria":
              switch(grade) {
                  case (20 >= grade) && (grade >= 15):
                    return "A+"
                  break;
                  case (14.99 >= grade) && (grade >= 13):
                    return "A"
                  break;
                  case (12.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Benin":
              switch(grade) {
                  case "A+":
                    return "A+"
                  break;
                  case "A":
                    return "A"
                  break;
                  case "A-":
                    return "A-"
                  break;
                  case "B+":
                    return "B+"
                  break;
                  case "B-":
                    return "B-"
                  break;
                  case "B":
                    return "B"
                  break;
                  case "C+":
                    return "C+"
                  break;
                  case "C":
                    return "C"
                  break;
                  case "C-":
                    return "C-"
                  break;
                  case "D":
                    return "D"
                  break;
                  case "F":
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Botswana":
              switch(grade) {
                  case "A":
                    return "A"
                  break;
                  case "B":
                    return "A-"
                  break;
                  case "C":
                    return "B"
                  break;
                  case "D":
                    return "C"
                  break;
                  case "E":
                    return "D"
                  break;
                  case "F":
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Swaziland":
              switch(grade) {
                  case "A":
                    return "A"
                  break;
                  case "B":
                    return "A-"
                  break;
                  case "C":
                    return "B"
                  break;
                  case "D":
                    return "C"
                  break;
                  default:
                    return null
                  }
              break;
          case "Zimbabwe":
              switch(grade) {
                  case "A":
                    return "A"
                  break;
                  case "B":
                    return "B"
                  break;
                  case "C":
                    return "C"
                  break;
                  case "D":
                    return "D"
                  break;
                  case "E":
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Angola":
              switch(grade) {
                  case (20 >= grade) && (grade >= 16):
                    return "A"
                  break;
                  case (15 >= grade) && (grade >= 13):
                    return "B"
                  break;
                  case (12 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9 >= grade) && (grade >= 1):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Burkina Faso":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Central African Republic":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Chad":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Cote D'ivoire":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Gabon":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Guinea":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Madagascar":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Mali":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Mauritania":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Niger":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Tunisia":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Democratic Republic Of Congo":
              switch(grade) {
                  case (100 >= grade) && (grade >= 90):
                    return "A"
                  break;
                  case (89 >= grade) && (grade >= 80):
                    return "A-"
                  break;
                  case (79 >= grade) && (grade >= 70):
                    return "B"
                  break;
                  case (69 >= grade) && (grade >= 60):
                    return "B-"
                  break;
                  case (59 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Congo":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Eqypt":
              if (type == "University Scale A"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 90):
                    return "A"
                  break;
                  case (89.99 >= grade) && (grade >= 80):
                    return "A-"
                  break;
                  case (79.99 >= grade) && (grade >= 65):
                    return "B"
                  break;
                  case (64.99 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49.99 >= grade) && (grade >= 35):
                    return "D"
                  break;
                  case (34.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "University Scale B"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 85):
                    return "A"
                  break;
                  case (84.99 >= grade) && (grade >= 80):
                    return "A-"
                  break;
                  case (79.99 >= grade) && (grade >= 65):
                    return "B"
                  break;
                  case (64.99 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49.99 >= grade) && (grade >= 30):
                    return "D"
                  break;
                  case (29.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "University Scale C"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 85):
                    return "A"
                  break;
                  case (84.99 >= grade) && (grade >= 80):
                    return "A-"
                  break;
                  case (79.99 >= grade) && (grade >= 75):
                    return "B+"
                  break;
                  case (74.99 >= grade) && (grade >= 70):
                    return "B"
                  break;
                  case (69.99 >= grade) && (grade >= 65):
                    return "B-"
                  break;
                  case (64.99 >= grade) && (grade >= 60):
                    return "C+"
                  break;
                  case (59.99 >= grade) && (grade >= 55):
                    return "C"
                  break;
                  case (54.99 >= grade) && (grade >= 30):
                    return "D"
                  break;
                  case (29.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Eritrea":
              switch(grade) {
                  case (100 >= grade) && (grade >= 75):
                    return "A"
                  break;
                  case (74.99 >= grade) && (grade >= 65):
                    return "B"
                  break;
                  case (64.99 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49.99 >= grade) && (grade >= 40):
                    return "D"
                  break;
                  case (39.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Ethiopia":
              if (type == "University"){
                switch(grade) {
                  case "A":
                    return "A"
                  break;
                  case "B+":
                    return "B+"
                  break;
                  case "B":
                    return "B"
                  break;
                  case "C+":
                    return "C+"
                  break;
                  case "C":
                    return "C"
                  break;
                  case "D":
                    return "D"
                  break;
                  case "F":
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
          if (type == "Secondary Certificate"){
                switch(true) {
                  case (100 >= grade) && (grade >= 90):
                    return "A"
                  break;
                  case (89.99 >= grade) && (grade >= 80):
                    return "B"
                  break;
                  case (79.99 >= grade) && (grade >= 60):
                    return "C"
                  break;
                  case (59.99 >= grade) && (grade >= 50):
                    return "D"
                  break;
                  case (49.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Kenya":
              if (type == "University"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 70):
                    return "A"
                  break;
                  case (69 >= grade) && (grade >= 60):
                    return "A-"
                  break;
                  case (59 >= grade) && (grade >= 50):
                    return "B"
                  break;
                  case (49 >= grade) && (grade >= 40):
                    return "C"
                  break;
                  case (39 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Certificate of Secondary School Education"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 80):
                    return "A"
                  break;
                  case (79.99 >= grade) && (grade >= 75):
                    return "A-"
                  break;
                  case (74.99 >= grade) && (grade >= 70):
                    return "B+"
                  break;
                  case (69.99 >= grade) && (grade >= 65):
                    return "B"
                  break;
                  case (64.99 >= grade) && (grade >= 60):
                    return "B-"
                  break;
                  case (59.99 >= grade) && (grade >= 55):
                    return "C+"
                  break;
                  case (54.99 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49.99 >= grade) && (grade >= 45):
                    return "C-"
                  break;
                  case (44.99 >= grade) && (grade >= 40):
                    return "D+"
                  break;
                  case (39.99 >= grade) && (grade >= 35):
                    return "D"
                  break;
                  case (34.99 >= grade) && (grade >= 30):
                    return "D-"
                  break;
                  case (29.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Most Common"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 70):
                    return "A"
                  break;
                  case (69.99 >= grade) && (grade >= 65):
                    return "A-"
                  break;
                  case (64.99 >= grade) && (grade >= 60):
                    return "B+"
                  break;
                  case (59.99 >= grade) && (grade >= 50):
                    return "B"
                  break;
                  case (49.99 >= grade) && (grade >= 45):
                    return "C+"
                  break;
                  case (44.99 >= grade) && (grade >= 40):
                    return "C"
                  break;
                  case (39.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Secondary Level"){
                switch(grade) {
                  case 12:
                    return "A+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "A"
                  break;
                  case (10.99 >= grade) && (grade >= 10):
                    return "A-"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "B+"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "B"
                  break;
                  case (7.99 >= grade) && (grade >= 7):
                    return "C+"
                  break;
                  case (6.99 >= grade) && (grade >= 6):
                    return "C"
                  break;
                  case (5.99 >= grade) && (grade >= 2):
                    return "D"
                  break;
                  case (1.99 >= grade) && (grade >= 1):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Liberia":
              if (type == "Most Common"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 90):
                    return "A"
                  break;
                  case (89 >= grade) && (grade >= 80):
                    return "B"
                  break;
                  case (79 >= grade) && (grade >= 70):
                    return "C"
                  break;
                  case (69 >= grade) && (grade >= 60):
                    return "D"
                  break;
                  case (59 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Wassce"){
                switch(grade) {
                  case (1.99 >= grade) && (grade >= 1):
                    return "A"
                  break;
                  case (2.99 >= grade) && (grade >= 2):
                    return "A"
                  break;
                  case (3.99 >= grade) && (grade >= 3):
                    return "B"
                  break;
                  case (4.99 >= grade) && (grade >= 4):
                    return "B"
                  break;
                  case (5.99 >= grade) && (grade >= 5):
                    return "C"
                  break;
                  case (6.99 >= grade) && (grade >= 6):
                    return "C"
                  break;
                  case (7.99 >= grade) && (grade >= 7):
                    return "D"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case grade == 9:
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Morocco":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.49 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case (10.09 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Mozambique":
              switch(grade) {
                  case (20 >= grade) && (grade >= 15):
                    return "A"
                  break;
                  case (14.99 >= grade) && (grade >= 12):
                    return "B"
                  break;
                  case (11 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Namibia":
              if (type == "IGCSE"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 90):
                    return "A+"
                  break;
                  case (89.99 >= grade) && (grade >= 80):
                    return "A"
                  break;
                  case (79.99 >= grade) && (grade >= 70):
                    return "A-"
                  break;
                  case (69.99 >= grade) && (grade >= 60):
                    return "B"
                  break;
                  case (59.99 >= grade) && (grade >= 50):
                    return "C+"
                  break;
                  case (49.99 >= grade) && (grade >= 40):
                    return "C"
                  break;
                  case (39.99 >= grade) && (grade >= 30):
                    return "D+"
                  break;
                  case (29.99 >= grade) && (grade >= 20):
                    return "D"
                  break;
                  case (19.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "University"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 80):
                    return "A+"
                  break;
                  case (79.99 >= grade) && (grade >= 70):
                    return "A"
                  break;
                  case (69.99 >= grade) && (grade >= 60):
                    return "B"
                  break;
                  case (59.99 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Rwanda":
              if (type == "Scale 1"){
                switch(grade) {
                  case (11 >= grade) && (grade >= 10.5):
                    return "A"
                  break;
                  case (10.49 >= grade) && (grade >= 9.5):
                    return "A-"
                  break;
                  case (9.49 >= grade) && (grade >= 8.5):
                    return "B+"
                  break;
                  case (8.49 >= grade) && (grade >= 7.5):
                    return "B"
                  break;
                  case (7.49 >= grade) && (grade >= 6.5):
                    return "B-"
                  break;
                  case (6.49 >= grade) && (grade >= 5.5):
                    return "C+"
                  break;
                  case (5.49 >= grade) && (grade >= 4.5):
                    return "C"
                  break;
                  case (4.49 >= grade) && (grade >= 3.5):
                    return "C-"
                  break;
                  case (3.49 >= grade) && (grade >= 1.5):
                    return "D"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Scale 2"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 85):
                    return "A"
                  break;
                  case (84.99 >= grade) && (grade >= 80):
                    return "A-"
                  break;
                  case (79.99 >= grade) && (grade >= 75):
                    return "B+"
                  break;
                  case (74.99 >= grade) && (grade >= 70):
                    return "B"
                  break;
                  case (69.99 >= grade) && (grade >= 65):
                    return "B-"
                  break;
                  case (64.99 >= grade) && (grade >= 60):
                    return "C+"
                  break;
                  case (59.99 >= grade) && (grade >= 55):
                    return "C"
                  break;
                  case (54.99 >= grade) && (grade >= 50):
                    return "C-"
                  break;
                  case (49.99 >= grade) && (grade >= 40):
                    return "D"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Senegal":
              switch(grade) {
                  case (20 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.9 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.9 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.9 >= grade) && (grade >= 10.5):
                    return "B-"
                  break;
                  case (10.4 >= grade) && (grade >= 10.1):
                    return "C+"
                  break;
                  case grade == 10:
                    return "C"
                  break;
                  case (9.9 >= grade) && (grade >= 9):
                    return "C-"
                  break;
                  case (8.9 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  case (7.9 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Togo":
              switch(grade) {
                  case (20 >= grade) && (grade >= 16):
                    return "A+"
                  break;
                  case (15.99 >= grade) && (grade >= 14):
                    return "A"
                  break;
                  case (13.99 >= grade) && (grade >= 12):
                    return "B"
                  break;
                  case (11.99 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 8):
                    return "D"
                  break;
                  default:
                    return null
                  }
              break;
          case "South Africa":
              switch(grade) {
                  case (100 >= grade) && (grade >= 75):
                    return "A"
                  break;
                  case (74.99 >= grade) && (grade >= 70):
                    return "B+"
                  break;
                  case (69.99 >= grade) && (grade >= 60):
                    return "B"
                  break;
                  case (59.99 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "Cameroon":
              if (type == "French System"){
                switch(grade) {
                  case (20 >= grade) && (grade >= 15):
                    return "A+"
                  break;
                  case (14.99 >= grade) && (grade >= 13):
                    return "A-"
                  break;
                  case (12.99 >= grade) && (grade >= 12):
                    return "B+"
                  break;
                  case (11.99 >= grade) && (grade >= 11):
                    return "B"
                  break;
                  case (10.99 >= grade) && (grade >= 10):
                    return "C"
                  break;
                  case (9.99 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "University of Buea"){
                switch(grade) {
                  case (100 >= grade) && (grade >= 80):
                    return "A"
                  break;
                  case (79 >= grade) && (grade >= 70):
                    return "B+"
                  break;
                  case (69 >= grade) && (grade >= 60):
                    return "B"
                  break;
                  case (59 >= grade) && (grade >= 55):
                    return "C+"
                  break;
                  case (54 >= grade) && (grade >= 50):
                    return "C"
                  break;
                  case (49 >= grade) && (grade >= 45):
                    return "F"
                  break;
                  case (44 >= grade) && (grade >= 40):
                    return "F"
                  break;
                  case (39 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              if (type == "Gce A Level"){
                switch(grade) {
                  case grade == "A":
                    return "A"
                  break;
                  case grade == "B":
                    return "B"
                  break;
                  case grade == "C":
                    return "B"
                  break;
                  case grade == "D":
                    return "C"
                  break;
                  case grade == "E":
                    return "C"
                  break;
                  case grade == "F":
                    return "F"
                  break;
                  default:
                    return null
                  }
              }
              break;
          case "Zambia":
              switch(grade) {
                  case (2 >= grade) && (grade >= 1):
                    return "A"
                  break;
                  case (4 >= grade) && (grade >= 3):
                    return "B"
                  break;
                  case (6 >= grade) && (grade >= 5):
                    return "C"
                  break;
                  case (8 >= grade) && (grade >= 7):
                    return "D"
                  break;
                  case grade == 9:
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          case "China":
              switch(grade) {
                  case (100 >= grade) && (grade >= 90):
                    return "A"
                  break;
                  case (89 >= grade) && (grade >= 80):
                    return "B"
                  break;
                  case (79 >= grade) && (grade >= 70):
                    return "C"
                  break;
                  case (69 >= grade) && (grade >= 60):
                    return "D"
                  break;
                  case (59 >= grade) && (grade >= 0):
                    return "F"
                  break;
                  default:
                    return null
                  }
              break;
          default:
              null;
      }
      
      }
      console.log(result);
    }
    render(){
        let {country, option} = this.state;
        const countries = COUNTRIES;
        let options = this.state.countryOptions;
        return <div className="container-fluid"> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            
            <h1 className="home-headline">Gpa Calculator</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>
 
 <div className="row-fluid new-article-row">
    <div className="col-md-2">
    </div>
    <div className="col-md-8">
    <div className="col-spaced help-box">
   
    <div className="row article-sub-row">
    <div className="col-md-12">
    
    <br/>
    <span className="content">
    <Select
        name="form-field-name"
        className="major-select"
        value={country}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Country"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleCountryChange}
        options={countries}
        searchable={true}
        />
        {!this.state.isHidden 
            && 
            <Select
        name="form-field-name"
        className="major-select"
        value={option}
        onBlurResetsInput={false}
		onSelectResetsInput={false}
        placeholder="Grade System"
        simpleValue
        multi={false}
        clearable={true}
        onChange={this.handleOptionChange}
        options={options}
        searchable={false}
        />
            }
    <table className="table">
        <thead>
        <tr>
        <th>#</th>
        <th>Class (optional)</th>
        <th>Grade</th>
        </tr>
        </thead>
        <tbody>
        {this.state.rows.map(row =>
            <tr key={row.id}>
                <td>{row.id}</td>
                <td><span className="major-select"><input name={`class${row.id}`} className="textInput" type="text" /></span></td>
                <td><span className="major-select"><input name={`grade${row.id}`} className="textInput" type="text" onChange={this.handleChange.bind(this)} /></span></td>
              
            </tr>
        )}
        </tbody>
    </table>
    <div className="row">
    <div className="col-md-6">
    <button className="gpa-btn aligner"><span className="user-info">Calculate Gpa</span></button>
    </div>
    <div className="col-md-6">
    <button className="gpa-btn aligner" onClick={this.addRow}><span className="user-info">Add Row</span></button>
    </div>
    </div>
    </span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-2">
    </div>
 </div>
<Footer />
</div>
        
    }
}