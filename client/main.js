import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
//importing named export session to use Session
import { Session } from 'meteor/session';

//To create routes we need 3 things
//import { browserHistory} from 'react-router';
//had issues with the line above and got a solution.
//solution was from here: https://www.udemy.com/meteor-react/learn/v4/questions/2145722
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//A different solution was needed. The below is what I tried
//import { Router, Route, Switch } from 'react-router-dom';
//After trial 3 here is a confirmed working solution
import { Routes, onAuthChange, history } from '.././imports/routes/Routes';
//import { Router, Route, Switch } from 'react-router-dom';
import {createBrowserHistory } from 'history/createBrowserHistory';
//import createBrowserHistory from 'history/createBrowserHistory';
//import { withRouter } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import Redirect from 'react-router-dom/Redirect';
//this line imports the simple-schema configuration that allows us to customize 
//the errors that are thrown by letting us throw meteor errors
import '../imports/startup/simple-schema-configuration.js';


//import the new collection into the server file
//to create the collection
// import { Links } from '../imports/api/links';
 

//import Signup
//import Signup from './../imports/ui/Signup';
//import link
//import Lnk from './../imports/ui/Link';
//import NotFound
//import NotFound from './../imports/ui/NotFound';
//import Login
//import Login from './../imports/ui/Login';


//const browserHistory = createBrowserHistory();






//Routes



// const routes = (

//   //defining the routes here
//   <Router history={browserHistory}>
//     <Switch>
//       {/*The below routes aren't defined as seen below in the video
//       Additional instructions on the problem I faced and why I have the 
//       routes defined as below can be found at they link below.
//     https://www.udemy.com/meteor-react/learn/v4/questions/2145722*/}
//         <Route exact path="/" component={Login}/>
//         <Route exact path="/signup" component={Signup}/>
//         <Route exact path="/links" component={Lnk}/>
//         <Route component={NotFound}/>
//           {/* <Route render={({ history}) => (
//     <button
//       type='button'
//       onClick={() => { history.push('/new-location') }}
//     >
//       Click Me!
//     </button>
//   )} /> */}
//     </Switch>
      
//   </Router>
// );

//tracker watches for changes
Tracker.autorun(() => {
  //stores the users authenticated status
  //Using the !!Meteor.userId allows for a truthy 
  //value/a string to be converted to a boolean 
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  //console.log('isAuthenticated', isAuthenticated);
});



/* Lecture 80 - Stateless Functional Compnents
// Stateless functional component
This is a component and it is just a function and it 
doesn't support react component states
There are certain components that stateless functional 
components are good for. 
// A sample is below
*/
//The component can use props by pass the prop as an argument
// const MyComponent = (props) => {
//   /* compared to earlier components where we need render() 
//   to render components to the screen. This - MyComponent 
//   acts like the renderer. Hence whatever is returned 
//   is what gets returned to the screen. - sdee the samp;e
//   below
//    */
//   //importing react because it is needed to run jsx
//   return (
//     <div>
//       {/* To access the prop reference it
//       below using {props.name} since in this 
//       case the prop is passed below where the component is 
//       being rendered */}
//       <h1>MyComponent is here! {props.name} </h1>
//     </div>
//   );

//   /* Stateless functional components are great
//   for presentational components - components
//   that are concerned with just presentations - not 
//   fetching things from the database - all it does is
//   presents, rendering information. This goes against
//   container component - which are complex like maintaing
//   the database, maintaining states over time. 
  
//   In the case of container componets, the job is getting
//   information and not presenting components
  
//   Presentational components are a lot faster than es6 components
//   and a lot easier to read 
//   and finally they are a lot easier to run test on.
//   Use them when you don't need lifecycle mangament or to 
//   keep check on a state.*/
// };

/*Setting up a tracker autorun to show how to make the links rerender
when the filter changes. In this session is going to autorun everytime 
name changes. */

// Tracker.autorun(() => {
//   const name = Session.get('name');
//   console.log('Name: ', name);
// })

// /*Lecture 85 */
// /* Session.set is one of the two methods that we will use. 
// It takes two values - the key and the values.
// For example I can set Session.set('name', 'Andrew Mead') */
// Session.set('name', 'Andrew Mead');
/*The second value we will get is session.get
which allows use to retrieve values using the keys e.g. to 
retrieve Andrew Mead which was set in Session.set above, 
we use Session.get('name')
 */

//Printing session values to the console
//console.log('Name: ', name);
/* We use session.get because it is reactive - for example if
we were to put session.get into a function, like tracker,
the function is going to rerun everytime the value of the key changes  */


Meteor.startup(() => {
  // code to run on server at startup
  //This is code to call the meteor method in the links.js file
  //we use meteor.call to call methods - it takes some arguments
  //the method to call; a callback function
  //should there be an error, the err parameter gets populated else the res gets populated
  //Methods also take arguments. It would be like in Mike after the greetUser, call
  //The client side method call only gets called to simulate changes to the database
  //It only gets fired when the server responds. It could respond 
  //with an error or with a response depending on what the server returns
  //It is never called by the client
  // Meteor.call('addNumbers', 1, 2, (err, res) => {
  //   //printing the arguments to the screen
  //   console.log('Add Numbers Arguments', err, res);

  // })
  //Meteor.call('links.insert', 'adgahjd')
  //rendering a stateless component
  //ReactDOM.render(<MyComponent/>, document.getElementById('app'));
  //The stateless component can be rendered with props as shown below
  //ReactDOM.render(<MyComponent name="Mike"/>, document.getElementById('app'));

  //We are setting show visible to true
  //This will show visible links 
  //This sets 'showVisible' and allows this value to be retrieve
  //as showVisible is set to true, else where the value 
  //showVisible will be true
  //Session.set('showVisible', true);

  /* to see how changes in showVisible affect what is rendered to the screen
  this was used in the console
  require('meteor/session').Session.set('showVisible', true); */

  ReactDOM.render(<Routes />, document.getElementById('app'));
  
});