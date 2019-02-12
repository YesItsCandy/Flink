import React, { Component } from 'react'
import { UserContext } from '../../Context';
import {Redirect} from "react-router-dom";

export default class Logout extends Component {
  render() {
    return (
      <UserContext.Consumer>
          {uc => {
              if(!uc.user){
                  return <Redirect push to="/"/>
              }else{
                  uc.setUser(null)
              }
          }}
      </UserContext.Consumer>
    )
  }
}
