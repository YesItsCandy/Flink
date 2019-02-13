import React, { Component } from 'react'
import Axios from 'axios';
import qs from "querystring"
import { UserContext } from '../../Context';

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            error: null
        }
    }

    onChange(evt, field) {
        this.setState({
            [field]: evt.target.value
        })
    }

    registerOnEnter(evt, usercontext) {
        if (evt.key === "Enter") {
            this.register(usercontext);
        }
    }

    register(usercontext) {
        if (this.state.password && this.state.repeatPassword
            && this.state.username && this.state.email) {
            if (this.state.password !== this.state.repeatPassword) {
                this.setState({ error: "Passwords don't match" })
            } else {
                Axios.post("/register", qs.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
                })).then(res => {
                    if (res.data.status === "error") {
                        this.setState({ error: res.data.error })
                    } else {
                        Axios.post("/login", qs.stringify({
                            username: this.state.username,
                            password: this.state.password
                        })).then(res => {
                            if (res.data.success) {
                                usercontext.setUser(res.data.user)
                                if (typeof this.props.onLoggedIn === "function") {
                                    this.props.onLoggedIn()
                                }
                            }
                        }).catch(err => {
                            console.error(err)
                        })
                    }
                }).catch(err => {
                    console.error(err)
                })
            }
        }
    }

    render() {
        return (
            <div id="regform" className="authform">
                <h1>Register</h1>
                <UserContext.Consumer>
                    {uc =>
                        <>
                            <input
                                value={this.state.username}
                                onKeyPress={evt => this.registerOnEnter(evt, uc)}
                                onChange={evt => this.onChange(evt, "username")}
                                placeholder="Username"
                                type="text"
                            />
                            <input
                                value={this.state.email}
                                onKeyPress={evt => this.registerOnEnter(evt, uc)}
                                onChange={evt => this.onChange(evt, "email")}
                                placeholder="Email Address"
                                type="text"
                            />
                            <input
                                value={this.state.password}
                                onKeyPress={evt => this.registerOnEnter(evt, uc)}
                                onChange={evt => this.onChange(evt, "password")}
                                placeholder="Password"
                                type="password"
                            />
                            <input
                                value={this.state.repeatPassword}
                                onKeyPress={evt => this.registerOnEnter(evt, uc)}
                                onChange={evt => this.onChange(evt, "repeatPassword")}
                                placeholder="Repeat Password"
                                type="password"
                            />
                            <p>{this.state.error}</p>
                            <button onClick={evt => this.register(uc)}>Register</button>
                        </>
                    }
                </UserContext.Consumer>
            </div>
        )
    }
}
