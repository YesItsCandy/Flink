import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import Homescreen from './components/homescreen/Homescreen';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import E404 from './components/error/E404';
import Auth from './components/auth/Authscreen';


class App extends Component {
  render() {
    return (
      <div className="App" id="wrapper">

        <Navbar usemodal={true}/>

        <div id="content">
          <Router>
            <Switch>
            <Route exact path="/" component={Homescreen} />
            <Route exact path="/login" component={Auth} />
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
