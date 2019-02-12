import React, { Component } from 'react'
import Axios from 'axios';
import qs from "querystring"
import { UserContext } from '../../Context';

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

    loginOnEnter(evt, usercontext) {
        if (evt.key === "Enter") {
            this.login(usercontext);
        }
    }

    login(usercontext) {
        Axios.post("/login", qs.stringify({
            username: this.state.username,
            password: this.state.password
        })).then(res => {
            if (res.data.success) {
                usercontext.setUser(res.data.user)
                if (typeof this.props.onLoggedIn === "function") {
                    this.props.onLoggedIn()
                }
            } else {
                this.setState({
                    error: "Invalid username or Password"
                })
            }
        }).catch(err => {
            console.error(err)
            this.setState({
                error: "Server communication error"
            })
        })
    }

    render() {
        return (
            <div id="loginform" className="authform">
                <h1>Login</h1>
                <UserContext.Consumer>
                    {uc =>
                        <>
                            <input
                                value={this.state.username}
                                onKeyPress={evt => this.loginOnEnter(evt, uc)}
                                onChange={evt => this.onChange(evt, "username")}
                                placeholder="Username"
                                type="text"
                            />
                            <input
                                value={this.state.password}
                                onKeyPress={evt => this.loginOnEnter(evt, uc)}
                                onChange={evt => this.onChange(evt, "password")}
                                placeholder="Password"
                                type="password"
                            />
                            <button onClick={evt => this.login(uc)}>Login</button>
                        </>
                    }
                </UserContext.Consumer>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}
