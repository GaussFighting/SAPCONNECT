import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const GoBackButton = ({ ticketId }) => {
  const goBackPath = `/?ticket_id=${ticketId}`;
  return (
    <NavLink to={goBackPath} className="go-back-icon">
      <FontAwesomeIcon icon={faCircleLeft} size="3x"></FontAwesomeIcon>
    </NavLink>
  );
};
export default GoBackButton;
