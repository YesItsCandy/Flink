import React, { Component } from 'react'

import { UserContext } from '../../Context';
import RequireLogin from '../auth/RequireLogin';

export default class Settings extends Component {

    render() {
        return (
            <>
                <RequireLogin />
                <UserContext.Consumer>
                    {uc =>
                        <>
                            <h1>WIP</h1>
                        </>
                    }
                </UserContext.Consumer>
            </>
        )
    }
}