import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns, getRows } from "../utils/utils";
const InfoGrid = ({ data, title }) => (
  <>
    <div className="title">{title}</div>
    <DataGrid
      rows={getRows(data)}
      columns={getColumns(data)}
      pageSize={5}
      rowsPerPageOptions={[5]}
      style={{ marginBottom: "20px" }}
    />
  </>
);

export default InfoGrid;
