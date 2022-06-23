import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createCurrencyRates(
  currency: string,
  sellingRate: number,
  buyingRate: number
) {
  return { currency,sellingRate,buyingRate };
}

const exchangeRatesTableData = [
 createCurrencyRates('PLN',4.3512,4.3512),
 createCurrencyRates('EUR',4.3512,4.3512),
 createCurrencyRates('USD',4.3512,4.3512),
 createCurrencyRates('CHF',4.3512,4.3512),
 createCurrencyRates('GBP',4.3512,4.3512)
];

const ExchangeRatesTable=()=> {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Buy [PLN]</TableCell>
            <TableCell align="right">Sell [PLN]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeRatesTableData.map((currency) => (
            <TableRow
              key={currency.currency}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {currency.currency}
              </TableCell>
              <TableCell align="right">{currency.buyingRate}</TableCell>
              <TableCell align="right">{currency.sellingRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExchangeRatesTable;