/* Create a named export - that is a React component, that is a Es6
class component */
import React from 'react'; 
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

import PropTypes from 'prop-types';

export class Editor extends React.Component {

    componentDidMount() {
        if(this.props.match) {
            this.props.Session.set('selectedNoteId', this.props.match.params.id)
        }
    }

    handleTitleChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value

        })
    }

    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            /* e.target gets us access to the body area of the dom */
            body: e.target.value
        })
    }

    
    render() {
        
        //if we get a note
        if (this.props.note) {
            return (
                <div>
                    <input value={this.props.note.title} placeholder="Untitled note" onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button>Delete Note</button>
                </div>
            );
        
            //if a selectedNoteId is plugged into the url but there is no associated note in the database
        } // commented out the lines below in preference to simplify and to use a 
        //turnary operator in the else bloc below 
        /* else if (this.props.selectedNoteId){
            return (
                <p>Note not found.</p>
            )

        } */ else {
            //there is no note to be picked and there is no selected id
            return (
                <p>
                    {/* Added turnery operator   */}
                    {/* Pick or create a note to get started */}
                    { this.props.selectedNoteId ? 'Note not found' : ' Pick or create a note to get started'} 
                </p>
            );

        }         

    }
};


Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string
}

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
    

}, Editor);
