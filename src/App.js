import React from 'react';
import {SignIn} from './components/containers/SignIn';
import {Home} from './components/containers/Home';
import {AcceptInvite} from './components/containers/AcceptInvite';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/Signin' component={SignIn} />
          <Route path='/app/:user' component={Home} />
          <Route path='/accept-invite/:user/:thread/:threadName' component={AcceptInvite}/>
          <Route exact path="/" render={() => (<Redirect to='/app/:user' />)} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
