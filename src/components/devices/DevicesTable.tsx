import {DataGrid, GridColDef, GridEventListener} from '@mui/x-data-grid';
import {Box, Button} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {REST_PATH_ACCOUNT} from "../../constants/Constants";
import {ClientJS} from "clientjs";
import {TrustedDeviceResponse} from "../../models/custom-types/TrustedDeviceResponse";
import TrustedDevice from "../../models/trustedDevice";
import {AlertState} from "../notifications/AlertSnackBar";

const DevicesTable: React.FC<{
    setErrorAlertState: Dispatch<SetStateAction<AlertState>>;
    setSuccessAlertState: Dispatch<SetStateAction<AlertState>>;
}> = (props) => {
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
    const [isProcessingDeleteTrustedDeviceRequest, setIsProcessingDeleteTrustedDeviceRequest] = useState(false);

    const [trustedDeviceList, setTrustedDeviceList] = useState<TrustedDevice[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<TrustedDevice | null>(null);

    const columns: GridColDef[] = [
        {field: 'deviceName', type: 'string', headerName: 'Device name', flex: 1},
        {field: 'ipAddress', type: 'string', headerName: 'IP address', flex: 1},
        {field: 'registrationDate', type: 'data', headerName: 'Registration date', flex: 1},
        {field: 'lastLoggedInDate', type: 'data', headerName: 'Last logged in date', flex: 1}
    ];
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        if (!!errorDeleteTrustedDevice) {
            props.setErrorAlertState({
                isOpen: true,
                message: errorDeleteTrustedDevice.message
            });
        }
    }, [errorDeleteTrustedDevice, props.setErrorAlertState])

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
                    registrationDate: new Date(trustedDeviceResponse.registrationDate).toLocaleDateString('en-us', {
                        year: "numeric",
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric"
                    }),
                    lastLoggedInDate: new Date(trustedDeviceResponse.lastLoggedInDate).toLocaleDateString('en-us', {
                        year: "numeric",
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric"
                    })
                });
            }
            setTrustedDeviceList(loadedTrustedDeviceList);
            setRows(loadedRows);
        }

        const client = new ClientJS();

        const getTrustedDeviceListRequest: RequestConfig = {
            url: REST_PATH_ACCOUNT + "/devices",
            headers: {
                'Device-Fingerprint': client.getFingerprint().toString()
            }
        };
        sendGetTrustedDeviceListRequest(getTrustedDeviceListRequest, transformTrustedDevices);
    }, [sendGetTrustedDeviceListRequest]);

    const handleDeleteTrustedDeviceSuccessResponse = (response: any) => {
        setRows((prevRows) => {
            return prevRows.filter(row => row.id !== selectedDevice!.id)
        });
        setSelectedDevice(null);
        props.setSuccessAlertState({
            isOpen: true,
            message: "Device successfully removed from trusted devices"
        });
    }

    const handleDeleteRow = () => {
        if (selectedDevice === null) {
            return;
        }

        const deleteTrustedDeviceRequest: RequestConfig = {
            url: REST_PATH_ACCOUNT + "/devices/" + selectedDevice.id,
            method: 'DELETE',
        };
        sendDeleteTrustedDeviceRequest(deleteTrustedDeviceRequest, handleDeleteTrustedDeviceSuccessResponse);
    };

    const handleDeviceClick: GridEventListener<'rowClick'> = (params) => {
        const selectedTrustedDevice = trustedDeviceList.find((trustedDevice) => {
            return trustedDevice.id === params.id
        });
        if (selectedTrustedDevice === undefined) {
            setSelectedDevice(null);
        } else {
            setSelectedDevice(selectedTrustedDevice);
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
                <Button size="large" variant="outlined" color="error" onClick={handleDeleteRow}
                        disabled={selectedDevice === null}>
                    Delete device
                </Button>
            </Box>
            <Box sx={{height: 400, mt: 1}}>
                <DataGrid rows={rows} columns={columns} loading={isTrustedDeviceListLoading}
                          onRowClick={handleDeviceClick}
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