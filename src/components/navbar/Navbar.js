import React, { Component } from 'react'
import ReactDOM from "react-dom"
import "./navbar.css"
import Searchbar from '../input/Searchbar';
import Authmodal from "../auth/Authmodal"
import { UserContext } from '../../Context';

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

    userButton = context => {

        if (!context.user) {
            return (
                <>
                    {!this.props.usemodal && <a href="/login" className="link">Login</a>}
                    {this.props.usemodal && <p onClick={evt => this.changeModal(true)} className="link">Login</p>}
                </>
            )
        }else{
            return <a className="link" href="logout">Logout</a>
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
