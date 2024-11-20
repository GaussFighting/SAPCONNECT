export const getColumns = (data) =>
  data && data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 180,
      }))
    : [];

export const getRows = (data) =>
  data ? data.map((row, index) => ({ id: index, ...row })) : [];
