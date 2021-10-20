import React from 'react';
import queryString from 'query-string';

const About =({location, match}) => {

  const query = queryString.parse(location.search);
  console.log(query);
  
   return (
     <div>
       <h1>about</h1>
       <p> study with react router  </p>
     </div>
   );
};

export default About;