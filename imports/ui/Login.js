import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

//new prop types package. The older version is depreciated.
import PropTypes from 'prop-types';
//first step to testing login. First import  createContainer
import { createContainer } from 'meteor/react-meteor-data';


/* Testing login Second step is restructure the exports for login
we want to export the regular react component and the containerized version.
We will export our regular react component as a named export rather than
as a default  */

export class Login extends React.Component {
  constructor(props) {
    super(props);
    //setting state -> this an exception to setting state
    this.state = {
      //the parent can pass in a default value
      //count: this.props.count || 0
      error: ''
    };
  }
  //if the user is on a public page and signed in,
    //the user is pushed to the links page. 
    //which is where they should be when they are logged in
    componentWillMount(){
      if (Meteor.userId()){
          this.props.history.replace('/dashboard');
      } else if(!Meteor.userId()){
            //else redirect to the main page
            //where unlogged in users should be
            this.props.history.replace('/');
        }
      
    }

  onSubmit(e) {
    //preventing the default full page refresh
    e.preventDefault();
    //this technique can be used to get the info from the form
    //e.target.email.value

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    /*as part of Testing login we changing this from Meteor.props.loginWithPassword
    to this.props.loginWithPassword. We are accessing the prop. 
    This makes it easier is to test our component by making it easier to inject spies
    and to make sure that the spies are called or not called*/
    this.props.loginWithPassword({email}, password, (err) => {
        if (err) {
          //Because the default error given after a failed login 
          // isn't that useful, we change the default err.reason 
          // to the following string 'Unable to login. Check email and password
          this.setState({error: 'Unable to login. Check email and password'});
        } else {
          this.setState({error: ''});
        }
        //Show error to the console
        //console.log('Login callback', err);
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    );
  }
}

//setting up proptypes
Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
  //history: PropTypes.object.isRequired
};

/* Testing login third step exporting the default value
We are exporting a react component that will be containerized.
The function is changed the componenet will be rerendered */

/*create container takes two arguments. The first is the function
The function is reactive */
export default createContainer(() => {
  //createContainer returns an object -which will be added to the props
  //which the component will have access to 
  return {
    //we are going to create a prop here. 
    loginWithPassword: Meteor.loginWithPassword
  };
//the component that we are going to containerized, which in this case is login
}, Login);