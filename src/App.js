import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import Homescreen from './components/homescreen/Homescreen';
import User from './components/user/User';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import E404 from './components/error/E404';
import Auth from './components/auth/Authscreen';
import {UserContext} from "./Context"
import Axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       user: null
    }
  }
  

  setUser(user){
    this.setState({
      user: user
    })
  }

  componentDidMount(){
    Axios.post("login").then(res => {
      if(res.data.success){
        this.setState({
          user: res.data.user
        })
      }
    })
  }

  render() {
    return (
      <UserContext.Provider value={{
        user:this.state.user,
        setUser:user => this.setUser(user)
      }}>
        <div className="App" id="wrapper">

          <Navbar usemodal={true} />

          <div id="content">
            <Router>
              <Switch>
                <Route exact path="/" component={Homescreen} />
                <Route exact path="/login" component={Auth} />
                <Route path="/user/:username" render={({ match }) => (<User username={match.params.username} />)} />
                <Route component={E404} status={404} />
              </Switch>
            </Router>
          </div>

          <div id="footer">
            <a href="/imprint" className="link">Imprint</a>
          </div>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
