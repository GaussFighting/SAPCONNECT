import React from "react";
import MPNavItem from "./MPNavItem";
import { Nav } from "reactstrap";

const MPMenu = ({ ticketId }) => {
  const pathArr = [
    "/other-orders",
    "/shipment-info",
    "/invoices",
    "/overdue-payments",
  ];
  const labelsArr = [
    "Inne zamówienia",
    "Wysyłka",
    "Faktury",
    "Przeterminowane należności",
  ];

  return (
    <Nav className="menu" vertical>
      {pathArr.map((path, idx) => (
        <MPNavItem
          key={`${path}+${idx}`}
          ticketId={ticketId}
          path={pathArr[idx]}
          label={labelsArr[idx]}
        />
      ))}
    </Nav>
  );
};

export default MPMenu;
