import React, {Component} from 'react';
import Navbar from './shared/navbar';
import Footer from './shared/footer'
import GpaScale from './gpa_scale'
import { Match, Link } from 'react-router-dom'
import {User, Share} from 'react-feather'
import Select from 'react-select';
import _ from 'lodash';
import {toastr} from 'react-redux-toastr'
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
const ZAMBIA_OPTIONS = [
  { label: 'Scale 1', value: 'Scale 1' },
  { label: 'Secondary', value: 'Secondary' },
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
            result: '',
            value: 1,
            gpa: [],
            pureGrade: [],
            currentCourse: [],
            credit: [],
            resultOverview: null,
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
    calcGpa(){
      let gpa = this.state.gpa;//array us grades, convert to numerical values
      let credit = this.state.credit;
      //console.log(gpa);
      //console.log(credit);//take 1
      let creditMapped = _.map(credit, 'credit');
      this.setState({mappedCredit: creditMapped})
      //console.log("Credit Array")
      //console.log(creditMapped);
      let mapped = _.map(gpa, (n)=>{
        if (n.grade == "A+"){
          return {
            "id": n.id,
            "gradeNo": 4.0
          }
        }
        else if (n.grade == "A"){
          return {
            "id": n.id,
            "gradeNo": 4.0
          }
        }
        else if (n.grade == "A-"){
          return {
            "id": n.id,
            "gradeNo": 4.0
          }
        }
        else if (n.grade == "B+"){
          return {
            "id": n.id,
            "gradeNo": 3.3
          }
        }
        else if (n.grade == "B"){
          return {
            "id": n.id,
            "gradeNo": 3.0
          }
        }
        else if (n.grade == "B-"){
          return {
            "id": n.id,
            "gradeNo": 2.7
          }
        }
        else if (n.grade == "C+"){
          return {
            "id": n.id,
            "gradeNo": 2.3
          }
        }
        else if (n.grade == "C"){
          return {
            "id": n.id,
            "gradeNo": 2.0
          }
        }
        else if (n.grade == "C-"){
          return {
            "id": n.id,
            "gradeNo": 1.7
          }
        }
        else if (n.grade == "D"){
          return {
            "id": n.id,
            "gradeNo": 1.0
          }
        }
        else if (n.grade == "F"){
          return {
            "id": n.id,
            "gradeNo": 0
          }
        }
      });
      //console.log(mapped);//take 2
      let gradeMapped = _.map(mapped, 'gradeNo');
      this.setState({mappedGrade: gradeMapped}) //this is the us gpa here
      //console.log("Gpa Array")
      //console.log(gradeMapped);
      let products =  _.zipWith(gradeMapped, creditMapped, function(a, b){ 
      return a * b;
      });
      //console.log(products);
      let addedCredit = _.reduce(creditMapped, function(sum, n) {
        return parseInt(sum) + parseInt(n); //issue here
      }, 0);
      let addedWeight = _.reduce(products, function(sum, n) {
        return sum + n;
      }, 0);
      //console.log(addedWeight);
      //console.log(addedCredit);
      let finalWeightedGpa = addedWeight / addedCredit;
      //console.log(finalWeightedGpa.toFixed(2));
      let twoDpGpa = finalWeightedGpa.toFixed(2);
      this.setState({result: twoDpGpa}, ()=> {
        //console.log(userGpa);
        if (isNaN(twoDpGpa)){
          toastr.error('Error!', 'An error occured, check your inputted grades')
        }
      })
     let editArray3 = _.map(this.state.rows, 'id');
     let gpaArray = _.map(this.state.gpa, 'grade');
     let creditArray = _.map(this.state.credit, 'credit');
     let countryGradeArray = _.map(this.state.pureGrade, 'countryGrade');
     let courseArray = _.map(this.state.currentCourse, 'course');
     let twoDpgrade = _.map(gradeMapped, (a)=> {
      return a.toFixed(2);
     })
     //console.log(courseArray);
     //console.log(countryGradeArray)
     //console.log(gradeMapped)
     //console.log(editArray3)
     let result = _.zipWith(editArray3, gpaArray, twoDpgrade, creditArray, countryGradeArray, courseArray, function(a, b, c, d, e, f) {
      return {
        "id": a,
        "usGrade": b,
        "gpa": c,
        "credit": d,
        "countryGrade": e,
        "course": f
      };
    });
    console.log(result)
    this.setState({resultOverview: result})
    }
    handleCountryChange (country) {
        let {countryOptions} = this.state;
		//console.log('You\'ve selected:', country);
		this.setState({ country: country }, ()=>{
      let emmpiedStuff = [];
      this.setState({resultOverview: emmpiedStuff, credit: emmpiedStuff, gpa: emmpiedStuff}, ()=> {
        this.inputCourse.value = "";
        this.inputCredit.value = "";
        this.inputGpa.value = "";
      })
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
            else if (country == "Nigeria"){
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
            else if (country == "Ghana"){
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
            else if (country == "Ethiopia"){
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
            else if (country == "Kenya"){
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
            else if (country == "Liberia"){
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
            else if (country == "Namibia"){
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
            else if (country == "Rwanda"){
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
            else if (country == "Cameroon"){
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
            else if (country == "Zambia"){
              this.setState({isHidden: false}, ()=>{
                  let emptyArray = []
                  this.setState({countryOptions: emptyArray}, ()=> {
                  let work = _.merge(ZAMBIA_OPTIONS, this.state.countryOptions)
                  this.setState({countryOptions: work}, ()=>{
                      console.log(this.state.countryOptions)
                  })
              })
              })
          }
            else{
              let emptyArray = []
              this.setState({isHidden: true, countryOptions: emptyArray})
            }
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    handleCredit(e){
      console.log(e.target.value);
      console.log(e.target.name);
      let currentCredit = this.state.credit;
      let creditObj = {
        "id": e.target.name,
        "credit": e.target.value
      }
      //add id so you can find the exact credit on edit
      if (_.some(currentCredit, ["id", e.target.name])){
        //if id is there remove then add new value
        let newCredit = _.remove(currentCredit, function(n) {
          return n.id != e.target.name;
        });
        let yourCredit = _.concat(newCredit, creditObj);
      this.setState({credit: yourCredit});

      }
      else{
      let newCredit = _.concat(currentCredit, creditObj);
      this.setState({credit: newCredit});
      }
    }
    handleChange(e){
      console.log(e.target.value);
      console.log(e.target.name);
      let country = this.state.country;
      let type = this.state.option;
      let uppercaseGrade = e.target.value
      let grade = uppercaseGrade.toUpperCase();
      let countryGrade = _.concat(this.state.pureGrade, grade);
      let currentGrade = this.state.pureGrade;
      let currentGradeObj = {
        "id": e.target.name,
        "countryGrade": grade
      }
      if (_.some(currentGrade, ["id", e.target.name])){
        //if id is there remove then add new value
        let newGrades = _.remove(currentGrade, function(n) {
          return n.id != e.target.name;
        });
        let yourGrades = _.concat(newGrades, currentGradeObj);
      this.setState({pureGrade: yourGrades});

      }
      else{
      let yourGrades = _.concat(currentGrade, currentGradeObj);
      this.setState({pureGrade: yourGrades});
    }
      console.log(country);
      console.log(type);
      let result = (country, type, grade) => {
        switch(country) {
          case "Nigeria":
              if (type == "Waec"){
                
                if ((grade == "A1") || ((1.99 >= grade) && (grade >= 1))){
                    return "A+"
                    //console.log("A+")
                }
                if ((grade == "B2") || ((2.99 >= grade) && (grade >= 2))){
                    return "A"
                }
                if ((grade == "B3") || ((3.99 >= grade) && (grade >= 3))){
                    return "B"
                }
                if ((grade == "C4") || ((4.99 >= grade) && (grade >= 4))){
                    return "B"
                }
                if ((grade == "C5") || ((5.99 >= grade) && (grade >= 5))){
                    return "C"
                }
                if ((grade == "C6") || ((6.99 >= grade) && (grade >= 6))){
                    return "C"
                }
                if ((grade == "D7") || ((7.99 >= grade) && (grade >= 7))){
                    return "D"
                }
                if ((grade == "E8") || ((8.99 >= grade) && (grade >= 8))){
                    return "D"
                }
                if ((grade == "F9") || (grade == 9)){
                    return "F"
                }
                else{
                    return null
                  }
              }
              if (type == "University"){
                
                  if ((grade == "A") || ((100 >= grade) && (grade >= 70))){
                    return "A"
                  }
                  if ((grade == "B") || ((69.99 >= grade) && (grade >= 60))){
                    return "B+"
                  }
                  if ((grade == "C") || ((59.99 >= grade) && (grade >= 50))){
                    return "B"
                  }
                  if ((grade == "D") || ((49.99 >= grade) && (grade >= 45))){
                    return "C+"
                  }
                  if ((grade == "E") || ((44.99 >= grade) && (grade >= 40))){
                    return "C"
                  }
                  if ((grade == "F") || ((39.99 >= grade) && (grade >= 0))){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              
              break;
          case "Ghana":
              if (type == "University"){
                
                  if ((grade == "A") || ((100 >= grade) && (grade >= 80))){
                    return "A+"
                  }
                  if ((grade == "A-") || ((79.99 >= grade) && (grade >= 75))){
                    return "A"
                  }
                  if ((grade == "B") || ((74.99 >= grade) && (grade >= 65))){
                    return "B"
                  }
                  if ((grade == "C") || ((64.99 >= grade) && (grade >= 60))){
                    return "B-"
                  }
                  if ((grade == "D") || ((59.99 >= grade) && (grade >= 50))){
                    return "C"
                  }
                  if ((grade == "F") || ((49.99 >= grade) && (grade >= 0))){
                    return "F"
                  }
                  else{
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
              if ((20 >= grade) && (grade >= 15)) {
                return "A+"
              }
              else if ((14.99 >= grade) && (grade >= 13)){
                return "A"
              }
              else if ((12.99 >= grade) && (grade >= 12)){
                return "B+"
              }
              else if ((11.99 >= grade) && (grade >= 11)){
                return "B"
              }
              else if ((10.99 >= grade) && (grade >= 10)){
                return "C"
              }
              else if ((9.99 >= grade) && (grade >= 0)){
                return "F"
              }
              else{
                return null
              }
            
          break;
          case "Benin":
              
                  if ((grade == "A+") || ((20 >= grade) && (grade >= 16))){
                    return "A+"
                  }
                  if ((grade == "A") || ((15.99 >= grade) && (grade >= 15))){
                    return "A"
                  }
                  if ((grade == "A-") || ((14.99 >= grade) && (grade >= 14))){
                    return "A-"
                  }
                  if ((grade == "B+") || ((13.99 >= grade) && (grade >= 13))){
                    return "B+"
                  }
                  if ((grade == "B-") || ((11.99 >= grade) && (grade >= 11))){
                    return "B-"
                  }
                  if ((grade == "B") || ((12.99 >= grade) && (grade >= 12))){
                    return "B"
                  }
                  if ((grade == "C+") || ((10.99 >= grade) && (grade >= 10))){
                    return "C+"
                  }
                  if ((grade == "C") || ((9.99 >= grade) && (grade >= 9))){
                    return "C"
                  }
                  if ((grade == "C-") || ((8.99 >= grade) && (grade >= 8))){
                    return "C-"
                  }
                  if ((grade == "D") || ((7.99 >= grade) && (grade >= 7))){
                    return "D"
                  }
                  if ((grade == "F") || ((6.99 >= grade) && (grade >= 0))){
                    return "F"
                  }
                  else{
                    return null
                  }
              
          case "Botswana":
              
                  if (((100 >= grade) && (grade >= 80)) || grade == "A") {
                    return "A"
                  }
                  if (((79.99 >= grade) && (grade >= 70)) || grade == "B") {
                    return "A-"
                  }
                  if (((69.99 >= grade) && (grade >= 60)) || grade == "C") {
                    return "B"
                  }
                  if (((59.99 >= grade) && (grade >= 50)) || grade == "D") {
                    return "C"
                  }
                  if (((49.99 >= grade) && (grade >= 40)) || grade == "E") {
                    return "D"
                  }
                  if (((39.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
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
              
                  if ((20 >= grade) && (grade >= 16)){
                    return "A"
                  }
                  else if ((15 >= grade) && (grade >= 13)){
                    return "B"
                  }
                  else if ((12 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9 >= grade) && (grade >= 1)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Burkina Faso":
                  if ((20 >= grade) && (grade >= 14)){
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)){
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
              break;
          case "Central African Republic":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)){
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
              break;
          case "Chad":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else {
                    return null
                  }
              break;
          case "Cote D'ivoire":

                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                }
                else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                }
                  else{
                    return null
                  }
              break;
          case "Gabon":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Guinea":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Madagascar":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Mali":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Mauritania":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Niger":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Tunisia":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Democratic Republic Of Congo":
              
                  if ((100 >= grade) && (grade >= 90)) {
                    return "A"
                  }
                  else if ((89 >= grade) && (grade >= 80)) {
                    return "A-"
                  }
                  else if ((79 >= grade) && (grade >= 70)) {
                    return "B"
                  }
                  else if ((69 >= grade) && (grade >= 60)) {
                    return "B-"
                  }
                  else if ((59 >= grade) && (grade >= 50)) {
                    return "C"
                  }
                  else if ((49 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Congo":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Egypt":
              if (type == "University Scale A"){

                  if (((100 >= grade) && (grade >= 90)) || grade == "A") {
                    return "A"
                  }
                  else if (((89.99 >= grade) && (grade >= 80)) || grade == "A-") {
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 65)) || grade == "B") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 50)) || grade == "C") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 35)) || grade == "D") {
                    return "D"
                  }
                  else if (((34.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University Scale B"){

                  if (((100 >= grade) && (grade >= 85)) || grade == "A") {
                    return "A"
                  }
                  else if (((84.99 >= grade) && (grade >= 80)) || grade == "A-") {
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 65)) || grade == "B") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 50)) || grade == "C") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 30)) || grade == "D") {
                    return "D"
                  }
                  else if (((29.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University Scale C"){

                  if (((100 >= grade) && (grade >= 85)) || grade == "A") {
                    return "A"
                  }
                  else if (((84.99 >= grade) && (grade >= 80)) || grade == "A-") {
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 75)) || grade == "B+") {
                    return "B+"
                  }
                  else if (((74.99 >= grade) && (grade >= 70)) || grade == "B") {
                    return "B"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "B-") {
                    return "B-"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "C+") {
                    return "C+"
                  }
                  else if (((59.99 >= grade) && (grade >= 55)) || grade == "C") {
                    return "C"
                  }
                  else if (((54.99 >= grade) && (grade >= 30)) || grade == "D") {
                    return "D"
                  }
                  else if (((29.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Eritrea":

                  if (((100 >= grade) && (grade >= 75)) || grade == "A") {
                    return "A"
                  }
                  else if (((74.99 >= grade) && (grade >= 65)) || grade == "B") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 50)) || grade == "C") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 40)) || grade == "D") {
                    return "D"
                  }
                  else if (((39.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
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

                  if (((100 >= grade) && (grade >= 90)) || grade == "A") {
                    return "A"
                  }
                  else if (((89.99 >= grade) && (grade >= 80)) || grade == "B") {
                    return "B"
                  }
                  else if (((79.99 >= grade) && (grade >= 60)) || grade == "C") {
                    return "C"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "D") {
                    return "D"
                  }
                  else if (((49.99 >= grade) && (grade >= 0)) || grade == "E") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Kenya":
              if (type == "University"){

                  if (((100 >= grade) && (grade >= 70)) || grade == "A") {
                    return "A"
                  }
                  else if (((69 >= grade) && (grade >= 60)) || grade == "B") {
                    return "A-"
                  }
                  else if (((59 >= grade) && (grade >= 50)) || grade == "C") {
                    return "B"
                  }
                  else if (((49 >= grade) && (grade >= 40)) || grade == "D") {
                    return "C"
                  }
                  else if (((39 >= grade) && (grade >= 0)) || grade == "E") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Certificate of Secondary School Education"){
                
                  if (((100 >= grade) && (grade >= 80)) || grade == "A") {
                    return "A"
                  }
                  else if (((79.99 >= grade) && (grade >= 75)) || grade == "A-") {
                    return "A-"
                  }
                  else if (((74.99 >= grade) && (grade >= 70)) || grade == "B+") {
                    return "B+"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "B") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "B-") {
                    return "B-"
                  }
                  else if (((59.99 >= grade) && (grade >= 55)) || grade == "C+") {
                    return "C+"
                  }
                  else if (((54.99 >= grade) && (grade >= 50)) || grade == "C") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 45)) || grade == "C-") {
                    return "C-"
                  }
                  else if (((44.99 >= grade) && (grade >= 40)) || grade == "D+") {
                    return "D+"
                  }
                  else if (((39.99 >= grade) && (grade >= 35)) || grade == "D") {
                    return "D"
                  }
                  else if (((34.99 >= grade) && (grade >= 30)) || grade == "D-") {
                    return "D-"
                  }
                  else if (((29.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Most Common"){
                
                  if (((100 >= grade) && (grade >= 70)) || grade == "A") {
                    return "A"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "A-") {
                    return "A-"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "B+") {
                    return "B+"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "B") {
                    return "B"
                  }
                  else if (((49.99 >= grade) && (grade >= 45)) || grade == "C+") {
                    return "C+"
                  }
                  else if (((44.99 >= grade) && (grade >= 40)) || grade == "C") {
                    return "C"
                  }
                  else if (((39.99 >= grade) && (grade >= 0)) || grade == "F") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Secondary Level"){

                  if ((grade == 12) || grade == "A") {
                    return "A+"
                  }
                  else if (((11.99 >= grade) && (grade >= 11)) || grade == "A-") {
                    return "A"
                  }
                  else if (((10.99 >= grade) && (grade >= 10)) || grade == "B+") {
                    return "A-"
                  }
                  else if (((9.99 >= grade) && (grade >= 9)) || grade == "B") {
                    return "B+"
                  }
                  else if (((8.99 >= grade) && (grade >= 8)) || grade == "B-") {
                    return "B"
                  }
                  else if (((7.99 >= grade) && (grade >= 7)) || grade == "C+") {
                    return "C+"
                  }
                  else if (((6.99 >= grade) && (grade >= 6)) || grade == "C") {
                    return "C"
                  }
                  else if (((5.99 >= grade) && (grade >= 2)) || grade == "C-") {
                    return "D"
                  }
                  else if (((1.99 >= grade) && (grade >= 1)) || grade == "D+") {
                    return "F"
                  }
                  else {
                    return null
                  }
              }
              break;
          case "Liberia":
              if (type == "Most Common"){
                
                  if ((100 >= grade) && (grade >= 90)) {
                    return "A"
                  }
                  else if ((89 >= grade) && (grade >= 80)) {
                    return "B"
                  }
                  else if ((79 >= grade) && (grade >= 70)) {
                    return "C"
                  }
                  else if ((69 >= grade) && (grade >= 60)){
                    return "D"
                  }
                  else if ((59 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Wassce"){
                
                  if (((1.99 >= grade) && (grade >= 1)) || (grade == "A1")) {
                    return "A"
                  }
                  else if (((2.99 >= grade) && (grade >= 2)) || (grade == "B2")) {
                    return "A"
                  }
                  else if (((3.99 >= grade) && (grade >= 3)) || (grade == "B3")) {
                    return "B"
                  }
                  else if (((4.99 >= grade) && (grade >= 4)) || (grade == "C4")){
                    return "B"
                  }
                  else if (((5.99 >= grade) && (grade >= 5)) || (grade == "C5")){
                    return "C"
                  }
                  else if (((6.99 >= grade) && (grade >= 6)) || (grade == "C6")) {
                    return "C"
                  }
                  else if (((7.99 >= grade) && (grade >= 7)) || (grade == "C7")) {
                    return "D"
                  }
                  else if (((8.99 >= grade) && (grade >= 8)) || (grade == "E8")){
                    return "D"
                  }
                  else if ((grade == 9) || (grade == "F9")){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Morocco":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)){
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)){
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)){
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)){
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)){
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Mozambique":
              
                  if ((20 >= grade) && (grade >= 15)){
                    return "A"
                  }
                  else if ((14.99 >= grade) && (grade >= 12)){
                    return "B"
                  }
                  else if ((11 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Namibia":
              if (type == "IGCSE"){
                
                  if (((100 >= grade) && (grade >= 90)) || grade == "A*"){
                    return "A+"
                  }
                  else if (((89.99 >= grade) && (grade >= 80)) || grade == "A"){
                    return "A"
                  }
                  else if (((79.99 >= grade) && (grade >= 70)) || grade == "B"){
                    return "A-"
                  }
                  else if (((69.99 >= grade) && (grade >= 60)) || grade == "C"){
                    return "B"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "D"){
                    return "C+"
                  }
                  else if (((49.99 >= grade) && (grade >= 40)) || grade == "E"){
                    return "C"
                  }
                  else if (((39.99 >= grade) && (grade >= 30)) || grade == "F"){
                    return "D+"
                  }
                  else if (((29.99 >= grade) && (grade >= 20)) || grade == "G"){
                    return "D"
                  }
                  else if (((19.99 >= grade) && (grade >= 0)) || grade == "U"){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University"){
                
                  if (((100 >= grade) && (grade >= 80)) || grade == "A"){
                    return "A+"
                  }
                  else if (((79.99 >= grade) && (grade >= 70)) || grade == "B"){
                    return "A"
                  }
                  else if (((69.99 >= grade) && (grade >= 60)) || grade == "C"){
                    return "B"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "D"){
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 0)) || grade == "F"){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Rwanda":
              if (type == "Scale 1"){
              
                  if (((11 >= grade) && (grade >= 10.5)) || grade == "A"){
                    return "A"
                  }
                  else if (((10.49 >= grade) && (grade >= 9.5)) || grade == "A-"){
                    return "A-"
                  }
                  else if (((9.49 >= grade) && (grade >= 8.5)) || grade == "B+"){
                    return "B+"
                  }
                  else if (((8.49 >= grade) && (grade >= 7.5)) || grade == "B"){
                    return "B"
                  }
                  else if (((7.49 >= grade) && (grade >= 6.5)) || grade == "B-"){
                    return "B-"
                  }
                  else if (((6.49 >= grade) && (grade >= 5.5)) || grade == "C+"){
                    return "C+"
                  }
                  else if (((5.49 >= grade) && (grade >= 4.5)) || grade == "C"){
                    return "C"
                  }
                  else if (((4.49 >= grade) && (grade >= 3.5)) || grade == "C-"){
                    return "C-"
                  }
                  else if (((3.49 >= grade) && (grade >= 1.5)) || grade == "D"){
                    return "D"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Scale 2"){
                
                  if (((100 >= grade) && (grade >= 85)) || grade == "A"){
                    return "A"
                  }
                  else if (((84.99 >= grade) && (grade >= 80)) || grade == "A-"){
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 75)) || grade == "B+"){
                    return "B+"
                  }
                  else if (((74.99 >= grade) && (grade >= 70)) || grade == "B"){
                    return "B"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "B-"){
                    return "B-"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "C+"){
                    return "C+"
                  }
                  else if (((59.99 >= grade) && (grade >= 55)) || grade == "C"){
                    return "C"
                  }
                  else if (((54.99 >= grade) && (grade >= 50)) || grade == "C-"){
                    return "C-"
                  }
                  else if (((49.99 >= grade) && (grade >= 40)) || grade == "D"){
                    return "D"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Senegal":
              
                  if ((20 >= grade) && (grade >= 14)){
                    return "A"
                  }
                  else if ((13.9 >= grade) && (grade >= 12)){
                    return "B+"
                  }
                  else if ((11.9 >= grade) && (grade >= 11)){
                    return "B"
                  }
                  else if ((10.9 >= grade) && (grade >= 10.5)){
                    return "B-"
                  }
                  else if ((10.4 >= grade) && (grade >= 10.1)){
                    return "C+"
                  }
                  else if (grade == 10){
                    return "C"
                  }
                  else if ((9.9 >= grade) && (grade >= 9)){
                    return "C-"
                  }
                  else if ((8.9 >= grade) && (grade >= 8)){
                    return "D"
                  }
                  else if ((7.9 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Togo":
              
                  if ((20 >= grade) && (grade >= 16)){
                    return "A+"
                  }
                  else if ((15.99 >= grade) && (grade >= 14)){
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)){
                    return "B"
                  }
                  else if ((11.99 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 8)){
                    return "D"
                  }
                  else{
                    return null
                  }
              break;
          case "South Africa":
              
                  if ((100 >= grade) && (grade >= 75)){
                    return "A"
                  }
                  else if ((74.99 >= grade) && (grade >= 70)){
                    return "B+"
                  }
                  else if ((69.99 >= grade) && (grade >= 60)){
                    return "B"
                  }
                  else if ((59.99 >= grade) && (grade >= 50)){
                    return "C"
                  }
                  else if ((49.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Cameroon":
              if (type == "French System"){
                
                  if ((20 >= grade) && (grade >= 15)){
                    return "A+"
                  }
                  else if ((14.99 >= grade) && (grade >= 13)){
                    return "A-"
                  }
                  else if ((12.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)){
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University of Buea"){
                
                  if (((100 >= grade) && (grade >= 80)) || grade == "A"){
                    return "A"
                  }
                  else if (((79 >= grade) && (grade >= 70)) || grade == "B+"){
                    return "B+"
                  }
                  else if (((69 >= grade) && (grade >= 60)) || grade == "B"){
                    return "B"
                  }
                  else if (((59 >= grade) && (grade >= 55)) || grade == "C+"){
                    return "C+"
                  }
                  else if (((54 >= grade) && (grade >= 50)) || grade == "C"){
                    return "C"
                  }
                  else if (((49 >= grade) && (grade >= 45)) || grade == "D+"){
                    return "F"
                  }
                  else if (((44 >= grade) && (grade >= 40)) || grade == "D"){
                    return "F"
                  }
                  else if (((39 >= grade) && (grade >= 0)) || grade == "F"){
                    return "F"
                  }
                  else{
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
          if (type == "Secondary"){
                  if ((2 >= grade) && (grade >= 1)){
                    return "A"
                  }
                  else if ((4 >= grade) && (grade >= 3)){
                    return "B"
                  }
                  else if ((6 >= grade) && (grade >= 5)){
                    return "C"
                  }
                  else if ((8 >= grade) && (grade >= 7)){
                    return "D"
                  }
                  else if (grade == 9){
                    return "F"
                  }
                  else{
                    return null
                  }
                }
                if (type == "Scale 1"){
                  
                    if (((100 >= grade) && (grade >= 86)) || grade == "A+"){
                      return "A+"
                    }
                    if (((85.99 >= grade) && (grade >= 76)) || grade == "A"){
                      return "A"
                    }
                    if (((75.99 >= grade) && (grade >= 66)) || grade == "B+"){
                      return "B+"
                    }
                    if (((65.99 >= grade) && (grade >= 56)) || grade == "B"){
                      return "B"
                    }
                    if (((55.99 >= grade) && (grade >= 46)) || grade == "C+"){
                      return "C+"
                    }
                    if (((39.99 >= grade) && (grade >= 36)) || grade == "C"){
                    return "C"
                    }
                    if (((35.99 >= grade) && (grade >= 30)) || grade == "CP"){
                    return "C-"
                    }
                    if (((29.99 >= grade) && (grade >= 0)) || grade == "D+"){
                    return "F"
                    }
                    if (((29.99 >= grade) && (grade >= 0)) || grade == "D"){
                    return "F"
                    }
                    if (((29.99 >= grade) && (grade >= 0)) || grade == "E"){
                      return "F"
                    }
                    else{
                      return null
                    }
                }
            
          case "China":
              
                  if ((100 >= grade) && (grade >= 90)){
                    return "A"
                  }
                  else if ((89 >= grade) && (grade >= 80)){
                    return "B"
                  }
                  else if ((79 >= grade) && (grade >= 70)){
                    return "C"
                  }
                  else if ((69 >= grade) && (grade >= 60)){
                    return "D"
                  }
                  else if ((59 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          default:
              null;
      }
      
      }
      let currentGpa = this.state.gpa;
      let gpaObj = {
        "id": e.target.name,
        "grade": result(country, type, grade)
      }
      //let newGpa = _.merge(currentGpa, gpaObj);
      //this.setState({gpa: newGpa}, ()=> {
        //console.log(result(country, type,grade));
        //console.log(this.state.gpa);
      //});
      if (_.some(currentGpa, ["id", e.target.name])){
        //if id is there remove then add new value
        let newGpa = _.remove(currentGpa, function(n) {
          return n.id != e.target.name;
        });
        let yourGpa = _.concat(newGpa, gpaObj);
      this.setState({gpa: yourGpa}, ()=> {
        console.log(result(country, type,grade));
        //console.log(this.state.gpa);
      });

      }
      else{
      let newGpa = _.concat(currentGpa, gpaObj);
      this.setState({gpa: newGpa});
      }
      if (this.state.country == "Nigeria" && this.state.option == "Waec"){
        //console.log(e.target.name);
        let currentCredit = this.state.credit;
        let creditObj = {
          "id": e.target.name,
          "credit": 1
        }
        //add id so you can find the exact credit on edit
        if (_.some(currentCredit, ["id", e.target.name])){
          //if id is there remove then add new value
          let newCredit = _.remove(currentCredit, function(n) {
            return n.id != e.target.name;
          });
          let yourCredit = _.concat(newCredit, creditObj);
        this.setState({credit: yourCredit});
  
        }
        else{
        let newCredit = _.concat(currentCredit, creditObj);
        this.setState({credit: newCredit});
        }
      }
    }
    handleCourse(e){
      console.log(e.target.value);
      console.log(e.target.name);
      let currentCourse = this.state.currentCourse;
      let courseObj = {
        "id": e.target.name,
        "course": e.target.value
      }
      //add id so you can find the exact credit on edit
      if (_.some(currentCourse, ["id", e.target.name])){
        //if id is there remove then add new value
        let newCourse = _.remove(currentCourse, function(n) {
          return n.id != e.target.name;
        });
        let yourCourse = _.concat(newCourse, courseObj);
      this.setState({currentCourse: yourCourse});

      }
      else{
      let newCourse = _.concat(currentCourse, courseObj);
      this.setState({currentCourse: newCourse});
      }
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
<div className="row-fluid new-gpa-calc-row">
    
    <div className="col-md-6">
    <div className="col-gpa-spaced gpa-instruct-box">
    <h3 className="gpa-subheading">GPA CALCULATOR</h3>
    Various school systems have different requisite grade points across the world. 
    We offer a GPA Calculation tool here on our website for students, high school or otherwise, who may not yet know their average GPA to evaluate the eligibility of their grades against the requirements for admission into their schools of interest. It is particularly useful for continuing students aspiring to join individual schools and want to know their progress. Use our Calculator and check your eligibility today!
    </div>
    </div>
    <div className="col-md-6">
    <div className="col-gpa-spaced gpa-instruct-box">
    <h3 className="gpa-subheading">CONVERSION GUIDE</h3>
    The grading systems vary for various schools in different regions and countries. The challenge is especially daunting for international students. 
    The Academist provides a conversion guide and tool to convert student grades to the format required by their school of interest. Try it now to start your journey to higher learning!
    </div>
    </div>
  </div>
  <br /><br />


 <div className="row-fluid new-gpa-row">
    
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
        {this.state.country == "Nigeria" && this.state.option == "Waec" ?
                null
                :
        <th>Credits</th>
          }
        <th>Grade/Scale</th>
        </tr>
        </thead>
        <tbody>
        {this.state.rows.map(row =>
            <tr key={row.id}>
                <td>{row.id}</td>
                <td><span className="major-select"><input name={`${row.id}`} ref={el => this.inputCourse = el} className="textInput" type="text" onBlur={this.handleCourse.bind(this)} /></span></td>
                {this.state.country == "Nigeria" && this.state.option == "Waec" ?
                null
                :
                <td><span className="major-select"><input name={`${row.id}`} ref={el => this.inputCredit = el} className="textInput" type="text" onBlur={this.handleCredit.bind(this)} /></span></td>
                }
                <td><span className="major-select"><input name={`${row.id}`} ref={el => this.inputGpa = el} className="textInput" type="text" onBlur={this.handleChange.bind(this)} /></span></td>
              
            </tr>
        )}
        </tbody>
    </table>
    <div className="row">
    <div className="col-md-6">
    <button className="gpa-btn aligner" onClick={this.calcGpa.bind(this)}><span className="user-info">Calculate Gpa</span></button>
    </div>
    <div className="col-md-6">
    <button className="gpa-btn aligner" onClick={this.addRow}><span className="user-info">Add Row</span></button>
    </div>
    </div>
    <br/>
    <br/>
    {this.state.result != ""?
    
    <table className="table">
        <thead>
        <tr>
        <th>#</th>
        <th>Class (optional)</th>
        <th>Credits</th>
        <th>Grade</th>
        <th>US Grade</th>
        <th>GPA</th>
        </tr>
        </thead>
        <tbody>
        { !this.state.resultOverview ?
        <h3>Enter your grades to see your gpa</h3>
        :
        <React.Fragment>
        {this.state.resultOverview.map(row =>
        <tr key={row.id}>
          <td><p>{row.id}</p></td>
          <td><p>{row.course}</p></td>
          <td><p>{row.credit}</p></td>
          <td><p>{row.countryGrade}</p></td>
          <td><p>{row.usGrade}</p></td>
          <td><p>{row.gpa}</p></td>
        </tr>
        )}
        </React.Fragment>
        }
        </tbody>
    </table>
    :
    null
    }
    </span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-4">
      <div className="col-spaced gpa-box">
      <div className="row article-sub-row">
      <h3>The Grade Scale</h3>
        <GpaScale gpaCountry={this.state.country} gpaOption={this.state.option}/>
      { this.state.gpa == "" ?
        <p>Enter your grades to calculate US GPA</p>
        :
        <p className="gpa-result">Cumulative GPA: { isNaN(this.state.result) ?
          <span>&nbsp;&nbsp;An error occured</span>
          :
          <span>&nbsp;&nbsp;{this.state.result}</span>
        }
        </p>
      }
        </div>
        </div>
    </div>
    <div className="clearfix">
    </div>
 </div>
<Footer />
</div>
        
    }
}