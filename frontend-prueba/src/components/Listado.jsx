import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, hide: true},
  { field: 'ssn', headerName: 'SSN', width: 120 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 110,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 110,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 110,
    editable: true,
  }
];

export default function Listado(props) {

  return (
    <Box sx={{ height: 400, width: '100%' }} className="container">
      <DataGrid
        rows={props.members}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experiment34alFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
