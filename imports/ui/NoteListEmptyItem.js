//Renders note list item
import React from 'react';

import { Meteor } from 'meteor/meteor';



/* 1. create new file. Setup default export for functional component - no need to render a class
2. Pick some text - can render any message you like - just make sure some text shows up
3. Conditionally render noteList item -  Setup noteList to render empty not message when notes array is empty */

//create new file. Setup default export for functional component - no need to render a class
//export default () => { 
    //create a variable NoteListEmptyItem 
    //and then set that variable equal to the stateless functional component
const NoteListEmptyItem = () => {
    return (
        <div>
            {/* 2. Pick some text - can render any message you like - just make sure some text shows up */}
            <h5>Empty note list</h5>
            <p>Create a note to get started</p>
        </div>
    );
};

// then we'll export that variable as the default value
export default NoteListEmptyItem;