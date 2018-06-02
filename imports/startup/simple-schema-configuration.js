//we will be taking advantage of a simple schema configuration option found 
//here: https://github.com/aldeed/simple-schema-js#customize-the-error-that-is-thrown
/*This allows us to customize the error that is thrown. Remember we are doing this 
so that a meteor error is thrown automagically without the need for a try catch block*/ 

//load in meteor and simpl-schema. We need meteor because we are going to throw a meteor error
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

//it takes a function and this function gets executed. Everytime simple schema gets an error
//it changes that error
SimpleSchema.defineValidationErrorTransform((e) => {
    //we are accessing the error and the message property in the error e.message
    //throwing a 400 error. 
    return new Meteor.Error(400, e.message)
    //to remove the try catch block this file needs to be imported into the main files in the
    //server and client
})