import React from "react";
import MPMenu from "./MPMenu";

const MainPage = (props) => {
  const ticketId = props.ticketId || "No ticket ID provided!";
  return (
    <div>
      <div>Main Page Component Ticket ID: {ticketId}</div>
      <MPMenu ticketId={ticketId} />
    </div>
  );
};
export default MainPage;
