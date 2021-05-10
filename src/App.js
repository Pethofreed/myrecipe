import { Router,
Route,
Redirect,
Switch
} from 'react-router-dom'
import './App.css';
import React from 'react'
import { Profile } from './pages/Profile'
import { SignupForm } from './pages/SignUp'
import { SigninForm } from './pages/SignIn'
import { history } from './utils/history'
import { LandingPage } from './pages/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/signup">
          <SignupForm />
        </Route>
        <Route exact path="/signin">
          <SigninForm />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
