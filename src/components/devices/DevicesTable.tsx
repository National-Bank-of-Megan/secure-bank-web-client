import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {randomCreatedDate, randomInt} from "@mui/x-data-grid-generator";
import {Box, Button} from "@mui/material";
import * as React from "react";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {useEffect, useState} from "react";
import {REST_PATH_AUTH} from "../../constants/Constants";
import {ClientJS} from "clientjs";
import {DetailedTransactionTypeResponse} from "../../models/custom-types/DetailedTransactionTypeResponse";
import DetailedTransaction from "../../models/detailedTransaction";
import {TrustedDeviceResponse} from "../../models/custom-types/TrustedDeviceResponse";
import TrustedDevice from "../../models/trustedDevice";

const DevicesTable = () => {
    const {
        isLoading: isTrustedDeviceListLoading,
        error: errorDeviceList,
        sendRequest: sendGetTrustedDeviceListRequest
    } = useFetch();
    const {
        isLoading: isDeleteTrustedDeviceLoading,
        error: errorDeleteTrustedDevice,
        sendRequest: sendDeleteTrustedDeviceRequest
    } = useFetch();
    const [trustedDeviceList, setTrustedDeviceList] = useState<TrustedDevice[]>([]);
    const [isTrustedDeviceListLoaded, setIsTrustedDeviceListLoaded] = useState(false);

    const columns: GridColDef[] = [
        {field: 'deviceName', type: 'string', headerName: 'Device name', flex: 1},
        {field: 'ipAddress', type: 'string', headerName: 'IP address', flex: 1},
        {field: 'registrationDate', type: 'data', headerName: 'Registration date', flex: 1},
        {field: 'lastLoggedInDate', type: 'data', headerName: 'Last logged in date', flex: 1}
    ];
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const transformTrustedDevices = (trustedDeviceResponseObj: TrustedDeviceResponse[]) => {
            const loadedTrustedDeviceList: TrustedDevice[] = [];
            const loadedRows: any[] = [];
            for (const key in trustedDeviceResponseObj) {
                const trustedDeviceResponse = trustedDeviceResponseObj[key];
                loadedTrustedDeviceList.push({
                    id: trustedDeviceResponse.id,
                    name: trustedDeviceResponse.name,
                    ip: trustedDeviceResponse.ip,
                    registrationDate: trustedDeviceResponse.registrationDate,
                    lastLoggedInDate: trustedDeviceResponse.lastLoggedInDate,
                    isCurrentDevice: trustedDeviceResponse.isCurrentDevice
                });
                loadedRows.push({
                    id: trustedDeviceResponse.id,
                    deviceName: trustedDeviceResponse.name,
                    ipAddress: trustedDeviceResponse.ip,
                    registrationDate: trustedDeviceResponse.registrationDate,
                    lastLoggedInDate: trustedDeviceResponse.lastLoggedInDate
                });
            }
            setTrustedDeviceList(loadedTrustedDeviceList);
            setRows(loadedRows);
            setIsTrustedDeviceListLoaded(true);
        }

        const client = new ClientJS();

        const getTrustedDeviceListRequest: RequestConfig = {
            url: REST_PATH_AUTH + "/account/devices",
            headers: {
                'Device-Fingerprint' : client.getFingerprint().toString()
            }
        };
        sendGetTrustedDeviceListRequest(getTrustedDeviceListRequest, transformTrustedDevices);
    }, [sendGetTrustedDeviceListRequest]);


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
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
                <Button size="large" variant="outlined" color="error" onClick={handleDeleteRow}>
                    Delete device
                </Button>
            </Box>
            <Box sx={{height: 400, mt: 1}}>
                <DataGrid rows={rows} columns={columns} loading={isTrustedDeviceListLoading}
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