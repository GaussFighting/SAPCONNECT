import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

const MPButton = ({ path, ticketId, label }) => {
  const fullpath = `${path}?ticket_id=${ticketId}`;
  return (
    <NavItem>
      <NavLink className="nav-link btn" to={fullpath}>
        {label}
      </NavLink>
    </NavItem>
  );
};

export default MPButton;
