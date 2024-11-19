import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Button = ({ ticketId, path }) => (
  <Nav>
    <NavItem>
      <NavLink to={path}>{ticketId}</NavLink>
    </NavItem>
  </Nav>
);

export default Button;
