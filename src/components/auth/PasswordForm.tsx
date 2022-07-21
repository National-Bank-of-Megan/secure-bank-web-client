import {Backdrop, Box, Button, CircularProgress, Paper, Snackbar, Stack, Typography,} from "@mui/material";
import React, {createRef, useEffect, useRef, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import {PasswordCombination} from "./UsernameForm";
import useInput from "../../hook/use-input";
import MuiAlert from "@mui/material/Alert";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {useNavigate} from "react-router-dom";

const PasswordForm: React.FC<{ toggleForms: () => void, data: PasswordCombination | null }> = (props) => {
    const numerOfInputs = 20;
    const navigate = useNavigate();
    const isValid = (value: string) => value.trim().length === 6;
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [password] = useState<number[] | undefined>(props.data?.combination.split(' ').map((i) => parseInt(i)))
    const [inputRefsArray] = useState(() =>
        Array.from({length: numerOfInputs}, () => createRef<HTMLInputElement>())
    );
    const setCurrentIndex = useState<number>(password![0])[1];
    const {isLoading, error, sendRequest: loginRequest} = useFetch();

    useEffect(() => {
        console.log(password)
        if (!!error) {
            setIsErrorMessageOpen(true);
            setErrorMsg('Incorrect password');
            return;
        }
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
        window.addEventListener("keyup", (e) => handleKeyPress(e), false);
        return () => {
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, [error]);


    const getPassword = () => {
        let psw: string = ''
        password?.forEach(p => {
            psw += inputRefsArray[p].current?.value;
        })
        return psw;
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!e.altKey || !e.shiftKey) {
            setCurrentIndex((prevIndex) => {
                let letterIndex = password!.indexOf(prevIndex)
                let nextIndex = letterIndex < password!.length - 1 ? letterIndex + 1 : -1;
                if (nextIndex !== -1) {
                    const nextInput = inputRefsArray?.[password![nextIndex]]?.current;
                    nextInput?.focus();
                }
                return password![nextIndex];
            });
        }
    };

    const passwordSubmitHandler = () => {
        const psw = getPassword();
        if (!isValid(psw)) {
            setErrorMsg('Fill all cells')
            setIsErrorMessageOpen(true);
        } else {
            const loginRequestContent: RequestConfig = {
                url: "/web/login",
                method: "POST",
                body : {
                    "clientId" : props.data?.clientId,
                    "password" : psw

                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            loginRequest(loginRequestContent,()=> navigate('/transfers'));
        }

    }

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsErrorMessageOpen(false);
    };

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
