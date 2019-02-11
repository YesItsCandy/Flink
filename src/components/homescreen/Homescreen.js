import React, { Component } from 'react'
import "./homescreen.css"

export default class Homescreen extends Component {
    render() {
        return (
            <>
                <div id="welcometext">
                    <h1>Welcome</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div id="featured">
                    <h1>Featured</h1>
                    <div className="image-gallary">
                        <img className="preview-image" alt="placeholder" src="https://via.placeholder.com/350x150" />
                        <img className="preview-image" alt="placeholder" src="https://via.placeholder.com/100x100" />
                        <img className="preview-image" alt="placeholder" src="https://via.placeholder.com/300x150" />
                        <img className="preview-image" alt="placeholder" src="https://via.placeholder.com/100x200" />
                        <img className="preview-image" alt="placeholder" src="https://via.placeholder.com/200x300" />
                    </div>
                </div>
            </>
        )
    }
}
