import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { Button } from "react-bootstrap";

const MPButton = ({ path, ticketId, label }) => {
  const fullpath = `${path}?ticket_id=${ticketId}`;
  return (
    <Nav>
      <NavItem>
        <NavLink className="nav-link" to={fullpath}>
          <Button variant="primary">{label}</Button>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default MPButton;
