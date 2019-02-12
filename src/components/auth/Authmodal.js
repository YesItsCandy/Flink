import React, { Component } from 'react'
import Login from "./Login"
import Register from "./Register"
import "./authmodal.css"

export default class Authmodal extends Component {

    render() {
        return (
            <div id="authwrapper">
                <div id="authdialog">
                    <button
                        onClick={evt => (typeof this.props.onClose === "function") && this.props.onClose()}
                        >X</button>
                    <Login onLoggedIn={evt => (typeof this.props.onClose === "function") && this.props.onClose()}/>
                    <Register />
                </div>
            </div>
        )
    }
}
