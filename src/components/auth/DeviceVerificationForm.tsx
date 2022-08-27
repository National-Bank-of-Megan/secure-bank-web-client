import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import React, {createRef, useEffect, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import {useNavigate, useSearchParams} from "react-router-dom";
import useFetch from "../../hook/use-fetch";
import Spinner from "../common/Spinner";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {CODE_LENGTH, REST_PATH_AUTH} from "../../constants/Constants";

import {useAppDispatch, useAppSelector} from "../../hook/redux-hooks";
import store from "../../store/store";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {sendRequest} from "../../store/slice/userAuthenticationSlice";


const DeviceVerificationForm = () => {
    const [digitsRefs] = useState(() =>
        Array.from({length: CODE_LENGTH}, () => createRef<HTMLInputElement>())
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const searchParams = useSearchParams()[0];
    const clientId = searchParams.get('clientId');
    //request
    const navigate = useNavigate();
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const {isLoading, error, sendRequest: loginRequest} = useFetch();

    //redux
    const userAuth = useAppSelector((state) => state.userAuthentication)
    const dispatch = useAppDispatch()

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
            setErrorAlertState({
                isOpen: true,
                message: error.message
            });
            return;
        }

        digitsRefs[currentIndex].current?.focus();
        window.addEventListener("keyup", handleKeyPress, false);

        return () => {
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, [digitsRefs, handleKeyPress]);

    const submitHandler = () => {
        const code = getCode();
        if (clientId === null) {
            setErrorAlertState({
                isOpen: true,
                message: 'No client id'
            });
            return;
        }
        if (!isCodeValid(code)) {
            setErrorAlertState({
                isOpen: true,
                message: 'Fill all cells.'
            });
            return;
        }

        const body = JSON.stringify({
            clientId: clientId,
            code: code
        })

        dispatch(sendRequest(
            {body: body, url: REST_PATH_AUTH + '/web/login/verify', method: 'POST'}
        )).then((response) => {

            if(store.getState().userAuthentication.status == 200)  navigate('/transfers', {replace: true});

                if (store.getState().userAuthentication.error) {
                    digitsRefs.forEach(
                        (ref) => {
                            ref.current!.value = "";
                        }
                    )
                    setErrorAlertState({
                        isOpen: true,
                        message: store.getState().userAuthentication.error!
                    });
                }
            }
        )

    }


    const handleFocus = (index: number) => {
        setCurrentIndex(index);
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
            <Spinner isLoading={false}/>
            <AlertSnackBar severity={"error"} alertState={{"state": errorAlertState, "setState": setErrorAlertState}}/>

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
                                    handleInputFocus={handleFocus}
                                    handleKeyPressed={() => {
                                    }}/>
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
                        onClick={submitHandler}

                    >
                        Verify
                    </Button>
                </Stack>
            </Paper>
        </Box>
    </>
}

export default DeviceVerificationForm;