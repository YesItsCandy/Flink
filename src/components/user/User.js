import React, { Component } from 'react';
import './user.css';
import Axios from 'axios';
import UserLink from './UserLink';

export default class Homescreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        'username': this.props.username,
        'profilepic': 'not working',
        'links': []
      }
    };
  }

  componentWillMount() {
    Axios.get('/user/' + this.props.username).then(res => {
      if (res.data.success) {
        this.setState({
          user: res.data.user
        });
      } else {
        this.setState({
          error: 'User does not exist'
        });
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        error: 'Failed to load user data'
      });
    });
  }

  render() {
    return (
      <div id="user-page">
        <div id="user-banner">
          <div id="user-icon" style={{backgroundImage: 'url(' + this.state.user.profilepic + ')'}}>
          </div>
          <div id="user-info">
            <div id="user-name">
              {this.state.user.username}
            </div>
            <div id="user-links">
              {this.state.user.links.map((userLink, index) => (<UserLink key={index} site={userLink.site} tag={userLink.tag} />))}
            </div>
          </div>
        </div>
        <div id="user-main">
        </div>
      </div>
    );
  }
}
