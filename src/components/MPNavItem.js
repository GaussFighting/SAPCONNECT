import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import { Button } from "react-bootstrap"; // you mix reactstrap lib with react-bootstrap...I'd recommend to use one of them only :)

const MPButton = ({ path, ticketId, label }) => {
  const fullpath = `${path}?ticket_id=${ticketId}`;
  return (
    <NavItem>
      <NavLink className="nav-link" to={fullpath}>
        <Button variant="primary">{label}</Button>{" "}
        {/* Is a Button necessary here? Maybe only NavLink could be ok?*/}
      </NavLink>
    </NavItem>
  );
};

export default MPButton;
