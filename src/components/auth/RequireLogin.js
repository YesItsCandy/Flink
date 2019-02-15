import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { UserContext } from '../../Context';
import { withRouter } from 'react-router-dom'


export default withRouter(class RequireLogin extends Component {

    redirectIfLoggedIn(user) {
        if (!user) {
            return <Redirect to={`/login?next=${this.props.location.pathname}`} />
        }
    }

    render() {
        return (
            <>
                <UserContext.Consumer>
                    {uc => this.redirectIfLoggedIn(uc.user)}
                </UserContext.Consumer>
            </>
        )
    }
})
