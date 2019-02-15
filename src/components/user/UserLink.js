import React, { Component } from 'react'
import './userlink.css'
import twitter from './icons/twitter.png'
import furaffinity from './icons/furaffinity.png'

export default class UserLink extends Component {
  getHref() {
    switch (this.props.site) {
      case 'twitter': return 'https://twitter.com/' + this.props.tag;
      case 'furaffinity': return 'https://www.furaffinity.net/user/' + this.props.tag;
      default: return '#';
    }
  }

  getIcon() {
    switch (this.props.site) {
      case 'twitter': return twitter;
      case 'furaffinity': return furaffinity;
      default: return '';
    }
  }

  render() {
    return (
      <a className={'user-link'} href={this.getHref()} style={{backgroundImage: 'url(' + this.getIcon() + ')'}} target="_blank" rel="noopener noreferrer">
      </a>
    );
  }
}
