import React from "react";
import MPButton from "./MPButton";

const MPMenu = ({ ticketId }) => {
  const pathArr = ["/otherorders", "/shipmentinfo", "/invoices"];
  const labelsArr = ["Inne zamówienia", "Wysyłka", "Faktury"];

  return (
    <>
      {pathArr.map((path, idx) => (
        <MPButton
          key={`${path}+${idx}`}
          ticketId={ticketId}
          path={pathArr[idx]}
          label={labelsArr[idx]}
        />
      ))}
    </>
  );
};

export default MPMenu;
