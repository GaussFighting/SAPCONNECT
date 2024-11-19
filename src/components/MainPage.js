import React from "react";
import MPMenu from "./MPMenu";

const MainPage = (props) => {
  const ticketId = props.ticketId || "No ticket ID provided!";
  return (
    <>
      <div>Main Page Component Ticket ID: {ticketId}</div>
      <MPMenu ticketId={ticketId} />
    </>
  );
};
export default MainPage;
