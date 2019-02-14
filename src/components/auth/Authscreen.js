import React, { Component } from 'react'
import Login from './Login';
import Register from './Register';
import "./authscreen.css"
import qs from "querystring"

export default class Auth extends Component {
  render() {
    return (
      <>
        <Login next={qs.parse(this.props.location.search.slice(1)).next}/>
        <Register next={qs.parse(this.props.location.search.slice(1)).next}/>
      </>
    )
  }
}
