import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns, getRows } from "../utils/utils";
const RenderDataGrid = ({ data, title, dataKey }) => (
  <>
    <div className="title">{title}</div>
    <DataGrid
      rows={getRows(data[dataKey])}
      columns={getColumns(data[dataKey])}
      pageSize={5}
      rowsPerPageOptions={[5]}
      style={{ marginBottom: "20px" }}
    />
  </>
);

export default RenderDataGrid;
