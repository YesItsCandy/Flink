import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
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
        this.setState({
            username: "",
            password: "",
            email: "",
            repeatPassword: ""
        })
    }

    render() {
        return (
            <div id="regform" className="authform">
                <h1>Register</h1>
                <input
                    value={this.state.username}
                    onKeyPress={evt => this.loginOnEnter(evt)}
                    onChange={evt => this.onChange(evt, "username")}
                    placeholder="Username"
                    type="text"
                />
                <input
                    value={this.state.email}
                    onKeyPress={evt => this.loginOnEnter(evt)}
                    onChange={evt => this.onChange(evt, "email")}
                    placeholder="Email Address"
                    type="text"
                />
                <input
                    value={this.state.password}
                    onKeyPress={evt => this.loginOnEnter(evt)}
                    onChange={evt => this.onChange(evt, "password")}
                    placeholder="Password"
                    type="password"
                />
                <input
                    value={this.state.repeatPassword}
                    onKeyPress={evt => this.loginOnEnter(evt)}
                    onChange={evt => this.onChange(evt, "repeatPassword")}
                    placeholder="Repeat Password"
                    type="password"
                />
                <button onClick={evt => this.login()}>Login</button>
            </div>
        )
    }
}
