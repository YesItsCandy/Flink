import React, { Component } from 'react'
import Axios from 'axios';
import qs from "querystring"

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            error: false
        }
    }

    onChange(evt, field) {
        this.setState({
            [field]: evt.target.value
        })
    }

    loginOnEnter(evt, field) {
        if (evt.key === "Enter") {
            this.login();
        }
    }

    login() {
        Axios.post("/login", qs.stringify({
            username: this.state.username,
            password: this.state.password
        })).then(res => {
            if(res.data.success){
                if(typeof this.props.onLoggedIn === "function"){
                    this.props.onLoggedIn()
                }
            }else{
                this.setState({
                    error: "Invalid username or Password"
                })
            }
        }).catch(res => {
            this.setState({
                error: "Server communication error"
            })
        })
    }

    render() {
        return (
            <div id="loginform" className="authform">
                <h1>Login</h1>
                <input
                    value={this.state.username}
                    onKeyPress={evt => this.loginOnEnter(evt)}
                    onChange={evt => this.onChange(evt, "username")}
                    placeholder="Username"
                    type="text"
                />
                <input
                    value={this.state.password}
                    onKeyPress={evt => this.loginOnEnter(evt)}
                    onChange={evt => this.onChange(evt, "password")}
                    placeholder="Password"
                    type="password"
                />
                <button onClick={evt => this.login()}>Login</button>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}
