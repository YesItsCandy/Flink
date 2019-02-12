import React, { Component } from 'react'
import Login from './Login';
import Register from './Register';
import "./authscreen.css"

export default class Auth extends Component {
  render() {
    return (
      <>
        <Login />
        <div className="vl"/>
        <Register />
      </>
    )
  }
}
