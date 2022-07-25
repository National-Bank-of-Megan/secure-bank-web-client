import {Box, Button, Paper, Stack, Typography,} from "@mui/material";
import React, {createRef, useContext, useEffect, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {useNavigate} from "react-router-dom";
import authContext from "../../store/auth-context";
import Spinner from "../common/Spinner";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {PASSWORD_MAX_LENGTH, REST_PATH_AUTH} from "../../constants/Constants";
import AlertSnackBar from "../notofications/AlertSnackBar";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";

const PasswordForm: React.FC<{ toggleForms: () => void, data: PasswordCombinationType | null }> = (props) => {
    const authCtx = useContext(authContext);
    const navigate = useNavigate();
    const {isLoading, error, sendRequest: loginRequest} = useFetch();
    //  error handlers
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    //data preparation
    const [password] = useState<number[] | undefined>(props.data?.combination.split(' ').map((i) => parseInt(i)))
    const [inputRefsArray] = useState(() =>
        Array.from({length: PASSWORD_MAX_LENGTH}, () => createRef<HTMLInputElement>())
    );
    const setCurrentIndex = useState<number>(password![0])[1];

    const getPassword = () => {
        let psw: string = ''
        password?.forEach(p => {
            psw += inputRefsArray[p].current?.value;
        })
        return psw;
    }

    useEffect(() => {
        if (!!error) {
            setIsErrorMessageOpen(true);
            setErrorMsg('Incorrect password');
            inputRefsArray.forEach(
                (ref) => {
                    ref.current!.value = "";
                }
            )
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

    const handleLogin = (response: any) => {
        //todo check whether new device
        const authToken = response['access_token'];
        const refreshToken = response['refresh_token'];
        authCtx.login(authToken, refreshToken);
        navigate('/transfers', {replace: true})
    }

    const passwordSubmitHandler = () => {
        const psw = getPassword();
        if (!isCodeValid(psw)) {
            setErrorMsg('Fill all cells')
            setIsErrorMessageOpen(true);
        } else {
            const loginRequestContent: RequestConfig = {
                url: REST_PATH_AUTH + "/web/login",
                method: "POST",
                body: {
                    "clientId": props.data?.clientId,
                    "password": psw
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            loginRequest(loginRequestContent, handleLogin);
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
                <Spinner isLoading={isLoading}/>
                <AlertSnackBar message={errorMsg} severity="error"
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
