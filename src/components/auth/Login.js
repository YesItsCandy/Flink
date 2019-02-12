import React, { Component } from 'react'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
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

    login(){
        this.setState ({
            username: "",
            password: ""
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
            </div>
        )
    }
}
