import React from "react";
import GoBackButton from "./GoBackButton";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid"; // Zmieniono z 'DataGridPro' na 'DataGrid'
import dummydata from "../data/dummydata.json";

const DataTable = ({ ticketId }) => {
  const location = useLocation();
  let title = "";

  const getDataForPath = () => {
    if (location.pathname.includes("other-orders")) {
      title = "Otwarte zamówienia";
      return { data: dummydata.RestOrders, title };
    }
    if (location.pathname.includes("shipment-info")) {
      title = "Dane wysyłki";
      return { data: dummydata.Shipement, title };
    }
    if (location.pathname.includes("invoices")) {
      title = "Faktury";
      return { data: dummydata.Invoices, title };
    }
    return { data: [], title: "Brak danych" };
  };

  const { data, title: pageTitle } = getDataForPath();

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 180,
        }))
      : [];

  // Mapowanie danych na format 'rows' akceptowany przez DataGrid
  const rows = data.map((row, index) => ({
    id: index, // Każdy wiersz musi mieć unikalny 'id'
    ...row, // Rozwinięcie danych z obiektu
  }));

  return (
    <>
      <GoBackButton ticketId={ticketId} />
      <div>
        <h3>{pageTitle}</h3>
      </div>
      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5} // liczba wierszy na stronę
          rowsPerPageOptions={[5]} // opcje wyboru liczby wierszy na stronie
          checkboxSelection
        />
      </div>
    </>
  );
};

export default DataTable;
