//need to import react because of the react component
import React from 'react';

//new prop types package. The older version is depreciated.
import PropTypes from 'prop-types';

//need this for onLogout
import { Accounts } from 'meteor/accounts-base';

/*As opposed to passing along data, we are going to create containers
that render when our data changes. To create these containers, 
we just installed meteor npm install --save react-addons-pure-render-mixin and
and meteor npm install --save react-addons-pure-render-mixin@15.3.2
We are now going to import createContainer from meteor/react-meteor-data
*/
import { createContainer } from 'meteor/react-meteor-data';
/* Commented out PrivateHeader and
Changed private header to a stateless component below */
// export default class PrivateHeader extends React.Component {
    
//     onLogout(){
//         //this.props.history.push('/');
//         Accounts.logout();
//     }


//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
                
//                 <button 
//                     type='button' 
                    
//                     //onClick={() => { this.props.history.push('/'); }}>
//                     onClick={this.onLogout.bind(this)}>
//                     Logout
//                 </button> 
//             </div>
//         )
//     }
// }

//stateless PriaveHeader component
//privateHeader is broken into a variable because we
//need to provide privateHeader.proptypes
/*This is going to take the prop - title 
BEcause we need to provide PrivateHdeader.propTypes
we need a separate variable hence the const PrivateHeader
Note that this is the format to be used in creating 
stateless components that take proptypes i*/

//we are going to export PrivateHeader as a named export and no longer a default export
export const PrivateHeader = (props) => {
    
    return(
        <div className="header">
           <div className="header__content">
                {/* props.title not this.props.title because
            the props argument is passed to the function
            above */}
            <h1 className="header_title">{props.title}</h1>
            {/*for the logout button, A way, 
            a more simplified version, to add the logout 
            functionality*/}
            <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>

            {/* Here is another way of adding the logout
            functionality*/}
            {/* <button onClick={() => { 
                Accounts.logout();
            }}>Logout</button> */}
           </div>
        </div>
    )

};

//prop types 
//It allows to define what type a proptype should be
// Specifiying the prop type 
PrivateHeader.propTypes = {
    //Specifying that it should be a proptype of string and that it is required
    //get more information here: https://reactjs.org/docs/typechecking-with-proptypes.html
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    
};

/* calling the container component. It takes two arguments. ANything that privateHeader 
needs to render itself will be defined inside here. The second argument
is the component that you want to render to the scrend. Create container returns
our containerized component. Any props pass to the container componenet will be 
passed through */
export default createContainer(() => {
    //the first argument is 
    //Anything that privateHeader needs to render itself will be defined here
    //in this case that will be Acccount.logout
    //all the props we want to pass will be defined here
    //in this case, it will be our handleLogout()
    return {
        //responsible for calling accounts.logout
        handleLogout: () => Accounts.logout() //a simplified version

    }
    

    //the second argumetn is what we want to render to the screen
    //which in this case is PrivateHeader
}, PrivateHeader);


//we are going to export PrivateHeader as a named export and no longer a default export
//export default PrivateHeader;
