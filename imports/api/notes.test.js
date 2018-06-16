//the testing file for notes
//importing meteor
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

//importing notes to check if the notes with a specified _id has been inserted into the database
import { Notes } from  './notes';

if (Meteor.isServer) {
    describe('notes', function () {

        /* we are going to create a const variable called notesOne
        this will allow us to change how we seed the database. The reason
        why we do this is so that we can change values easily ie
        the values of our properities and not have to change every individual
        areas where we have the values ourselves*/
        const noteOne = {
            //when we call our remove method - this id will be called
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };

        //seed data two
        const noteTwo = {
            //when we call our remove method - this id will be called
            _id: 'testNoteId2',
            title: 'Things To Buy',
            body: 'Couch',
            updatedAt: 0,
            userId: 'testUserId2'
        }

        /*we are going to setup seed data for our methods to use to verify that
        our methods work. We are going to setup the seed data in such a way that 
        the database is always seeded with the data especially after other
        tests have been run that e.g. remove the data. To setup this continually
        seeding function, we will use a mocha lifecycle method call beforeEach
        which takes just a function - this function runs just before very test case - the 
        is a companion function called afterEach*/
        beforeEach(function() {
            //we will start by wiping the database just in case there are 
            //data added by other test cases. For test cases, meteor uses a different
            //database so deleteing the data doesn't put our main database at risk
            Notes.remove({});
            //inserting seed note
            Notes.insert(noteOne);
            //inserting seed note 2
            Notes.insert(noteTwo);

        })
        /*two test cases 
        the first one will check that it works when the is a logged in user
        one that throws an error when there is no logged in user */

        //the first one will check that notes is inserted when the is a logged in user
        it('should insert new note', function () {
            const userId = 'testid';
            //to access the function to be tested
            //which in this case is the Notes.insert method in the notes.js file
            //we can do the following:
            //Meteor.isServer.method_handlers['notes.insert']
            //we want to call this with 
            //A challenge is how to set the 'this' keyword
            //we need to setup a value for this.userId(in the notes.js file)
            //this will be done using apply - a javasript feature allowing us
            //to call a function specifing our own this context so if we
            //need a this value with an Userid property, all we to provide 
            //an id object with a userId property - we pass that to apply and 
            //then we call the method however we like
            //we pass an argument to apply - which the this keyword will 
            //end up equaling. In our case we are expecting this.userId to exist
            //so we set userId to a value. Note it doesn't have to be in the database
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
            //this line above will call our notes.insert method, passing in userId
            //and we will get a new document Id which is saved in const _id

            //to assert that the notes was inserted as expected, we query the database
            //if we can find a notes with the _id then we can say that inserts worked as expected
            //finding the notes with the _id above, using the es6 format
            //we want the userId to be the same testid
            
            //we need to assert that a notes was indeed found
            //to do that we use expect
            expect(Notes.findOne({ _id, userId })).toExist();
            //to exist passes if the values are found or failes if there was no value found
            
        });

        //second test case - should not insert a note without a userId
        //to do this, we will try inserting a note without a userId
        it('should not insert note if note authenticated', function() {
            expect(() => {
                //we will try inserting a note without a userId - without including a this context ie. the UserId value
                //as found in this Meteor.server.method_handlers['notes.insert'].apply({ userId });
             Meteor.server.method_handlers['notes.insert']();

                //expecting an error to be thrown
            }).toThrow();
        });

        //in this test case, we will pass a _id that we know exists
        // then we will remove the data
        //then we will query database to check to see that the note was
        //removed
        it('should remove note', function () {
            //.apply allows us to set the userId
            /* we are going to pass an array to apply
            as such every value in the gets passed into the function
            as an argument. For example in this case
            we will have on value - 'testNoteId1 - which is to be deleted
             This will get passed as an argument */
            
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, ['testNoteId4']);
            //following this, the note passed in - testNoteId1 should have been deleted
            //thuse we are going to check that it has been removed
            //by checking for the note using toNotExists which will pass
            //if the return value is undefined and fail if otherwise
            expect(Notes.findOne({ _id: noteOne.userId })).toNotExist();
            //just because a test is passing or failing doesn't mean that 
            //it is correct, it could be a problem with our test case. 
        });
        //test 2: a person should not be able to remove notes if they are not
        //authenticated ie if a userId doesn't exist
        it('should not remove note if unauthenticated', function () {
            expect(() => {
                //to mimic an unauthenticated user, requires passing that
                //we don't pass in a userId. To not passing a userId unlike what 
                //we have done above requires
                //using apply without a context unlike done above
                //To do this we pass an empty object into apply
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
                //expecting an error to be thrown
            }).toThrow();
        })
        /*the last test, is to test to see what happens when the _id is not 
        provided*/
        it('should not remove note if invalid _id provided', function () {
            expect(() => {
                //calling notes.remove without an id provided but we proived the userId
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId })

            }).toThrow();
        });

        //want to make sure that when we pass in all of the right stuff that 
        //the note gets updated
        it('should update note', function () {
            //the title that we want to update
            const title = 'This is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({
                //the user id of the note you want to update
                userId: noteOne.userId
            }, [ /* remember from the notes.update method in notes.js
                'notes.update'( _id, updates ) requires two arguments
                the first being the _id of the note to update and the 
                second being the object of everyhting you want to update
                we are going to do that here
                */
               noteOne._id, //the id of the note we want to update
               { title } //using ES6 format. The title we want to update
            ]);

            //we want to assert that things have been changed following note.update
            //to do this, we will fetch the note from the database
            const note = Notes.findOne(noteOne._id); //returns an object with the info
            //make some assertions about the object
            //we are going to check that the timestamp has been updated
            expect(note.updatedAt).toBeGreaterThan(0);//asserting that it has been changed to the current time stamp
            //expecting that the note will include something
            expect(note).toInclude({
                //expect that the title property includes the title from above
                title, //the title from above
                //expecting that the title was not changed
                body: noteOne.body /*expeccting that the title should include the same data 
                as the seed data */
            });
        });
        it('should throw error if extra updates', function () {
            expect(() => {
                //calling notes.remove without an id provided but we proived the userId
                Meteor.server.method_handlers['notes.remove'].apply({ 
                    userId: noteOne.userId 
                },[
                    noteOne._id, //the id of the note we want to update
                    { location } //using ES6 format. The title we want to update
                ])

            }).toThrow();
        });

        it('should not update note if user was not creator', function() {
            const title = 'This is an updated title';

            Meteor.server.method_handlers['notes.update'].apply({
              userId: 'testid'
            }, [
              noteOne._id,
              { title }
            ]);
      
            const note = Notes.findOne(noteOne._id);
      
            expect(note).toInclude(noteOne);
          });

        //test 2: a person should not be able to remove notes if they are not
        //authenticated ie if a userId doesn't exist
        it('should not update note if unauthenticated', function () {
            expect(() => {
                //to mimic an unauthenticated user, requires passing that
                //we don't pass in a userId. To not passing a userId unlike what 
                //we have done above requires
                //using apply without a context unlike done above
                //To do this we pass an empty object into apply
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
                //expecting an error to be thrown
            }).toThrow();
        })
        /*the last test, is to test to see what happens when the _id is not 
        provided*/
        it('should not update note if invalid _id provided', function () {
            expect(() => {
                //calling notes.remove without an id provided but we proived the userId
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId })

            }).toThrow();
        });

        /*We are going to test the publications here */
        //we should get notes back if a notes with a userId is requested
        it('should return a users notes', function () {
            //we are going to access the notes publication
            //this is how we do so
            //we are going to store what we get back in a result
            const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
            //because const res is a cursor we are going to call fetch
            const notes = res.fetch();//fetch returns an array
            
            expect(notes.length).toBe(1);
            
            //we are going to expect that the note return equals the 
            //seed note above
            expect(notes[0]).toEqual(noteOne);
        });

        /*We want to test that when we provide a userId for a user that has
        no notes, they should get no notes back */
        it('should return no notes for user that has none', function() {

            const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testId3' });

            const notes = res.fetch();
            //expect that the length of 
            expect(notes.length).toBe(0);
        });
    });
}