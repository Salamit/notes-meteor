import { Meteor } from 'meteor/meteor';

//to create the middle wear a named export WebAppis imported
//WebApp will give us access to the webapp behind the scenes
//it will allow us to attach some middlewear
import { WebApp } from 'meteor/webapp'

//for this import below, we aren't getting an import
//from an export hence the lack of a 'from' and the 
//name of the export as above in the following line
//import { Meteor } from 'meteor/meteor';
import '../imports/api/users';

//import the new collection into the server file
//to create the collection

//we don't get any of the exports so we need to grab the link export
//from the links.js file
//by using the named export
//By doing this, we can query the collection for a match
//import { Links } from '../imports/api/links';
//this line imports the simple-schema configuration that allows us to customize 
//the errors that are thrown by letting us throw meteor errors
import '../imports/startup/simple-schema-configuration.js';

//we should import notes into the server to make sure the collection is created
//and the methods get registered. 
import '../imports/api/notes';

//defaulting momemnt to format time
// import moment from 'moment';


Meteor.startup(() => {
  // // code to run on server at startup
  // //we use meteor.call to call methods - it takes some arguments
  // //the method to call; a callback function
  // //should there be an error, the err parameter gets populated else the res gets populated
  // //the meteor call on the server gets 
  // //Meteor.call('greetUser', (err, res) => {
  //   //printing the arguments to the screen
  //   //console.log('Greet User Arguments', err, res);

  // //})

  // /*The goal is to attach our own middlewear and by doing so
  // teach the meteorserver to do stuff */

  //   //problem: we need to call 'use' - the method that will allow us to attach middlewear
  //   /*we will reference WebApp.connecHandlers.'use'(() => 
  //  })*/

  //  /*Use is called with 3 arguments requests - stores things about the incoming request, 
  //  response - allows us to respond with a http request
  //  next - once the middleware is done, is the function next is called
  //  and allows the function to keep on moving */
  //  /* The basic process is 
  //  1. a request comes in
  //  2. we run our middleware one at a time
  //  3. meteor responds with a page*/
  // //  WebApp.connectHandlers.use((req, res, next) => {
  // //    console.log('This is from my custom middleware!')
  //    //the Goal: we want to parse the url and see if there is a link inside it
  //    //the link will be in the request object
  //    //displaying the entire request object to the screen
  //    //console.log(req);
  //    /* we will be using some properties on req 
  //    the first is req.url - it returns the url that was used
  //    when someone loaded whatever page that we are trying to load
  //    it helps to because we know if we should interceed on the request used
  //    req.method gives access to the http method that was used - whether
  //    it was something like get, post e.t.c */
  //   //  console.log(req.url, req.method, req.headers, req.query);
  //    /*Lets explore the response object - somethings to learn
  //    first we have to learn how to set a http status code for a request
  //    second learn how to set http headers because this is how we will 
  //    tell the browser how to redirect to whatever url is associated with the link
  //    third - we are going to learn how to set the http body
  //    finally - we will learn how to end the http request*/ 
  //    //the status code is available in the chrome network tools
  //    //under the network tab, at the tippie top of the name portion
  //    //rests the link request - clicking on the link request 
  //    //reveals some information including the req code
  //    //we are going to customize that status code
  //    //to get a rundown on all of the 
  //    //available status codes go to httpstatuses.com
  //    //SET HTTP status code 
  //   //  res.statusCode = 404;
  //    /* Below the status code in the header tab is the http response headers
  //    we are going to change that */
  //    //SET HTTP request header
  //    //res.setHeader takes two arguements: a property and a value
  //    //- name of the header that we are trying to set and the value of the header
  //    //res.setHeader('my-custom-header', 'Andrew was here!');
  //    /*We are going to write to the body */
  //    //SET HTTP body - we can completely overwrite the html; see below
  //    //res.write('<h1>This is my middleware at work</h1>');
  //    /*We are going to end the request*/
  //    //End HTTP request
  //    //This immediately terminates the request
  //   //  res.end();
    

  // //    next();
  // //  })

  // // let now = new Date().getTime();
  // // console.log(now);

  // //this gives us a moment instance and 
  // //we can use all the methods available for moment
  // //we will be using the .format()
  // //format takes a string, like month, date and string
  // //we can specify the format to use
  // //refer to the documentation
  // // http://momentjs.com
  
  // // let momentNow = moment(0)
  // // console.log(momentNow.fromNow());

  //  WebApp.connectHandlers.use((req, res, next) => {
  //    //CHALLENGE
  //   //  //create and registering a new middleware function
  //   //   //set http status code to a 302
  //   //   res.statusCode = 302;
  //   //   // set 'Location' header to 'http://www.google.com'
  //   //   res.setHeader('Location', 'http://www.google.com');
  //   //   //End the request
  //   //   res.end()
  //   //The first thing we need to do is parse the url. The url will look
  //   //like this localhost:3000/adasdfadf
  //   //to do this we will use req.url - which returns /adasdfadf
  //   // create a variable and set it to req.url. We will use the 
  //   //slice method - which allows us to split up a string 
  //   /* In our case it allows us to strip '/' from the url
  //   we will then search the dataabase for the new string */
  //   const _id = req.url.slice(1)
  //   //query the links collection for a match 
  //   //and store the match if any
  //   //we will pass into find() our query - 
  //   // const link = Links.find({ _id: _id });
  //   //using the es6 shorthand
  //   //const link = Links.find({ _id });
  //   //we switch to findOne because it is great for situations
  //   //where we know that we only want one document or are only
  //   //going to get one document back
  //   const link = Links.findOne({ _id });
  //   /* link will be undefined if there is no match or the document
  //    */
  //   //check if there is a match
  //   if (link) {
  //     //res.statusCode communicates that a redirect is occuring
  //     res.statusCode = 302;
  //     //we want to send them to the url associated with the document
  //     res.setHeader('Location', link.url);
  //     res.end();
  //     //tracking requests - so as to know the 
  //     //number of times and when a link was last visited
  //     /*Link.trackVisit will update visited count 
  //     and track the last time the link was visited
  //     we will need to pass in the id of the link
  //     we want to track*/
  //     Meteor.call('links.trackVisit', _id);

  //   }
  //     //if there was no match 
  //   else {
  //     next ()
  //   }

  

  //  });

});
