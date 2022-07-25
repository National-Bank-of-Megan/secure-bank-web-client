import * as React from 'react';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import useFetchCurrencyRates from "../../hook/use-fetch-currency-rates";
import {CURRENCIES} from "../../constants/Constants";
import Spinner from "../common/Spinner";
import AlertSnackBar from "../notofications/AlertSnackBar";
import {useEffect} from "react";

const ExchangeRatesTable: React.FC<{ soldCurrency: string }> = ({soldCurrency}) => {
    const {getCurrencyRates,error,isLoading} = useFetchCurrencyRates(soldCurrency);
    const data: GridRowsProp = CURRENCIES.map((currency) => {
        return {id: currency, col1: currency, col2: 4.44}
    })


    useEffect(()=>{
        getCurrencyRates(soldCurrency)
    },[soldCurrency])


    const columns: GridColDef[] = [
        {field: 'col1', headerName: 'Currency', flex: 1},
        {field: 'col2', headerName: 'Sell [' + soldCurrency + ']', flex: 1}
    ];

    // const columns: GridColDef[] = [
    //     {field: 'col1', headerName: 'Currency',flex :1},
    //     {field: 'col2', headerName: 'Exchange rate [' + soldCurrency + ']',flex :1}
    // ];


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