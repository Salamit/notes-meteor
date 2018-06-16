//this is the testing file for the component privateHeader.js
import { Meteor } from 'meteor/meteor';
import React from 'react';
//importing expect
import expect from 'expect';
import { mount } from 'enzyme' //allows us to mount our component to the dom
//we have to import the component we want to test
import { PrivateHeader } from './PrivateHeader'

//because this is a client side test 
if (Meteor.isClient) {
    describe('PrivateHeader', function () {
        it('should set button text to logout', function () {
            //we want to render an instance of private header
            //so that we can assert that it exists
            //we are always going to be calling mount 
            //anytime we text a react component
            //we pass the jsx that we want to render into 
            //mount. 
            //mount returns something important called a wrapper
            //which will be using time and time again
            //we are going to create a const for our wrapper value
            //a wrapper is a building block for our enzyme functions
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )

            /* we use find to provide a selector to search for somehting 
            Below I can select all selectors with a class of button. We can call 
            other methods. Below we are going to call text. Text exttracts the string
            from a value. We are going to set the return value to buttonText*/
            const buttonText = wrapper.find('button').text();

            //we will set an expect 
            expect(buttonText).toBe('Logout');
        });
        /*we are going to check that the title we pass in actually gets used */
        it('should use title prop as h1 text', function () {
            const title = "Test title here";
            //use mouint to render PrivateHeader with title
            const wrapper = mount ( <PrivateHeader title={title} handleLogout={() => {}}/>)
            //Use find to find h1 -> gets its text value. Store in variable
            const titleHeader = wrapper.find('h1').text();
            //expect test value to be equal to the test variable
            expect(titleHeader).toBe(title);
        });


        /* Spies are a way to mock real functions. It mocks/pretends to be the function.
        Documentation for spies can eb found in the expect library */
        // it('should call the function', function () {
        //     //a spy is a function
        //     //expect.creatSpy creates and returns
        //     // a brand new spy. createSpy is a function so you can 
        //     //call it with any arguments you like

        //     const spy = expect.createSpy();
        //     /*calling the spy. Usually the spy is called somewhere else like in a 
        //     component */
        //     spy(3, 4, 123);
        //     //you can call the spy many times
        //     spy('Andrew');
            //debugger;

            // //test that the spy was called. 
            // expect(spy).toHaveBeenCalled();
            // /* This will pass if the spy was called. It will throw an error
            // if the spy was not called.  */

            // /*You can also assert that a spy has not been called using
            // expect(spy).toNotHaveBeenCalled() */

            // /*You can also check what your spy was called with. You can
            // do this using the toHaveBeenCalled with method*/
            // expect(spy).toHaveBeenCalledWith(3, 4, 123);
        //});

        /**The calls array 
         * getting the spy inside private header
         * how do we get spy called in the test environment
         * and how do we make sure that accounts.logout gets called in 
         * development and production, we are going to pass in the 
         * logout function as a prop. Thus we can specify a spy in our test
         * suite and can specify in the production and development environments
         * Thus we are going to set up a new prop type
         * we are going to have a second prop for privateheader called handleLogout.
         * which will be responsible for handling logout in production and development.
         * IN production and development, it will be responsible for handliing logout and
         * calling accounts.logout. In the test suite it will be just a spy 
         * 
        */
        //this will test that our spy gets called on button click
        it('should call handleLogout on click', function () {

            //we will need to create a brand new spy
            const spy = expect.createSpy();
            //the spy will get passed as a prop
            //we will render privateheader passing in a title and your spy
            const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/>)
            //we know how to target the button, next we will simulate events
            //selection all classes with the button method
            //then we will simulate a click
            wrapper.find('button').simulate('click');

            //expect spy to have been called
            expect(spy).toHaveBeenCalled();
            

            //because we are requiring the 
            //other prop to get passed in
            //we will have to correct our other calls to so that they
            //mount - handleLogout
               
        });
    });
}