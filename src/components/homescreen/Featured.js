import React, { Component } from 'react'
import "./featured.css"

export default class Featured extends Component {
    render() {
        return (
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
        )
    }
}
