import React, { Component } from 'react'
import "./searchbar.css"

export default class Searchbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: ""
        }
    }

    onChange(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    searchOnEnter(evt) {
        if (evt.key === "Enter") {
            this.search();
        }
    }

    search() {
        if(typeof this.props.onSearch === "function"){
            this.props.onSearch(this.state.value)
        }
    }

    render() {
        return (
            <div id="searchbar">
                <input
                    id="searchfield"
                    type="search"
                    placeholder="Search"
                    value={this.state.value}
                    onChange={evt => this.onChange(evt)}
                    onKeyPress={evt => this.searchOnEnter(evt)}
                />
                <button onClick={evt => this.search()} id="searchbutton">Search</button>
            </div>
        )
    }
}
