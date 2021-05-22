import { Router,
Route,
Redirect,
Switch
} from 'react-router-dom'
import './App.css';
import React from 'react'
import { history } from './utils/history'
import { SignupForm } from './pages/SignUp'
import { SigninForm } from './pages/SignIn'
import { LandingPage } from './pages/Landing'
import { Favorites } from './pages/Favorites'
import { MyRecipes } from './pages/MyRecipes'
import { ViewRecipes} from './pages/ViewRecipes'
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({children, ...rest}) {
  const token = localStorage.getItem('token')
  return (
    <Route {...rest} render={() => {
      return token ? children : <Redirect to="/signin" />
    }} />
  )
}

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
        <PrivateRoute exact path="/favorites">
          <Favorites />
        </PrivateRoute>
        <PrivateRoute exact path="/myrecipes">
          <MyRecipes />
        </PrivateRoute>
        <PrivateRoute exact path="/view/:idRecipe">
          <ViewRecipes />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App;
