import React, { Component } from 'react'
import './ReportBreach.css'
import axios from 'axios';
import url from '../../config.json'

export class ReportBreach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            franchisee: [],
            businessArea: [],
            who: [],
            breachCategory: [],
            selectedBreachCategory: '',
            selectedFranchisee: '',
            selectedBusinessArea: '',
            selectedWho: '',
            reporteeName:'',
            reporteeEmailId:'',
            whenBankAware:'',
            whenReported:''


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFranchiseeChange = this.onFranchiseeChange.bind(this);
        this.onBusinessAreaChange = this.onBusinessAreaChange.bind(this);
        this.onWhoChange = this.onWhoChange.bind(this);
    }
    componentDidMount() {
        axios.get(`${url.jsonServerUrl}/franchisee`)
            .then(res => {
                console.log("res inside component did mount", res.data)
                this.setState({
                    franchisee: res.data
                });
            })
        axios.get(`${url.jsonServerUrl}/breachCategory`)
            .then(res => {
                console.log("res inside component did mount breach", res.data)
                this.setState({
                    breachCategory: res.data
                });
            })
    }
    onWhoChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });
        this.state.selectedWho = e.target.value
        this.getWhoDetails(this.state.selectedWho)
    }
    getWhoDetails(who) {
        axios.get(`${url.jsonServerUrl}/${who}`)
            .then(res => {
                console.log("res inside get business Area", res.data)
                this.setState({
                    who: res.data
                });
            })
    }
    onFranchiseeChange(e) {
        console.log("event traget", e.target.value)
        this.getBusinessArea(e.target.value)
    }
    onBusinessAreaChange(e) {
       
    }
    getBusinessArea(franchisee) {
        console.log("Inside get business", franchisee)
        axios.get(`${url.jsonServerUrl}/businessArea/${franchisee}`)
            .then(res => {

                console.log("res inside get business Area", res.data.data)
                this.setState({
                    businessArea: res.data.data
                });
            })
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });

    }
    handleSubmit(e) {
        let url = 'http://10.117.189.248:8095/bank'
        e.preventDefault()
        let isValid = this.validate();
        console.log("isvalid inside validate submit", isValid)
        if (isValid) {
            const accountHolder = {
                email_id: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                mobile_no: this.state.mobileNo,
                password: this.state.password
            };
            console.log(accountHolder)
            axios.post(`${url}/register`, { accountHolder })
                .then(res => {
                    if (res.status === 200) {
                        alert("Registration is successful")
                        this.props.history.push({
                            pathname: '/confirmation',
                            search: '?query=confirmation',
                            //state:{data: response.data}
                            state: { acc_no: res.data.acc_no }
                        })
                    } else {
                        console.log(res.status)
                    }
                }).catch((err) => {
                    alert("Error in registration", err)
                })

        }
    }
    validate() {
        console.log("Inside validate")
        let isValid = true;
        const errors = {
            emailError: '',
            mobileNoError: '',
            passwordError: '',
            firstNameError: '',
            lastNameError: ''
        }
        if (this.state.email.indexOf('@') != -1) {
            if (this.state.firstName.length > 4) {
                if (this.state.lastName.length > 4) {
                    if (this.state.mobileNo.length === 10) {
                        isValid = true;
                    } else {
                        isValid = false;
                        errors.mobileNoError = 'Mobile Number should be 10 digits and should be a number'
                    }
                } else {
                    isValid = false;
                    errors.lastNameError = 'Last name should be more than 4 characters'
                }
            } else {
                isValid = false;
                errors.firstNameError = 'first name should be more than 4 characters'
            }
        } else {
            console.log("is valid is false")
            isValid = false;
            errors.emailError = "Email should have @ and password should have more than 4 characters"
        }




        this.setState({
            ...this.state,
            ...errors
        })
        return isValid;

    }
    render() {
        console.log("franchisee", this.state.franchisee)
        let franchiseeList = this.state.franchisee.map((item, i) => {
            return (
                <option key={i} value={item.value}>{item.name}</option>
            )
        }, this);
        let businessAreaList = this.state.businessArea.map((item, i) => {
            return (
                <option key={i} value={item.value} >{item.name}</option>
            )
        }, this);
        let breachCategoryList = this.state.breachCategory.map((item, i) => {
            return (
                <option key={i} value={item.value}>{item.name}</option>
            )
        }, this);

        return (
            <div>
                <header >
                    <h1>Report the Breach</h1>
                </header>

                <form className="reportbreachform">
                    <label htmlFor="franchise">Franchise </label><br></br>
                    <select className="form-control" onChange={this.onFranchiseeChange} >
                        <option>select</option>
                        {franchiseeList}
                    </select><br></br>
                    <label htmlFor="BusinessArea">Your business area </label><br></br>
                    <select className="form-control"  >
                        <option>select</option>
                        {businessAreaList}
                    </select><br></br>

                    <label htmlFor="who">Select the category of breach </label><br></br>
                    <select className="form-control" onChange={this.handleChange} >
                        <option>select</option>
                        {breachCategoryList}
                    </select><br></br>

                    <label htmlFor="who">Who reported the issue </label><br></br>
                    <select className="form-control" onChange={this.onWhoChange} >
                        <option>select</option>
                        <option>I</option>
                        <option>Colleague</option>
                        <option>Company</option>
                    </select><br></br>
                  
                    <div className="form-group col-xs-3">
                                    <label htmlFor="name">When did bank come to know of the breach?</label>
                                    <br></br>
                                    <input name=""
                                        className="form-control"
                                        type="date"
                                        id="whenBankAware"
                                        value={this.state.whenBankAware}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group col-xs-3">
                                    <label htmlFor="whenReported">When was the issue reported ?</label>
                                    <br></br>
                                    <input name=""
                                        className="form-control"
                                        type="date"
                                        id="whenReported"
                                        value={this.state.whenReported}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group col-xs-3">
                                    <label htmlFor="reportingChannel">Reporting Channel</label>
                                    <br></br>
                                    <select 
                                        className="form-control"
                                        id="reportingChannel"
                                        value={this.state.reportingChannel}
                                        onChange={this.handleChange}
                                    >
                                        <option key="1">select</option>
                                        <option key="2">Online</option>
                                        <option key="3">Offline</option>
                                    </select>
                                </div>
                                <br></br>
                    <button type="submit" id="registerfreesubmit" className="btn btn-primary" onClick={this.handleSubmit}  >Report the breach</button>

                </form>
            </div>
        )
    }
}

export default ReportBreach
