import React from "react";
import MPMenu from "./MPMenu";
import dummydata from "../data/dummydata.json";

const MainPage = (props) => {
  const ticketId = props.ticketId || "No ticket ID provided!";

  const clientInfo = dummydata.ClientInfo;
  const currentOrders = dummydata.CurrentOrders;

  return (
    <>
      <div>Main Page Component Ticket ID: {ticketId}</div>
      <h3>Dane Klienta</h3>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {Object.keys(clientInfo[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clientInfo.map((info, index) => (
            <tr key={index}>
              {Object.values(info).map((value, idx) => (
                <td key={idx}>{value !== null ? value : "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Otwarte Zamówienia</h3>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {Object.keys(currentOrders[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={index}>
              {Object.values(order).map((value, idx) => (
                <td key={idx}>{value !== null ? value : "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <MPMenu ticketId={ticketId} />
    </>
  );
};

export default MainPage;
