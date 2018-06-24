/* Create a named export - that is a React component, that is a Es6
class component */
import React from 'react'; 
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom'
import { Notes } from '../api/notes';

import PropTypes from 'prop-types';

export class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

 

    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({ body });
        this.props.call('notes.update', this.props.note._id, { body });
    }

    handleTitleChange(e) {
        const title = e.target.value;
        this.setState( { title });   
        this.props.call('notes.update', this.props.note._id, { title });
    }

 
    componentDidUpdate(prevProps, prevState) {
        // Will try to fetch the current noteId
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }

    handleNoteRemoval() {
        //const noteId = this.props.note._id;
        this.props.call('notes.remove',  this.props.note._id);
        // Redirect the user to the dashboard after removing the note they were on
        this.props.history.push('/dashboard')

    }

    componentDidMount() {
        if (this.props.match) {
            this.props.Session.set('selectedNoteId', this.props.match.params.id)
        }
    }

    render() {
        
        //if we get a note
        if (this.props.note) {
            return (
                <div>
                    <input value={this.state.title} placeholder="Untitled note" onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button onClick={this.handleNoteRemoval.bind(this)}>Delete Note</button>
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
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default withRouter(createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        Session
    };
    

}, Editor));
