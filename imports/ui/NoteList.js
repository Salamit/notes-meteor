import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
//need this to be able to subscribe to the notes
import { Meteor } from 'meteor/meteor';
//new prop types package. The older version is depreciated.
import PropTypes from 'prop-types';
//Importing Session to use Session 
import { Session } from 'meteor/session';


//importing our named export called notes
//it is a named export because
import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem'


//3. Conditionally render noteList item -  Setup noteList to render empty not message when notes array is empty */



//creating our component - a stateless functional component  and a named export 
export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader/>
            {/* Use the map method to cover notes array into jsx array
            Set up key prop equal to notes _id 
        Setup note prop*/}
        {/* Conditionally render noteList item -  Setup noteList to render empty not message when notes array is empty */ }
            { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
           { props.notes.map((note) => {
            /* Another way to conditionally render
            //if (props.notes.length === 0){
                //render NoteListEmptyItem
            } */
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
    /* we need to get the value for selected noteId 
    this function will run everytime the selectedNoteId changes*/
    const selectedNoteId = Session.get('selectedNoteId');
    //we want to fetch the notes
    //to do that we want to subscribe to the publication
    Meteor.subscribe('notes');

    //to fetch the data from the database
    return { 
        /* createContainer runs everytime notes changes
        For example, if the user makes new notes, createContainer reruns */
        //notes will be a list of all the notes available for 
        //this user to edit
        //we need to access our api - to dop this we need to inport 
        //Notes.find retuns all notes that this user has access to, the fetch  
        // method returns an array of notes found. The array of notes gets passed as a prop into our component
        //take notes add selected propperty to object
        //set to true if match, false if not
        notes: Notes.find().fetch().map((note) => {
            return {
                //this keeps the exiting properties of the note
                ...note,
                //this line adds an addtional property
                selected: note._id === selectedNoteId ? true : false,

            }    
            
        }) 
    };
}, NoteList);
