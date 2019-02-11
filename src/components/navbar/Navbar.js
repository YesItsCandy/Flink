import React, { Component } from 'react'
import "./navbar.css"

export default class Navbar extends Component {
    render() {
        return (
            <div id="header">
                <h1 id="namelogo">Flink</h1>
                <div id="searchbar">
                    <input id="searchfield" type="search" placeholder="Search" />
                    <button id="searchbutton">Search</button>
                </div>
                <div id="navlinks">
                    <a href="/raffles" className="link">Raffles</a>
                    <a href="/login" className="link">Login</a>
                </div>
            </div>
        )
    }
}
