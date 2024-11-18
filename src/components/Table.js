import React from "react";
// import { useLocation } from "react-router-dom";

const Table = (props) => {
  // const location = useLocation();

  // const getTicketId = () => {
  //   const queryParams = new URLSearchParams(location.search);
  //   console.log(queryParams)
  //   return queryParams.get('ticket_id');
  // };

  // const ticketId = getTicketId();

  return (
    <div>
      <h2>Informacje o Tickecie</h2>
      <p>Ticket ID: {props.ticketId || "Brak ticket_id w URL"}</p>
    </div>
  );
};

export default Table;
