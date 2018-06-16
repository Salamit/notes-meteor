/* This file is a test for NoteListHeader
It is a test case that renders
passes a spy
simulates a click
and makes sure the spy gets called with the correct argument */
// Import test modules
import { Meteor } from 'meteor/meteor';
import React from 'react';

import expect from 'expect';
import { mount } from 'enzyme';

// Import test module ie the component we want to test
import { NoteListHeader } from './NoteListHeader';
//To use notes, I am importing notes
import { Notes } from '../api/notes';

//If on client, setup describe block
if (Meteor.isClient) {
    describe('NoteListHeader', function () {
        
        // it should call meteorCall on click
        it('should call meteorCall on click', function () {
            //1. create a spy
            const spy = expect.createSpy();
            const notes = Notes.find().fetch()
            //2. Render a component with spy
            const wrapper = mount(<NoteListHeader meteorCall={spy} />);
            //3. Simulate button click
            wrapper.find('button').simulate('click')

            //4. Assert spy was called correctly
            expect(spy).toHaveBeenCalledWith('notes.insert')

        });

    });
}


/* This file is a test for NoteListHeader
It is a test case that renders
passes a spy
simulates a click
and makes sure the spy gets called with the correct argument */
// Import test modules
// Import component
//If on client, setup describe block
// it should call meteorCall on click
 //1. create a spy
//2. Render a component with spy
//3. Simulate button click
//4. Assert spy was called correctly
