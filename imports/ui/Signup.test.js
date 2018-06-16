//This will hold test cases for Login
//Copied the imports directly from PrivateHeader.test.js
import { Meteor } from 'meteor/meteor';
import React from 'react';
//importing expect
import expect from 'expect';
import { mount } from 'enzyme' //allows us to mount our component to the dom
//we have to import the component we want to test
import { shallow } from 'enzyme';


import { MemoryRouter } from 'react-router-dom';

import { Signup } from './Signup';

if (Meteor.isClient) {
    describe('Signup', function () {

        //the first setting the error state on the login component works correctly
        it('should show error messages', function () {
            const error = 'This is not working';

            //next we will render login
            const wrapper = shallow(<Signup createUser={() => {}}/>) //creating and instance of the login component and passing in a prop
            //the prop provided - loginWithPassword comes from Login.js, where the prop is describe as being requird
            //In the test case Login loginWithPassword={() => {}}/> we don't care if it is called
            //so we don't need to pass in any thing

            /*we want to figure out how to set the state in this component
            we will set the state equal to the error message and then we will 
            verify that the paragraph/the state is being shown correctly*/

            //setState is a method provided by enzyme that allows us to set the component's state
            //inside the component
            wrapper.setState({ error });
            //select wrapper p tags. Get text value. Expect it to equal "error" variable above
            //const tags = wrapper.find('p').text();
            //expect test value to be equal to the test variable
            expect(wrapper.find('p').text()).toBe(error);

            //we want to clear the state
            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        //will make sure that when we supply form data and submit the form
        //loginWith with password getst the data
        it('should call createUser with the form data', function () {
            //two variables eamil and password
            const email = 'andrew@test.com';
            const password = 'password123';

            //we will create a spy
            const spy = expect.createSpy();
            //passing in the spy
            const wrapper = shallow(<Signup createUser={spy}/>);
            //as part of the props to be sent into wrapper,
            //we will setup input values ie the password and email values
            //ref is available on enzyme
            // to set the value of email, we use node and 'value' 
            wrapper.ref('email').node.value = email;
            //to set the value of password
            wrapper.ref('password').node.value = password;
            //to simulate a click on submit
            wrapper.find('form').simulate('submit')
            //createUser={spy} will be called with these values
            //to check that the email and the password are correct
            //calling spy.calls, returns an array with the number of times
            //spy was called and the arguments that it was called with
            //expecting the the email passed in to be equal to the email
            //property set above
            expect(spy.calls[0].arguments[0].toEqual({ email, password }));
           

        });

        it('should set error with short password', function () {
            //two variables eamil and password
            const email = 'andrew@test.com';
            //changed password to a shorter password
            const password = '123   ';

            //we will create a spy
            const spy = expect.createSpy();
            //passing in the spy
            const wrapper = shallow(<Signup createUser={spy}/>);
            //as part of the props to be sent into wrapper,
            //we will setup input values ie the password and email values
            //ref is available on enzyme
            // to set the value of email, we use node and 'value' 
            wrapper.ref('email').node.value = email;
            //to set the value of password
            wrapper.ref('password').node.value = password;
            //to simulate a click on submit
            wrapper.find('form').simulate('submit')
            /* we are going to assert that the error state will have
            a length greater than zero */
            expect(wrapper.state('error').length.toNotBe(0));
           

        });


        it('should set createUser callback errors', function () {
            /* Basically, we will have to set the reason for the error
            if there is an error */
            //we need a password of a valid length so we can bypass the 
            //if condition that checks for the password length in Signup.js
            const password = 'password123';
            //because we need a reason variable to be passed into our spy
            //a couple of lines below
            // we need to create a reason variable
            const reason = 'This is why it failed';
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy}/>);

            //password is set to something valid
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            
            spy.calls[0].arguments[1]({ reason });
            //to make sure that the state was set to an error
            //we make sure that the state.error is the same as the reason
            expect(wrapper.state('error')).toBe(reason);

            
            spy.calls[0].arguments[1]();
            //we make sure that the state is an empty string
            expect(wrapper.state('error')).toBe(0);
        });


    });
}