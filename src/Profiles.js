import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  return (
    <div>
      <h3>유저목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route path="/profiles" exact render={() => <div>유저 선택 </div>} />

      <Route path="/profiles/:username" componet={Profile} />
    </div>
  );
};

export default Profiles;
