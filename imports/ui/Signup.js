

import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

//new prop types package. The older version is depreciated.
import PropTypes from 'prop-types';

//methods needed to signing up a new user lives here
//'meteor/accounts-base'


//component for creating signup page
export class Signup extends React.Component {
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
      if(Meteor.userId()){
          this.props.history.replace('/dashboard');
      } 
    }
  onSubmit(e) {
    //preventing the default full page refresh
    e.preventDefault();
    //this technique can be used to get the info from the form
    //e.target.email.value

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    //password validation
    if (password.length < 9){
      return this.setState({error: 'Password must be more than 8 characters long'});
    }

    //create user object
    this.props.createUser({email, password}, (err) => {

      //logs error to the console
      //console.log('Signup callback', err);

      if (err) {
        //set the state error object to have the error
        this.setState({error: err.reason});
      } else {
        //this is to clean out the errors
        //essentially doing this shows that there are no errors currently
        this.setState({error: ''})
      }

    });

    // this.setState({
    //   error: 'Something went wrong.'
    // });
    
    //updating the error message
  }
  // increment(){
  //   //setting state
  //   this.setState({
  //     //fetching state
  //     count: this.state.count + 1
  //   });
  // }
  // decrement(){
  //   this.setState({
  //     count: this.state.count - 1
  //   })
  // }
    render() {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Join</h1>
            {/* If there is an error return the error otherwise return undefined */}
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            {/* to remove inbuilt browser validation  use, the noValidate */}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>

            {/* <p>{this.state.count}</p>
            <button onClick={this.increment.bind(this)}>+1</button>
            <button onClick={this.decrement.bind(this)}>-1</button> */}

            <Link to="/">Already have an account?</Link>
          </div>
        </div>
      )
    };
  };
  
  //create imports/ui/ add Signup.js
  //Define component and export as default
  //Import and use

  //since we are passing in a prop we need to
  //provide proptypes
  Signup.propTypes = {
    createUser: PropTypes.func.isRequired
  }
  
  //default export which is  a 
  //containerized version of signup - accounts.user gets called here
  export default createContainer(() => {
    return {
      //providing the prop for the method account.user
      createUser: Accounts.createUser

    };


  }, Signup);