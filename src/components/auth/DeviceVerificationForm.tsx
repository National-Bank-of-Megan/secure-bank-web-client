import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import React, {createRef, useEffect, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import {useNavigate, useSearchParams} from "react-router-dom";
import Spinner from "../common/Spinner";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {CODE_LENGTH, REST_PATH_AUTH} from "../../constants/Constants";

import {useAppDispatch} from "../../hook/redux-hooks";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {Tokens, userAuthenticationActions} from "../../store/slice/userAuthenticationSlice";
import {ClientJS} from "clientjs";
import {AccountCredentialsType} from "../../models/custom-types/AccountCredentialsType";
import useFetch, {RequestConfig} from "../../hook/use-fetch";


const DeviceVerificationForm: React.FC<{ accountCredentials: AccountCredentialsType }> = ({accountCredentials}) => {
    const dispatch = useAppDispatch()

    const {isLoading, error, sendRequest: verificationLoginRequest} = useFetch();

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
        digitsRefs[currentIndex].current?.focus();
        window.addEventListener("keyup", handleKeyPress, false);

        return () => {
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, [digitsRefs, handleKeyPress]);

    useEffect(() => {
        if (!!error) {
            digitsRefs.forEach(
                (ref) => {
                    ref.current!.value = "";
                }
            )
            setErrorAlertState({
                isOpen: true,
                message: error.message
            });
        }
    }, [error, digitsRefs]);

    const handleLoginSuccessResponse = (response: any) => {
        const tokens: Tokens = {
            authToken: response['access_token'],
            refreshToken: response['refresh_token']
        }
        dispatch(userAuthenticationActions.loginHandler(tokens));
        navigate('/transfers', {replace: true});
    }

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

        const client = new ClientJS();
        const loginRequestData: RequestConfig = {
            url: REST_PATH_AUTH + "/login/verify",
            method: "POST",
            body: {
                "clientId": clientId,
                "code": code,
                "deviceFingerprint": client.getFingerprint().toString(),
                "password": accountCredentials.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        verificationLoginRequest(loginRequestData, handleLoginSuccessResponse);
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
            <Spinner isLoading={isLoading}/>
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