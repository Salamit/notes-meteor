import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
//need this to be able to subscribe to the notes
import { Meteor } from 'meteor/meteor';
//new prop types package. The older version is depreciated.
import PropTypes from 'prop-types';


//importing our named export called notes
//it is a named export because
import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

//creating our component - a stateless functional component
export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader/>
            {/* Use the map method to cover notes array into jsx array
            Set up key prop equal to notes _id 
        Setup note prop*/}
            { props.notes.map((note) => {
            /* an instance of the NoteListItem with two props, the first being
            Id and the second being the note */
             return <NoteListItem key={note._id} note={note}/> 
            })
        }
                NoteList { props.notes.length }
            
        </div>
    );
};

//WE need to specify the notes prop types
NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

//creating our containerized component - it is kind of like auto. It will rerun when
//our notes change
export default createContainer(() => {
    //we want to fetch the notes
    //to do that we want to subscribe to the publication
    Meteor.subscribe('notes');

    //to fetch the data from the database
    return { 
        //notes will be a list of all the notes available for 
        //this user to edit
        //we need to access our api - to dop this we need to inport 
        notes: Notes.find().fetch() //Notes.find retuns all notes that this user has access to, fetch allows for 
        //an array of notes to be found. The array of notes gets passed as a prop into our component
    };
}, NoteList);