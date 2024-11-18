import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Button = (props) => {
  return (
    <>
      <Nav>
        <NavItem>
          <NavLink to={props.path}>{props.ticketId}</NavLink>
        </NavItem>
      </Nav>
    </>
  );
};
export default Button;
