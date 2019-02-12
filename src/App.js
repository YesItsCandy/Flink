import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import Homescreen from './components/homescreen/Homescreen';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import E404 from './components/error/E404';


class App extends Component {
  render() {
    return (
      <div className="App" id="wrapper">

        <Navbar />

        <div id="content">
          <Router>
            <Switch>
              <Route exact path="/" component={Homescreen} />
              <Route component={E404} status={404}/>
            </Switch>
          </Router>
        </div>

        <div id="footer">
          <a href="/imprint" className="link">Imprint</a>
        </div>
      </div>
    );
  }
}

export default App;
