import React, { Component } from 'react'
import './AdminDashboard.css'
import axios from 'axios'
import url from '../../config.json'
export class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleId: '',
            breachListOpen: [],
            breachListClosed: [],
            breachList: []
        }
    }
    componentDidMount() {
        const roleId = this.props.location.state.data;
        console.log("roleId isn", roleId)
        this.setState({
            roleId: roleId
        })
        axios.get(`${url.url}/breachInfo/${roleId}`)
            .then(res => {
                console.log("res inside component did mount", res)
                let mydata = res.data
                console.log("My data", mydata)
                for (let i = 0; i < mydata.length; i++) {
                    console.log("status", mydata[i])

                    if (mydata[i].breachStatus === "open") {
                        let newArrayOpen = this.state.breachListOpen.slice();
                        newArrayOpen.push(mydata[i])
                        console.log("newarrayopen", newArrayOpen)
                        this.setState({
                            breachListOpen: newArrayOpen
                        })
                    } else if (mydata[i].breachStatus === "Closed") {
                        let newArrayClosed = this.state.breachListClosed.slice();
                        newArrayClosed.push(mydata[i])
                        console.log("newarrayclosed", newArrayClosed)
                        this.setState({
                            breachListClosed: newArrayClosed
                        });
                    }
                }

            })
        }

    handleTrue(e, ticket) {
        let data ={
            ticketNumber: parseInt(ticket)
        }
        axios.put(`${url.url}/breachAction`, data )
                    .then(res => {
                        if (res.status === 200  ) {
                           alert("Alert status changed successfully")
                        } else {
                            alert("Error in changing alert status")
                        }
                    })
    }
    handleFalse(e,ticket) {
        let data ={
            ticketNumber: parseInt(ticket)
        }
        axios.put(`${url.url}/breachAction`, data )
                    .then(res => {
                        if (res.status === 200  ) {
                           alert("Alert status changed successfully")
                        } else {
                            alert("Error in changing alert status")
                        }
                    })

    }
    handleReopen(e,ticket) {
        let data ={
            ticketNumber: parseInt(ticket)
        }
        axios.put(`${url.url}/reopenTicket`, data )
                    .then(res => {
                        if (res.status === 200  ) {
                           alert("Reopened  ticket successfully")
                        } else {
                            alert("Error in reopening ticket")
                        }
                    })

    }
    render() {

        return (
            <div>
                <div>
                    <h1> Breach Dashboard</h1>

                    <h4 className="openHeading">Open Tickets</h4>
                    <table className="breachtable">
                        <thead className="tableheading">
                            <tr>
                                <th scope="col">Ticket Number</th>
                                <th scope="col">Bussiness Area</th>
                                <th scope="col">Breach Category</th>
                                <th scope="col">Reportee Name</th>
                                <th scope="col">Reprtee EmailId</th>
                                <th scope="col">Breach Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.breachListOpen.map((each, index) => (
                                    <tr className="datarow" scope="row">
                                        <td> {each.ticketNumber}</td>
                                        <td> {each.bussinessArea}</td>
                                        <td> {each.breachCategory}</td>
                                        <td> {each.repoteeName}</td>
                                        <td> {each.repoteeEmailId}</td>
                                        <td> {each.breachStatus}</td>
                                        <td>
                                            <div className="btn-group tab">
                                                <button type="button" id="true" class="btn btn-secondary butTrue" onClick={(e) => { this.handleTrue(e, each.ticketNumber) }}>True Alert</button>
                                                <button type="button" id="false" class="btn btn-secondary butFalse" onClick={(e) => { this.handleFalse(e, each.ticketNumber) }}>False Alert</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    <br>
                    </br><br></br><br></br>
                    <h4 className="openHeading">Closed Tickets</h4>
                    <table className="breachtable">
                        <thead className="tableheading">
                            <tr>
                                <th scope="col">Ticket Number</th>
                                <th scope="col">Bussiness Area</th>
                                <th scope="col">Breach Category</th>
                                <th scope="col">Reportee Name</th>
                                <th scope="col">Reprtee EmailId</th>
                                <th scope="col">Breach Status</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.breachListClosed.map((each, index) => (
                                    <tr className="datarow" scope="row">
                                        <td> {each.ticketNumber}</td>
                                        <td> {each.bussinessArea}</td>
                                        <td> {each.breachCategory}</td>
                                        <td> {each.repoteeName}</td>
                                        <td> {each.repoteeEmailId}</td>
                                        <td> {each.breachStatus}</td>
                                        <td>
                                            <div className="btn-group tab">
                                                <button type="button" id="true" class="btn btn-primary butFalse" onClick={(e) => { this.handleReopen(e, each.ticketNumber) }}>Reopen</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default AdminDashboard
