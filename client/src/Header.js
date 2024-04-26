import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar bg-dark justify-content-center"
      style={{ backgroundColor: "#010400" }}
    >
      <li className="nav-link ">
        <NavLink
          to="/dashboard"
          className="nav-link"
          style={({ isActive }) => ({
            color: isActive ? "#56CEDB" : "#FFFDFB",
          })}
        >
          Dashboard
        </NavLink>
      </li>
      <li className="nav-link ">
        <NavLink
          to="/editprofile"
          className="nav-link"
          style={({ isActive }) => ({
            color: isActive ? "#56CEDB" : "#FFFDFB",
          })}
        >
          Edit Profile and Change Password
        </NavLink>
      </li>
      {/* <li className="nav-link ">
                <NavLink to="/roommatesearch" className="nav-link" style={({ isActive }) => ({ color: isActive ? '#56CEDB' : '#FFFDFB' })}>
                    Roommate Search
                </NavLink>
            </li> */}
      {/* <li className="nav-link ">
                <NavLink to="/eventsearch" className="nav-link" style={({ isActive }) => ({ color: isActive ? '#56CEDB' : '#FFFDFB' })}>
                    Discover Events
                </NavLink>
            </li> */}
      {/* <li className="nav-link ">
                <NavLink to="/roommatesearch" className="nav-link" style={({ isActive }) => ({ color: isActive ? '#56CEDB' : '#FFFDFB' })}>
                    Roommate Search
                </NavLink>
            </li> */}
      {/* <li className="nav-link ">
                <NavLink to="/registeredcompanies" className="nav-link" style={({ isActive }) => ({ color: isActive ? '#56CEDB' : '#FFFDFB' })}>
                    Your Events
                </NavLink>
            </li> */}
      {/* <li className="nav-link ">
                <NavLink to="/addcompany" className="nav-link" style={({ isActive }) => ({ color: isActive ? '#56CEDB' : '#FFFDFB' })}>
                    Create Events
                </NavLink>
            </li> */}
      {/* <li className="nav-link ">
                <NavLink to="/roommatepost" className="nav-link" style={({ isActive }) => ({ color: isActive ? '#56CEDB' : '#FFFDFB' })}>
                    Post for Roommates
                </NavLink>
            </li> */}
      <li className="nav-link">
        <NavLink to="/login" className="btn btn-secondary">
          Logout
        </NavLink>
      </li>
    </nav>
  );
};

export default Header;
