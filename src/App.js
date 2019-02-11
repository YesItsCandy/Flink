import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import Homescreen from './components/homescreen/Homescreen';


class App extends Component {
  render() {
    return (
      <div className="App" id="wrapper">

        <Navbar />

        <div id="content">
          <Homescreen />
        </div>

        <div id="footer">
          <a href="/imprint" className="link">Imprint</a>
        </div>
      </div>
    );
  }
}

export default App;
