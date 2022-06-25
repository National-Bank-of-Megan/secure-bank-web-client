import * as React from 'react';
import {useState} from "react";
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {useDemoData} from '@mui/x-data-grid-generator';

const ExchangeRatesTable = () => {
    const [currentCurrency, setCurrentCurrency] = useState('PLN')

    const data: GridRowsProp = [
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'PLN', col1: "PLN", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456},
        {id: 'USD', col1: "USD", col2: 4.4567, col3: 4.4456}
    ];


    const columns: GridColDef[] = [
        {field: 'col1', headerName: 'Currency',flex :1},
        {field: 'col2', headerName: 'Sell [' + currentCurrency + ']',flex :1},
        {field: 'col3', headerName: 'Buy [' + currentCurrency + ']',flex :1}
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                {...data}
                rows={data} columns={columns}
                initialState={{
                    pagination: {
                        page: 1,
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
                }}


            />


        </div>
    )
}

export default ExchangeRatesTable;