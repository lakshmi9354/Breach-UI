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
            reporteeName: '',
            reporteeEmailId: '',
            whenBankAware: '',
            whenReported: ''


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFranchiseeChange = this.onFranchiseeChange.bind(this);
        this.onBusinessAreaChange = this.onBusinessAreaChange.bind(this);
        this.onBreachCategoryChange = this.onBreachCategoryChange.bind(this);
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
        console.log("event traget:", e.target.value)
        console.log("franchisee value",this.state.franchisee[e.target.value-1].name)
        this.setState({
            selectedFranchisee: this.state.franchisee[e.target.value-1].name
        })
        this.getBusinessArea(e.target.value)
    }
    onBusinessAreaChange(e) {
        console.log("businessarea", e.target.value)
        this.setState({ selectedBusinessArea:  this.state.businessArea[e.target.value-1].name}, () => {
            //console.log(this.state)
        });

    }
    onBreachCategoryChange(e) {
        console.log("breachcategory", e.target.value)
        this.setState({ selectedBreachCategory:  this.state.breachCategory[e.target.value-1].name}, () => {
            //console.log(this.state)
        });

    }
    getBusinessArea(franchisee) {
        console.log("Inside get business", franchisee)
        axios.get(`${url.jsonServerUrl}/bussinessarea/${franchisee}`)
            .then(res => {

                console.log("res inside get business Area", res.data)
                this.setState({
                    businessArea: res.data
                });
            })
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });

    }
    handleSubmit(e) {

        e.preventDefault()
        let isValid = this.validate();
        console.log("isvalid inside validate submit", isValid)
        if (isValid) {
            const report = {
                franchise: this.state.selectedFranchisee,
                bussinessArea: this.state.selectedBusinessArea,
                breachCategory: this.state.selectedBreachCategory,
                reporteeName: '',
                reporteeEmailId: '',
                whenBankAware: this.state.whenBankAware,
                whenReported: this.state.whenReported,
                companyName: '',
                reportingChannel: '',
                compromiseType: '',
                creditCardNumber: '',
                debitCardNumber: '',
                cardHolderName: '',
                cardHolerAge: '',
                contactNo: '',
                reason: '',

            };
            console.log("report fields", report)
            axios.post(`${url.url}/breach`, report)
                .then(res => {
                    if (res.status === 201) {
                        alert(`Breach submitted successfully..Ticket number is ${res.data.ticketNumber}`)
                        
                    } else {
                        alert("Error in submitting breach")
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
            franchiseeError:''
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
                <option key={i} value={item.value}>{item.name}</option>
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
                    <select className="form-control" onChange={this.onBusinessAreaChange} >
                        <option >select</option>
                        {businessAreaList}
                    </select><br></br>

                    <label htmlFor="who">Select the category of breach </label><br></br>
                    <select className="form-control" onChange={this.onBreachCategoryChange} >
                        <option>select</option>
                        {breachCategoryList}
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
                    <button type="submit" id="submit" className="btn btn-primary" onClick={this.handleSubmit}  >Report the breach</button>

                </form>
            </div>
        )
    }
}

export default ReportBreach
