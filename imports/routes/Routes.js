import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Dashboard from '../ui/Dashboard';

 

export const history = createHistory()
//console.log(history);

// //run code to check if user is logged in
// export const onEnterPublicPage = () => {
//     //if there is a user
//     if (Meteor.userId()) {
//       //send the user to the correct location
//       this.props.history.push('/links');
//     }
//   }

//all pages the user should not be able to visit
//if they are not authenticated

const unauthenticatedPages = ['/', '/signup'];

//pages that can be visited if you are authenticated

const authenticatedPages = ['/dashboard'];



export const onAuthChange = (isAuthenticated) => {
    //this is the current pathname of the user
  const pathname = history.location.pathname;
  //this will be true if user is on a page not requiring authentication
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
  //if on authenticated page and logged in, redirect to /links
  if(isUnauthenticatedPage && isAuthenticated){
    //redirect to links
    history.replace('/dashboard');
  } else if(isAuthenticatedPage && !isAuthenticated){
    //redirect to /
    history.replace('/');
    //console.log("redirect");
  }

};

  

export const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)