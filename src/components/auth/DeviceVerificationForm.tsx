import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import React, {createRef, useEffect, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import {useNavigate, useSearchParams} from "react-router-dom";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import Spinner from "../common/Spinner";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {CODE_LENGTH, REST_PATH_AUTH} from "../../constants/Constants";
import AlertSnackBar from "../notofications/AlertSnackBar";
import {useAppDispatch, useAppSelector} from "../../hook/redux-hooks";
import {login, verifyOtp} from "../../actions/user-action";
import store from "../../store/store";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";

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
    const userAuth = useAppSelector((state) => state.userAuth)
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
                message: 'Incorrect password.'
            });
            return;
        }

        digitsRefs[currentIndex].current?.focus();
        window.addEventListener("keyup", handleKeyPress, false);

        return () => {
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, [digitsRefs,handleKeyPress]);

    const submitHandler = () => {
        const code = getCode();
        if(clientId === null) {
            setErrorMsg('No client id')
            setIsErrorMessageOpen(true);
            return;
        }
        if (!isCodeValid(code)) {
            setErrorAlertState({
                isOpen: true,
                message: 'Fill all cells.'
            });
            return;
        }
        dispatch(verifyOtp(clientId, code)).then(() => {
            const status = store.getState().userAuth['status']
                if (status === 200) {
                    navigate('/transfers', {replace: true})
                }
            }
        ).catch((error) => {
            setIsErrorMessageOpen(true);
            setErrorMsg(error);
            digitsRefs.forEach(
                (ref) => {
                    ref.current!.value = "";
                }
            )
        })
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
            {/*<Spinner isLoading={isLoading}/>*/}
            {/*<AlertSnackBar severity={"error"} alertState={{"state": errorAlertState, "setState": setErrorAlertState}}/>*/}
            <Spinner isLoading={userAuth["loading"]}/>
            <AlertSnackBar message={errorMsg} severity={"error"}
                           alertState={{"state": isErrorMessageOpen, "setState": setIsErrorMessageOpen}}/>
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