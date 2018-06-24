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
import { notes } from '../fixtures/fixtures';

//If on client, setup describe block
if (Meteor.isClient) {
    describe('NoteListHeader', function () {
        let meteorCall;
        let Session;

        beforeEach(function () {
            meteorCall = expect.createSpy();
            Session = {
                set: expect.createSpy()
            }
        })
        
        // it should call meteorCall on click
        it('should call meteorCall on click', function () {
            //1. create a spy
            // const spy = expect.createSpy();
            // const notes = Notes.find().fetch()
            //2. Render a component with spy
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
            //3. Simulate button click
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
            

            //4. Assert spy was called correctly
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
            
        });

            // it should not set session for failed insert
        it('should not set session for failed insert', function () {
            //1. create a spy
            // const spy = expect.createSpy();
            // const notes = Notes.find().fetch()
            //2. Render a component with spy
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
            //3. Simulate button click
            wrapper.find('button').simulate('click');
            //call function with error and no res
            meteorCall.calls[0].arguments[1]({}, undefined);
            

            //4. Assert spy was called correctly
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            //expect session.set to have never been called
            expect(Session.set).toNotHaveBeenCalled();
            
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
