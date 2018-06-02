import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
//import links - deleted in lecture 90
// import { Links } from '../api/links';


//importing PrivateHeader
import PrivateHeader from './PrivateHeader';

//import { withRouter } from 'react-router-dom';
//import createBrowserHistory from 'history/createBrowserHistory';

//const browserHistory = createBrowserHistory();
//console.log(this.props);
/* We are going to change Lnk to a classless component
See the new form of Lnk below */
// export default class Lnk extends React.Component {
//     /* moved onLogout to the component called PrivateHeader*/
//     // onLogout(){
//     //     //this.props.history.push('/');
//     //     Accounts.logout();
//     // }
    
//     // //to prevent a fullpage refresh
//     // onSubmit(e) {
//     //     //we are saving the url submitted into const url
//     //     const url = this.refs.url.value.trim()
//     //     e.preventDefault();

//     //     //to make sure there is a value in the url
//     //     if (url) {
//     //         //insert the links/url into the database 
//     //         //and also we associate the userID with the submitted link
//     //         //we want to be able to show the user who is logged in, only
//     //         //the links they have submitted.
//     //         //because the following insert takes place in a react component
//     //         //it is unsafe since the client has access to the databases
//     //         //thus we insert links using methods in the links.js found in the api
//     //         //prior insert code was: Links.insert({ url, userId: Meteor.userId() });
//     //         //clearing the value that was in text field
//     //         //
//     //         Meteor.call('links.insert', url);
//     //         this.refs.url.value = '';
//     //     }
//     // }
//     // componentWillMount(){
//     //     if(!Meteor.userId()){
//     //         //else redirect to the main page
//     //         //where unlogged in users should be
//     //         this.props.history.replace('/');
//     //     }
            
//     //   }
//     render() {
//         return (
//             <div>
//                 {/* This is the header area */}
//                 {/* moved this to a link component called PrivateHeader*/}
//                 {/* <h1>Your Links</h1>
                
//                 <button 
//                     type='button' 
                    
//                     //onClick={() => { this.props.history.push('/'); }}>
//                     onClick={this.onLogout.bind(this)}>
//                     Logout
//                 </button> */}
//             <PrivateHeader title="Your Links"/>
//             {/* rendering linklist */}
//             <LinksList/>
//             {/* Add links component*/}
//             <AddLink/>
//             {/* Code below is moved to the AddLink.js file */}

//              {/* form to get the links from user */}
//             {/* <p>Add Link</p> 
           
//              <form onSubmit={this.onSubmit.bind(this)}>
//                 <input type="text" ref="url" placeholder="URL"/>
//                 <button>Add Link</button>
//             </form> */}

//             </div>

//         )
//     };
// };

export default () => {
    return (
        <div>
            {/* This is the header area */}
            {/* moved this to a link component called PrivateHeader*/}
            {/* <h1>Your Links</h1>
            
            <button 
                type='button' 
                
                //onClick={() => { this.props.history.push('/'); }}>
                onClick={this.onLogout.bind(this)}>
                Logout
            </button> */}
            <PrivateHeader title="Dashboard"/>
            <div className="page-content">
                Dashboard page content
            </div>
            
        </div>
    );  
    
};