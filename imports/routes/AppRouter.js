import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//importing createHistory so as to be able to replace the url using history.replace
import createHistory from 'history/createBrowserHistory';
import { Session } from 'meteor/session';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';


 

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

//commented these lines out due to 
//https://github.com/andrewjmead/notes-meteor-course/compare/master...rr4-demo?expand=1
/* const unauthenticatedPages = ['/', '/signup'];

//pages that can be visited if you are authenticated

const authenticatedPages = ['/dashboard']; */




//commented these lines out due to 
//https://github.com/andrewjmead/notes-meteor-course/compare/master...rr4-demo?expand=1

/* export const onAuthChange = (isAuthenticated) => {
    
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

}; */




  

export const AppRouter = () => (
    <Router history={history}>
        <Switch>
            {/* https://www.udemy.com/meteor-react/learn/v4/questions/2269304 */}
            <PublicRoute  path="/" component={Login} exact={true}/>
            <PublicRoute  path="/signup" component={Signup}/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
            {/* This is the route for the individual notes */}
            <PrivateRoute path="/dashboard/:id" component={Dashboard} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)
