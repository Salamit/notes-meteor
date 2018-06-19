/* This is file contains our fixtures for 
testing */

export const notes = [
    {
        _id: 'noteId1',
        title: 'Test title',
        body: '',
        updatedAt: 1529053766665,
        userId: 'userId1'
    }, {
        _id: 'noteId2',
        title: '',
        body: 'Something is here',
        /* timestamp (line below) gotten by
             calling equire('moment')().valueOf() in google console*/
        updatedAt: 1529053766665, //updated fixtures with this value 
        userId: 'userId2'

    }
]