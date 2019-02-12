import React, { Component } from 'react'
import "./homescreen.css"
import Featured from './Featured';
import { UserContext } from '../../Context';

export default class Homescreen extends Component {
    render() {
        return (
            <>
                <div id="welcometext">
                    <UserContext.Consumer>
                        {uc =><h1>Welcome {uc.user?uc.user.username:""}</h1>}
                    </UserContext.Consumer>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <Featured />
            </>
        )
    }
}
