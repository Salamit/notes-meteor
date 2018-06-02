//this file will make the call to the accounts method
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
    //getting the email out of the user object
    const email = user.emails[0].address;

  //schema to validate user email
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
    //valideting the user email above through the es6 syntax
  }).validate({ email })

    //console.log('this is the user', user);
    //to allow the user to be created do this
    return true;

  });
//the below is the type of error we want to throw when
//something goes wrong in meteor
  // //throw an error and try to catch the error
  // try {
  //   //throw new Error('Some message here');
  //   //throw a meteor error arguments = code and the reasons
  //   throw new Meteor.Error(400, 'Please enter a valid email')
  // } catch (e) {
  //   console.log(e);
  // }


  //creating a schema
  //first creat a variable to store the schema
  // const employeeSchema = new SimpleSchema({
  //   //Describing what an empty object looks like
  //  // name - a required string between 1 and 200 chars
  //  name: {
  //    type: String,
  //    min: 1,
  //    max: 200
  //  },
  //  // hourlywage - a number greater than zero
  //  hourlyWage: {
  //    type: Number,
  //    min: 0
  //  },
  //  //email - should be email format
  //  email: {
  //    type: String,
  //    regEx: SimpleSchema.RegEx.Email

  //  }

  // });
  // employeeSchema.validate({
  //   name: "Salami",
  //   hourlyWage: 45,
  //   email: "salami.tope@gmail.com"

     
  // })
  // const petSchema = new SimpleSchema({
  //   name: {
  //     //What is name?
  //     //Define the rules regarding 'name'
  //     //the type of the object
  //     type: String,
  //     //setting the minimum and max of name
  //     min: 1,
  //     max: 200,
  //     //To make a property optional, do the folowing
  //     optional: true
  //   },
  //   //another property like age is provided
  //   age: {
  //     type: Number,
  //     //means the age has to be a number 0 or greater
  //     min: 0
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     //allows for the phone number to be validated.
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // });
  // //validating the data against the rules
  // //ensuring that the data follows the rules
  // petSchema.validate({
  //   //name: 'Spot',
  //   //Petschema only throws an error when the 
  //   //set rule is broken
  //   //validating age property
  //   age: 21,
  //   contactNumber: 'ab1234#'

  // });