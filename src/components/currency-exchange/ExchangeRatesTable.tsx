import * as React from 'react';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import Spinner from "../common/Spinner";
import {Typography} from "@mui/material";
import {Action} from "./CurrencyExchangeForm";

const ExchangeRatesTable: React.FC<{ currentCurrency: string, data :GridRowsProp, isLoading :boolean }> = ({currentCurrency, data, isLoading}) => {

    const columns: GridColDef[] = [
        {field: 'col1', headerName: 'Currency', flex: 1},
        {field: 'col2', headerName: 'Sell [' + currentCurrency + ']', flex: 1}
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <Spinner isLoading={isLoading}/>

            <DataGrid
                {...data}
                rows={data} columns={columns}
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
                }}


            />


        </div>
    )
}

export default ExchangeRatesTable;