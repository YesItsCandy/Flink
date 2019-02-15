import React, { Component } from 'react'
import Login from "./Login"
import Register from "./Register"
import "./authmodal.css"
import { BrowserRouter as Router } from "react-router-dom";

export default class Authmodal extends Component {

    render() {
        return (
            <div id="authwrapper">
                <Router>
                    <div id="authdialog">
                        <button
                            onClick={evt => (typeof this.props.onClose === "function") && this.props.onClose()}
                        >X</button>
                        <Login onLoggedIn={evt => (typeof this.props.onClose === "function") && this.props.onClose()} />
                        <Register onLoggedIn={evt => (typeof this.props.onClose === "function") && this.props.onClose()} />
                    </div>
                </Router>
            </div>
        )
    }
}
