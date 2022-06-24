import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from "react";
import {Pagination, TableFooter, TablePagination} from "@mui/material";

function createCurrencyRates(
    currency: string,
    sellingRate: number,
    buyingRate: number
) {
    return {currency, sellingRate, buyingRate};
}

const ExchangeRatesTable = () => {
    const [page, setPage] = useState(2);
    const exchangeRatesTableData = [
        createCurrencyRates('PLN', 4.3512, 4.3512),
        createCurrencyRates('EUR', 4.3512, 4.3512),
        createCurrencyRates('USD', 4.3512, 4.3512),
        createCurrencyRates('CHF', 4.3512, 4.3512),
        createCurrencyRates('GBP', 4.3512, 4.3512)
    ];

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper} sx={{bgcolor:'background.default'}}>
            <Table sx={{minWidth: 600}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Currency</TableCell>
                        <TableCell align="center">Buy [PLN]</TableCell>
                        <TableCell align="center">Sell [PLN]</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exchangeRatesTableData.map((currency) => (
                        <TableRow
                            key={currency.currency}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {currency.currency}
                            </TableCell>
                            <TableCell align="center">{currency.buyingRate}</TableCell>
                            <TableCell align="center">{currency.sellingRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination count={1} page={1} onPageChange={() => {
                    }} rowsPerPage={5} sx={{
                        ".MuiTablePagination-toolbar": {
                            backgroundColor: "rgba(100,100,100,0.5)"
                        },
                        ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                          visibility:'false'
                        }
                    }}/>
                </TableFooter>

            </Table>


        </TableContainer>
    );
}

export default ExchangeRatesTable;