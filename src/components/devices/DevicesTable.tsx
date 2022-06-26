import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {randomCreatedDate, randomInt, randomUserName} from "@mui/x-data-grid-generator";
import {Box, Button, Stack} from "@mui/material";
import * as React from "react";
import TableStyles from "../../styles/TableStyles";

const DevicesTable = () => {

    const columns: GridColDef[] = [
        {field: 'col1', type: 'string', headerName: 'Device name', flex: 1},
        {field: 'col2', type: 'string', headerName: 'Address IP', flex: 1},
        {field: 'col3', type: 'data', headerName: 'Registration date', flex: 1}
    ];
    const [rows, setRows] = React.useState(() => [
        {id: 1, col1: "desktop 1", col2: '10.10.10.10', col3: randomCreatedDate()},
        {id: 2, col1: "desktop 1", col2: '10.10.10.10', col3: randomCreatedDate()},
        {id: 3, col1: "desktop 1", col2: '10.10.10.10', col3: randomCreatedDate()},
        {id: 4, col1: "desktop 1", col2: '10.10.10.10', col3: randomCreatedDate()},
        {id: 5, col1: "desktop 1", col2: '10.10.10.10', col3: randomCreatedDate()},

    ]);


    const handleDeleteRow = () => {
        setRows((prevRows) => {
            const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
            return [
                ...rows.slice(0, rowToDeleteIndex),
                ...rows.slice(rowToDeleteIndex + 1),
            ];
        });
    };


    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{display:'flex',justifyContent:'end'}}>
            <Button size="large" variant="outlined" color="error" onClick={handleDeleteRow} >
                Delete device
            </Button>
            </Box>
            <Box sx={{height: 400, mt: 1}}>
                <DataGrid rows={rows} columns={columns}
                          initialState={{
                              pagination: {
                                  page: 0,
                              },
                          }}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          pagination
                          sx={{
                              border: 'none',
                              '& .MuiDataGrid-cell:hover': {
                                  color: 'primary.main',
                              },
                              '.MuiDataGrid-columnSeparator': {
                                  visibility: 'hidden',
                              }
                          }}/>
            </Box>
        </Box>
    );
}
export default DevicesTable;