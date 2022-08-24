import {Box, Button, Paper, Stack, Typography,} from "@mui/material";
import React, {createRef, useEffect, useReducer, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import {useNavigate} from "react-router-dom";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";
import {useAppDispatch} from "../../hook/redux-hooks";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {PASSWORD_MAX_LENGTH, REST_PATH_AUTH} from "../../constants/Constants";
import {authenticate, sendRequest} from "../../store/slice/userAuthenticationSlice";
import {UserAuthenticationSliceType} from "../../store/slice-types/UserAuthenticationSliceType";
import store, {RootState} from "../../store/store";
import {useSelector} from "react-redux";


const PasswordForm: React.FC<{ toggleForms: () => void, data: PasswordCombinationType | null }> = (props) => {
    let userAuthentication = useSelector<RootState, UserAuthenticationSliceType>((state) => state.userAuthentication)
    const [status, setStatus] = useState<number>(200)
    const navigate = useNavigate();
    //  error handlers
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    //data preparation
    const [password] = useState<number[] | undefined>(props.data?.combination.split(' ').map((i) => parseInt(i)))
    const [inputRefsArray] = useState(() =>
        Array.from({length: PASSWORD_MAX_LENGTH}, () => createRef<HTMLInputElement>())
    );
    const setCurrentIndex = useState<number>(password![0])[1];
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const dispatch = useAppDispatch()

    const getPassword = () => {
        let psw: string = ''
        password?.forEach(p => {
            psw += inputRefsArray[p].current?.value;
        })
        return psw;
    }

    useEffect(() => {

        inputRefsArray.forEach(
            (ref) => {
                ref.current!.value = "";
            }
        )

        inputRefsArray.forEach(
            (ref) => {
                ref.current!.disabled = true;
            }
        )
        password?.forEach(
            (char) => {
                inputRefsArray[char].current!.disabled = false;
            }
        )

        inputRefsArray[password![0]].current?.focus()
    }, [inputRefsArray, password, status]);

    useEffect(() => {
        forceUpdate();
    }, [forceUpdate]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const pressedButton = e.key;
        if (pressedButton.length === 1 && pressedButton.match(/^[0-9A-Za-z]+$/)) {
            setCurrentIndex((prevIndex) => {
                let letterIndex = password!.indexOf(prevIndex);
                let nextIndex = letterIndex < password!.length - 1 ? letterIndex + 1 : letterIndex;
                if (nextIndex < password!.length) {
                    const nextInput = inputRefsArray?.[password![nextIndex]]?.current;
                    nextInput?.focus();
                }
                return password![nextIndex];
            });
        } else if (pressedButton === "Backspace") {
            setCurrentIndex((currentIndex) => {
                let letterIndex = password!.indexOf(currentIndex);
                if (letterIndex === -1) {
                    letterIndex = password!.length - 1;
                }
                console.log(letterIndex)
                let prevIndex = letterIndex > 0 ? letterIndex - 1 : 0;
                console.log(prevIndex)
                const prevInput = inputRefsArray?.[password![prevIndex]]?.current;
                prevInput?.focus();
                return password![prevIndex];
            });
        }
    };

    const handleFocus = (index: number) => {
        setCurrentIndex(index);
    };

    const passwordSubmitHandler = () => {
        const psw = getPassword();
        if (!isCodeValid(psw)) {
            setErrorAlertState({
                isOpen: true,
                message: 'Fill all cells.'
            });
        } else {
            const body =JSON.stringify({
                clientId: props.data!.clientId,
                password: psw
            })

            dispatch(sendRequest(
                { body : body, url : REST_PATH_AUTH + '/web/login', method : 'POST'}
            )).then(
                (response) => {

                    const status = store.getState().userAuthentication.status

                    if (status === 200) {
                        console.log('redirecting to transfers page ...')
                        navigate('/transfers', {replace: true})
                    }

                    if (status === 206) {
                        console.log('redirecting to otp verification page ...')
                        let url = '/login/verify?clientId=' + props.data?.clientId;
                        navigate(url, {replace: true})
                    }

                    setErrorAlertState({
                        isOpen: true,
                        message: store.getState().userAuthentication.error!
                    });
                    inputRefsArray.forEach(
                        (ref) => {
                            ref.current!.value = "";
                        }
                    )
                }
            )
        }

    }

    return (
        <form>
            <Box
                sx={{
                    width: "1060px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "100px",
                }}
            >
                {/*todo correct*/}
                {/*<Spinner isLoading={store.getState().userAuthentication.isLoading}/>*/}
                <AlertSnackBar severity={"error"}
                               alertState={{"state": errorAlertState, "setState": setErrorAlertState}}/>
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
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h3" textAlign="center" color="primary">
                            Log in
                        </Typography>
                        <Box>
                            {" "}
                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: "14px",
                                    marginBottom: "5px",
                                }}
                            >
                                Provide your password
                            </Typography>
                            <Stack
                                direction="row"
                                sx={{
                                    textAlign: "center",
                                    columnGap: "5px",
                                }}
                            >
                                {inputRefsArray.map((ref, index) => {
                                    return (
                                        <PasswordCharacterInput
                                            key={index}
                                            index={index}
                                            inputRef={ref}
                                            handleKeyPressed={handleKeyPress}
                                            handleInputFocus={handleFocus}
                                        />
                                    );
                                })}
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                width: "100%"
                            }}
                        >
                            <Button onClick={props.toggleForms} variant="contained" color="secondary" size="medium"
                                    sx={{
                                        width: "100px",
                                        color: "white"
                                    }}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={passwordSubmitHandler}
                                sx={{
                                    width: "350px",
                                }}
                            >
                                Login
                            </Button>
                            <Box width="100px"></Box>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </form>
    );
};

export default PasswordForm;
