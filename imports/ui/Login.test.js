//This will hold test cases for Login
//Copied the imports directly from PrivateHeader.test.js
import { Meteor } from 'meteor/meteor';
import React from 'react';
//importing expect
import expect from 'expect';
import { mount } from 'enzyme' //allows us to mount our component to the dom
//we have to import the component we want to test
import { shallow } from 'enzyme';
import { Login } from './Login';

if (Meteor.isClient) {
    describe('Login', function () {

        //the first setting the error state on the login component works correctly
        it('should show error messages', function () {
            const error = 'This is not working';
            //https://www.udemy.com/meteor-react/learn/v4/questions/4459742
            const history = { replace: () => {} }

            //next we will render login
            const wrapper = shallow(<Login history={history} loginWithPassword={() => {}}/>) //creating and instance of the login component and passing in a prop
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
        it('should call loginWithPassword with the form data', function () {
            //https://www.udemy.com/meteor-react/learn/v4/questions/4459742
            const history = { replace: () => {} }
            //two variables eamil and password
            const email = 'andrew@test.com';
            const password = 'password123';

            //we will create a spy
            const spy = expect.createSpy();
            //const wrapper = mount ( <NoteListItem note={{ title, updatedAt }}/> )
            //passing in the spy
            const wrapper = mount( <Login history={history} loginWithPassword={spy}/>);
            //as part of the props to be sent into wrapper,
            //we will setup input values ie the password and email values
            //ref is available on enzyme
            // to set the value of email, we use node and 'value' 
            wrapper.ref('email').node.value = email;
            //to set the value of password
            wrapper.reduce('password').node.value = password;
            //to simulate a click on submit
            wrapper.find('form').simulate('submit')
            //loginWithPassword={spy} will be called with these values
            //to check that the email and the password are correct
            //calling spy.calls, returns an array with the number of times
            //spy was called and the arguments that it was called with
            //expecting the the email passed in to be equal to the email
            //property set above
            expect(spy.calls[0].arguments[0].toEqual({ email }));
            //expecting the the password passed in to be equal to the password
            //property set above
            expect(spy.calls[0].arguments[1].toBe( password ))

        });

        //to test that when the function is called with an error
        //the error gets set on state
        it('should set loginWithPassword callback errors', function () {
            //https://www.udemy.com/meteor-react/learn/v4/questions/4459742
            const history = { replace: () => {} }
            const spy = expect.createSpy();
            const wrapper = shallow(<Login preventDefault={preventDefault} history={history} loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit');

            //the error is the 3 argument so we need ot select the 3 argument
            //that was sent on the call
            //we will will call it with an error
            //the error property does not have to be shown
            //because in Login.js, if there is an err object, it gets passed in
            //automactically
            spy.calls[0].arguments[2]({});
            //to make sure that the state was set to an error
            //we make sure that the state is not an empty string
            expect(wrapper.state('error')).toNotBe(0);

            //expecting that if loginWithPassword is called without an 
            //that the state.error would be an empty string
            //we are calling this without
            //calling the third argument with no argument
            //calling it without no argument makes state.error an empty string
            spy.calls[0].arguments[2]();
            //we make sure that the state is an string
            expect(wrapper.state('error')).toBe(0);
        });


    });
}