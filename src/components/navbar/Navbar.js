import React, { Component } from 'react'
import "./navbar.css"
import Searchbar from '../input/Searchbar';

export default class Navbar extends Component {
    render() {
        return (
            <div id="header">
                <h1 id="namelogo">Flink</h1>
                <Searchbar onSearch={query => alert(query)}/>
                <div id="navlinks">
                    <a href="/raffles" className="link">Raffles</a>
                    <a href="/login" className="link">Login</a>
                </div>
            </div>
        )
    }
}
