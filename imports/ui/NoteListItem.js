import React from 'react';
//importing moment to show to the timestamp the note is created
import PropTypes from 'prop-types';
import moment from 'moment';

/* We want to be able to show a note upon it being clicked. To do so, we will
need a session variable */
import { Session } from 'meteor/session';

//we need to create a container that passes session in. 
import { createContainer } from 'meteor/react-meteor-data';



export const NoteListItem = (props) => {
    return (
        <div onClick={() => { 
            //on click we want to call session.set but because we want a way to test this
            //we will set up a prop which we can use to mock the test instead of 
            //calling session.set directly
            //we are going to update selectedNoteId to the note's id
            props.Session.set('selectedNoteId', props.note._id);
            }}>
            <h5>{ props.note.title || 'Untitled note' }</h5>
            {/* this will show to the screen if the note is selected or not
            if the note is selected return selected otherwise show undefined */}

            { props.note.selected ? 'selected' : undefined }
            <p>{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
        </div>
        
    );
}



NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    //this prop is for session. 
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {
    return { Session };
}, NoteListItem);