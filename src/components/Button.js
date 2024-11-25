import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Button = ({ ticketId, path }) => (
  <Nav>
    {/* Nav in the Button component? :O */}
    <NavItem>
      <NavLink to={path}>{ticketId}</NavLink>
    </NavItem>
  </Nav>
);

export default Button;
