import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const GoBackButton = ({ ticketId }) => {
  const goBackPath = `/?ticket_id=${ticketId}`;
  return (
    <>
      <Nav className="go-back-icon">
        {" "}
        {/* Nav in the Button component? :O */}
        <NavItem>
          <NavLink to={goBackPath}>
            <FontAwesomeIcon icon={faCircleLeft} size="3x"></FontAwesomeIcon>
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};
export default GoBackButton;
