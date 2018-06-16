//this file is for creating a notes collection
//first import Mongo which is needed to setup the collection
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
//importing moment to use moment to get time stamps
import moment from 'moment';
//importing simpleSchema to so as to remove a note
import SimpleSchema from 'simpl-schema';

//creating the collection and allowing it to be exported
//the name of the collection is in the paranthesis
export const Notes = new Mongo.Collection('notes');

/*We are giong to create a publication */
if (Meteor.isServer) {
    //this is how we create a new publication
    //the name of the publication is notes
    Meteor.publish('notes', function () {
        //we are going to return the notes that we want the subscriber to get
        //we are going to query all the notes where userId matches the current userId
        return Notes.find({ userId: this.userId });
    })
}

//setting up a new method that allows us to insert a new note
//the method won't take any arguments because those will be created by
//the user in the application
//using a meteor.method to create our method
Meteor.methods({
    //notes.insert, is going to take zero arguments and is going to add a
    //new document with defaults into the notes collection
    'notes.insert'(){
        /* we care going to check if the user is defined 
        else we are going to throw an error - this is to ensure that
        only users can create a note */
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //inserts a notes object returning the _id
        return Notes.insert({
            title: '',
            body: '',
            //storing the userId so we know who created the note
            userId: this.userId,
            //we can use the moment library to get a time stamp for when the not was created.
            //you would have to import the moment library first.
            updatedAt: moment().valueOf//new Date().getTime()
        })

    },

    /*Notes.remove - will take an argument - the _id of the notes that
    that we want to remove. To use notes.remove we will need dummy data/seed data
    to verify that notes.remove works*/
    'notes.remove'(_id) {
        //Check for userId, else throw error
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        //use simpleschema to validate that the id is a string with
        //length greater than one
        //you will need to import simpleschema
        new SimpleSchema({
            _id: {
                type: String, 
                min: 1
            }
        }).validate({ _id });

        //then remove the notes.remove to remove the note with the _id
        // also remove only the note associated with that userId
        Notes.remove({ _id, userId: this.userId });
    },
    /*allows us to update note values
    it takes two objects - the first _id, and the second the updates
    intended to be made*/
    'notes.update'( _id, updates ) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //create a new schema
        new SimpleSchema({
            //and in the schema, we will create the things we want to validate
            _id: {
                type: String,
                min: 1
            },
            title: {
                type: String,
                //making values optional - thus if it is not proivded, it is okay
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
            //To prevent malicious attempts to input malicious data into the database
            //what we pass in to validate will be checked, if someone
            /* makes an attempt to pass a malicious property into simple 
            schema. To do this we will use the spread operator ie. 
            triple dots - ...updates. If updates is passed _id and other properties
            defined our schema, updates will go ahead, however should 
            malicious data ie property not included in the schema be included,
            an error will be thrown*/
        }).validate({
            _id,
            ...updates
        });
        //Updating the note
        /* we will be using the spread operator to customize what we 
        are updating */

        Notes.update({
            _id,
            userId: this.userId
            },{
            $set: {
                //updating the timestamp with a new moment timestamp
                updatedAt: moment().valueOf(),
                //we want to spread out all the updated properties
                //at this point there is no malicious data inside
                ...updates
            }
        });

    }
});