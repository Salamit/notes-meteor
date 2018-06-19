/* This is the test file for the NotelistEmptyItem */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

//importing the named export NoteList
import { NoteList } from './NoteList';
import { notes } from '../fixtures/fixtures';
//dummy data - this will be passed into note list as test data
//we are going to put this in a fixture file. 
// const notes = [
//     {
//         _id: 'noteId1',
//         title: 'Test title',
//         body: '',
//         updatedAt: 0,
//         userId: 'userId1'
//     }, {
//         _id: 'noteId2',
//         title: '',
//         body: 'Something is here',
//         updatedAt: 0,
//         userId: 'userId2'

//     }
// ]

if (Meteor.isClient) {
    describe('NoteList', function () {
        /* This test case will see what happens when we pass notes into Notelist we want
        to make sure that we get two instances of the notelist item
        This means we will have to create some dummy data that should match up with the props
        this dummy data is not a spy like I had thought but is defined above as n object variable
        called notes */

        it('should render NotelistItem for each note', function () {
            //creating wrapper as usual. We set the props notes to be the dummy data that
            //we have set up above so notes={notes}
            const wrapper = mount(<NoteList notes={notes}/>);

            /* How do we find the numeber of instances inside of notelist of both
            of those components - NoteListEmptyItem and NoteListItem?
            We will use wrapper.find() to find react components.
            wrapper.find will return a wrapper whose length we can check
            to figure out the number of instances that is rendered. */
            //expect the length of NoteListItem to be 2
            expect(wrapper.find('NoteListItem').length).toBe(2);
            //expecting the number of NoteListEmptyItem to be 0
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });

        it('should render NoteListEmptyItem if zero notes', function () {
            //empty array of notes
            const notes2 = []
            //wrapper mounts the component NoteList with notes2, an empty array
            const wrapper = mount(<NoteList notes={notes2}/>);

            //becaue Notes2 is empty we expect 0 instances of NoteListItem
            expect(wrapper.find('NotesListItem').length).toBe(0);
            //Because Notes2 is empty we expect 1 instance of NoteListEmptyItem
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);

        })
    });
}