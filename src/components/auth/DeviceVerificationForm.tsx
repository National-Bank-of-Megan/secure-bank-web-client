import {Backdrop, Box, Button, CircularProgress, Paper, Snackbar, Stack, TextField, Typography} from "@mui/material";
import React, {createRef, useEffect, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import currencyExchangeHistoryCard from "../history/CurrencyExchangeHistoryCard";
import {useNavigate, useSearchParams} from "react-router-dom";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import MuiAlert from "@mui/material/Alert";

const DeviceVerificationForm = () => {
    const digits = 6;
    const [digitsRefs] = useState(() =>
        Array.from({length: digits}, () => createRef<HTMLInputElement>())
    );
    const isValid = (value: string) => value.trim().length === digits;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const clientId = searchParams.get('clientId');
    //request
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
    const {isLoading, error, sendRequest: loginRequest} = useFetch();


    const getCode = () => {
        let code = '';
        digitsRefs.forEach((d) => {
            code += d.current?.value;
        })
        return code;
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            submitHandler();
            return;
        }

        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex < digitsRefs?.length - 1 ? prevIndex + 1 : 0;
            digitsRefs[nextIndex]!.current?.focus();
            return nextIndex;
        });
    };

    useEffect(() => {
        if (!!error) {
            setIsErrorMessageOpen(true);
            setErrorMsg('Incorrect password');
            return;
        }

        digitsRefs[currentIndex].current?.focus();
        window.addEventListener("keyup", handleKeyPress, false);

        return () => {
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, [error]);

    const submitHandler = () => {
        const code = getCode();
        if (!isValid(code)) {
            setErrorMsg('Fill all cells')
            setIsErrorMessageOpen(true);
            return;
        }
        const loginRequestContent: RequestConfig = {
            url: "/web/login/verify",
            method: "POST",
            body: {
                "clientId": clientId,
                "code": code
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        loginRequest(loginRequestContent, () => navigate('/transfers'));
    }

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsErrorMessageOpen(false);
    };

    return <>
        <Box
            sx={{
                width: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
            }}
        >
            <Backdrop
                sx={{color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Snackbar open={isErrorMessageOpen} autoHideDuration={6000} onClose={handlePopUpClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handlePopUpClose} severity="error"
                          sx={{width: '100%'}}>
                    {errorMsg}
                </MuiAlert>
            </Snackbar>
            <Paper
                sx={{
                    bgcolor: "background.paper",
                }}
            >

                <Stack
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        rowGap: "40px",
                        padding: "30px",
                        boxShadow: 3

                    }}
                >
                    <Typography
                        variant="h3"
                        textAlign="center"
                        color="primary"
                    >
                        Enter verification code
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{
                            textAlign: "center",
                            columnGap: "5px"
                        }}
                    >
                        {
                            digitsRefs.map((ref, index) => {
                                return <PasswordCharacterInput
                                    key={index}
                                    index={index}
                                    inputRef={ref}

                                />
                            })
                        }
                    </Stack>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            width: "200px",
                            marginTop: "30px",
                        }}

                    >
                        Verify
                    </Button>
                </Stack>


            </Paper>


        </Box>
    </>
}

export default DeviceVerificationForm;