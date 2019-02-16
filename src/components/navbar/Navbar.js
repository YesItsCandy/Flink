import React, { Component } from 'react'
import ReactDOM from "react-dom"
import "./navbar.css"
import Searchbar from '../input/Searchbar';
import Authmodal from "../auth/Authmodal"
import { UserContext } from '../../Context';
import Axios from 'axios';
import Cookies from 'universal-cookie';

export default class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showAuth: false
        }
    }


    changeModal(open) {
        this.setState({
            showAuth: open
        })
    }

    logout(uc) {
        Axios.get("/logout")
            .then(res => {
                uc.setUser(null)
                const cookies = new Cookies();
                cookies.set('user', null, { path: '/' });
            }).catch(err => {
                console.err(err)
            })
    }

    userButton = context => {

        if (!context.user) {
            return (
                <>
                    {!this.props.usemodal && <a href="/login" className="link">Login</a>}
                    {this.props.usemodal && <p onClick={evt => this.changeModal(true)} className="link">Login</p>}
                </>
            )
        } else {
            return <p onClick={evt => this.logout(context)} className="link">Logout</p>
        }

    }

    render() {

        return (
            <div id="header">
                {this.state.showAuth && ReactDOM.createPortal(<Authmodal onClose={evt => this.changeModal(false)} />, document.getElementById("authmodal"))}
                <a className="link" href="/"><h1 id="namelogo">Flink</h1></a>
                <Searchbar onSearch={query => alert(query)} />
                <div id="navlinks">
                    <a href="/raffles" className="link">Raffles</a>
                    <UserContext.Consumer>
                        {uc => this.userButton(uc)}
                    </UserContext.Consumer>
                </div>
            </div>
        )
    }
}
