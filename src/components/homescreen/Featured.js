import React, { Component } from 'react'
import "./featured.css"
import Axios from 'axios';

export default class Featured extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            error: false,
            featured: []
        }
    }

    componentDidMount() {
        Axios.get("/featured")
            .then(res => {
                this.setState({
                    error:false,
                    loaded: true,
                    featured: res.data.slice(0,5)
                })
            }).catch(err => {
                console.error(err)
                this.setState({error:true})
            })
    }


    render() {
        return (
            <div id="featured">
                <h1>Featured</h1>
                <div className="image-gallary">
                    {this.state.featured.map((image, idx) => 
                    <img 
                    key={idx} 
                    alt={image.name} 
                    src={image.src}
                    className="preview-image"
                    />
                    )}
                </div>
                {this.state.error && <h2>Something went wrong loading</h2>}
                {!this.state.loaded && <h2>Loading Symbol</h2>}
            </div>
        )
        //TODO add loading symbol
    }
}
