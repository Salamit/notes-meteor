import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

//importing fixtures
import { notes } from '../fixtures/fixtures';
//import NoteListItem from './NoteListItem';
/* We switch the line above to a named import (below) from the containerized component (above)
This allows us to inject a session and allowing us to spy on it */
import { NoteListItem } from './NoteListItem';

//describe block
if (Meteor.isClient) {
    describe('NoteListItem', function () {

        let Session; //we are going to define this in beforeEach
        //beforeEach - contains a callback function runs before our test cases
        //it has a mocked session object
        beforeEach(() => {
            /* Before every test case we are going to this - a mocked session object
            we will need to provide a set property - allowing us to set session variables 
            This creates a spy everytime*/
            Session = {
                set: expect.createSpy()
            }
        })

        it('should render title and timestamp', function () {
            
            // const title = 'My title here';
            // /* timestamp gotten by
            //  calling equire('moment')().valueOf() in google console*/
            // const updatedAt = 1529053766665;
            // const wrapper = mount ( <NoteListItem note={{ title, updatedAt }}/> )
            /* The lines commented immediately above are no longer necessary since
            we are going to pass in our notes fixtures as a prop
            into notes. In the line below, we reference the note's array 
            grabbing the first object which is an object. We provide the session
            variable because it is a required prop */
            const wrapper = mount ( <NoteListItem note={notes[0]} Session={Session}/> );

            /* expect that h5 text equals the same text value as the title variable */
            //expect(wrapper.find('h5').text()).toBe(title);
            /* Switch the line above to the one below. Thus now we are using the 
            notes fixtures files */
            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            /* confirming that the date formatting works correctly */
            expect(wrapper.find('p').text()).toBe('6/15/18');

        })
        /* It should set default title if there is no title set */
        it('should set default title if no title set', function () {
            /* Replaced the lines below with data from our fixtures file */
            //const title = '';
            //const updatedAt = 1529053766665;

            // const wrapper = mount ( <NoteListItem note={{ title, updatedAt }}/> ) 
            //changed the line above to the one below
            //We provide the session variable because it is a required prop
            const wrapper = mount ( <NoteListItem note={notes[1]} Session={Session}/> )

            /* expect that h5 text equals the same text value as the title variable */
            expect(wrapper.find('h5').text()).toBe('Untitled note');
        })

        it('should call set on click', function () {
            //Render NoteListItem using either note from the fixture and the session
            const spy = Session.set;
            const wrapper = mount ( <NoteListItem note={notes[0]} Session={Session}/> );

            //find div in NOteListItem and simulate a click event
            wrapper.find('div').simulate('click');
            //expect session.set to have been called with two arguments
            //the first is a static string 'selectedNoteId, the second is the prop of the note 
            //that we are using 
            expect(spy).toHaveBeenCalledWith('selectedNoteId', notes[0]._id )
            
        })

    })
}