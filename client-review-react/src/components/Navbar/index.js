import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/login" className="btn nav" exact activeClassName="active">TimeSheet</NavLink>
        </li>
        <li>
          <NavLink to="/register" className="btn nav" activeClassName="active">Clients</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;