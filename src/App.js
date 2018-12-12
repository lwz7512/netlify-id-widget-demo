import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Router, Link, navigate } from "@reach/router"
import netlifyIdentity from 'netlify-identity-widget';


let Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)

let Dash = () => <div>
    <h1>Dashboard</h1> 
    <Link to="/">Home</Link>
  </div>


class Homeboard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       user: null
    }
  }

  componentDidMount() {
    const user = netlifyIdentity.currentUser();
    console.log({ user });
    if(user) this.setState({user})
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        {this.state.user?<p>I m {this.state.user.user_metadata.full_name}</p>:false}
      </div>
    )
  }
  

}

class Dashboard extends Component {

  // rcon
  constructor(props) {
    super(props)
  
    this.state = {
       user: null
    }

  }

  // cdm down enter
  componentDidMount() {
    const user = netlifyIdentity.currentUser();
    console.log({ user });
    if(user) this.setState({user})
  }
  
  
  login = () => {
    netlifyIdentity.ctx = this
    console.log('loging...');
    netlifyIdentity.open()
    netlifyIdentity.on('login', user => {
      console.log('user got!', user)
      netlifyIdentity.ctx.setState({user})
      netlifyIdentity.close()
      setTimeout(()=>navigate('/'), 400);
    })
  }

  logout = () => {
    netlifyIdentity.ctx = this
    console.log('logout...');
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      console.log('user logout!')
      netlifyIdentity.ctx.setState({user:null})
    })
  }


  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Dashboard</h1> 
        {this.state.user?
          (
            <div>
            <p>Welcome: {this.state.user.user_metadata.full_name}</p>
            <button onClick={this.logout}>Log out</button>
           </div>
          ):
          (<button onClick={this.login}>Log in</button>)
        }
      </div>
    )
  }
}

class App extends Component {

  // rcon
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    netlifyIdentity.init();
    console.log('nli init...')
  }
  

  render() {
    return (
      <Router>
        <Homeboard path="/" />
        <Dashboard path="dashboard" />
      </Router>
    )
  }

}

export default App;
