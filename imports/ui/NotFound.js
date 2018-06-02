

import React from 'react';

import { Link } from 'react-router-dom';


//component for creating signup page
// Changed signup to a stateless component below
// export default class NotFound extends React.Component {
//     render() {
//       return <p>NotFound component here</p>
//     };
//   };

//This is modelled on the Link.js component file
/*Use stateless functional components when you
don't need component states or lifecycle methods` */
export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>Hmmm, we're unable to find that page</p>
        <Link to="/" className="button button--link">HEAD HOME</Link>

      </div>

    </div>
    
  );
};
  
