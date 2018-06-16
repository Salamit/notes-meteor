import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

//describe block
if (Meteor.isClient) {
    describe('NoteListItem', function () {
        it('should render title and timestamp', function () {
            const title = 'My title here';
            /* timestamp gotten by
             calling equire('moment')().valueOf() in google console*/
            const updatedAt = 1529053766665;
            const wrapper = mount ( <NoteListItem note={{ title, updatedAt }}/> )

            /* expect that h5 text equals the same text value as the title variable */
            expect(wrapper.find('h5').text()).toBe(title);
            /* confirming that the date formatting works correctly */
            expect(wrapper.find('p').text()).toBe('6/15/18');

        })
        /* It should set default title if there is no title set */
        it('should set default title if no title set', function () {
            const title = '';
            const updatedAt = 1529053766665;

            const wrapper = mount ( <NoteListItem note={{ title, updatedAt }}/> ) 
            /* expect that h5 text equals the same text value as the title variable */
            expect(wrapper.find('h5').text()).toBe('Untitled note');
        })

    })
}