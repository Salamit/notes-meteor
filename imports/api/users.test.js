//importing Meteor to run Meteor.isServer below
import { Meteor } from 'meteor/meteor';
//importing expect, an assertion library
import expect from 'expect';

//calling validateNewUser from the users.js file
//this are the values to be tested
import { validateNewUser } from './users';
//we can now call the tests against these values
//always place test cases in a describe block

/* because tests are run on both the server and client side
and because validateNewUser is a server defined method
we should only run it on the server. To ensure that this method is 
only run on the server we add an if condition. */
if (Meteor.isServer) {
    describe('users', function () {
            /*we have to reverse engineer the data we want to 
            for example we have to validate user.emails[0].address
            This entails some reverse engineering. Breaking up 
            user.emails[0].address, we have an object called user which
            has a property called emails. Emails' value is an array and we
            have to grab the first element of the array. The first element is
            an object with the property name of address */
            it('should allow valid email address', function () {
                //we are going to create a model schema to be validated
                //2 test cases will be used here
                //- one for a valid email and one without a 
                // valid email
    
                //we are going to call a test for the users.js file
                /* we are going to call the validateNewUser function
                in the users.js file */
                
                //we a going to create a the test case with a valid email address
                const testUser = {
                    //user object has been passed, hence we just go straight for the emails array
                    emails: [
                        //in the emails array, the first element is an object called address
                        {
                            //the property 'address' has the email value we want to validate 
                            //which in this case is 'Test@example.com'
                            address: 'Test@example.com'
                        }
    
                    ]   
                };
                //we are going to validate this model schema against validateNewUser
                const res = validateNewUser(testUser);
    
                //make our assertion using expect
                /*we pass to toBe the value we are expecting
                in the simpleSchema we are expecting the value to be 
                true if the email is proper - which is the value 
                that simpleSchema returns */
                expect(res).toBe(true);
    
                /*the console returns an the following error  
                "    Uncaught TypeError: Accounts.validateNewUser is not a function
                    at users.js (app.js:52)
                    at fileEvaluate (modules-runtime.js:353)
                    at require (modules-runtime.js:248)
                    at users.test.js (app.js:140)
                    at fileEvaluate (modules-runtime.js:353)
                    at require (modules-runtime.js:248)
                    at app.js:254"
                This is because validateNewUser is only available to the server. 
                It is a server defined method to fix this, we add the following to the
                users.js file 
                if (Meteor.isServer) {
                    Accounts.validateNewUser(validateNewUser);
                } */
            });

            //test case for an invalid email
            it('should reject invalid email', function () {
                //we are going to expect that a function throws an error
                //using .toNotThrow()
                //compare this against .toBe - which checks the value
                //in this case we are going to expect that a function should
                //not throw an error or throws an error
                //we want to throw an error if valid data is not passed in
                //create a test case
                const testUser = {
                    //user object has been passed, hence we just go straight for the emails array
                    emails: [
                        //in the emails array, the first element is an object called address
                        {
                            //the property 'address' has the email value we want to validate 
                            //which in this case is 'Test@example.com'
                            address: 'Test@example.com'
                        }
    
                    ]   
                };
                
                expect(() => {
                    validateNewUser(testUser);
                }).toNotThrow();
            })
    
     });

}




//making a test case
/* To create a new test funciton you use the it
function. It takes two arguments, a string and 
a function
it('', function () {

});*/




// //the value of this is implicitly returned
// const add = (a, b) => {

//     if (typeof b !== 'number') {
//         return a + a;

//     }

//     /*another reason to test to serve as a check against 
//     code changes that lead to errors*/
//     return a + b;
// }

// const square = (a) => a * a;

// //grouping tests
// describe('add', function () {
//     it('should add two numbers', function () {
//         const res = add(11, 9);

//         //we want to check that a value equals another value
//         //the general flow -we call expect with the value we want to check
//         //in this case we call it with the result variable
//         expect(res).toBe(21);  
//         //instead of our throw new Error below, we will use
//         //expect above. 
//         //if we don't get the expected amount
//         // if (res != 20) {
//         //     //throw the error
//         //     throw new Error('Sum was not equal to expected value');
//         // }
//     });

//     it('should double a single number', function () {
//         const res = add(44);

//         //checking the value of rest to be 00
//         expect(res).toBe(88)
    
//         // if (res !== 88) {
//         //     throw new Error('Number was not doubled.')
//         // }
//     });



// })

// describe('double', function () {
//     // it should square a number
//     it('should square a number', function () {
//         const res = square(11);

//         //checking the value of result to be 121
//         expect(res).toBe(121);

//         // if (res !== 121){
//         //     throw new Error ('Number was not squared.')
//         // }
//     })


// });







// it('should fail', function () {
//     throw new Error('Ti failed because I said so');
// });