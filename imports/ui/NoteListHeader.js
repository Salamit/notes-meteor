/*We will create the component that renders the button
the button will be responsioble for triggering the meteor method notes.insert */
//Copied the imports from NoteList.js
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
//need this to be able to subscribe to the notes
import { Meteor } from 'meteor/meteor';
//new prop types package. The older version is depreciated.
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

// NoteListHeader - export

// 1. Create NoteListHeader functional component
export const NoteListHeader = (props) => {
    
    
    return (
        <div>
            {/* // 2. Render a button to the screen "Create Note" */}
            {/* // 3. Setup onClick handler for button */}
            {/* // 4. props.meteorCall, trigger notes.insert meteor method
            becaue we are working in the context of a funcitonal component
        we don't need to use this.props.meteorCall. Rather we would just use
    meteorCall*/}
            {/* Render container componeent in NoteList */}

            <button onClick={() => {
                props.meteorCall('notes.insert', (err, res) => {
                    if (res) {
                        // Session.set res
                        props.Session.set('selectedNoteId', res);
                    }
                });
            }}>Create Note</button>
        </div>
        
    )
   

}

NoteListHeader.PropTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};



//creating a contanerized version of NoteListHeader
export default createContainer(() => {
    return {
        //the purpose of this is to pass in Meteor.call
        //so we will create a property meteorCall which we will use to trigger our methods
        //in our test. We will be triggering notes.insert
        meteorCall: Meteor.call,
        Session
    }

}, NoteListHeader);

