import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
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

    Meteor.loginWithPassword({email}, password, (err) => {
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