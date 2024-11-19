import React from "react";
import GoBackButton from "./GoBackButton";

const DataTable = ({ ticketId }) => {
  return (
    <>
      <GoBackButton ticketId={ticketId} />
      <div> DataTable component {ticketId}</div>
    </>
  );
};
export default DataTable;
