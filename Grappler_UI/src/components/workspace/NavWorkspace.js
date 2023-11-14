import React from "react";
// import "./../../css/NavWorkspace.css";

import { Link } from "react-router-dom";

const NavWorkspace = () => {
  return (
    <div id="page-content-wrapper">
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Innogent Training</h2>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="navbar-right">
          <Link to="/create-ticket" className="button">
            Create Ticket
          </Link>
          <a className="navbar-brand" href="#">
            Notification
          </a>
          <a className="nav-link" href="#">
            Account Profile
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavWorkspace;
