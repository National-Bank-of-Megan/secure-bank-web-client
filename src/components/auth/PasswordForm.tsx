import {Box, Button, Paper, Stack, Typography,} from "@mui/material";
import React, {createRef, useCallback, useEffect, useReducer, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";
import {useNavigate} from "react-router-dom";
import Spinner from "../common/Spinner";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {PASSWORD_MAX_LENGTH} from "../../constants/Constants";
import AlertSnackBar from "../notofications/AlertSnackBar";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";
import {login} from "../../actions/user-action";
import {UserState} from "../../reducers/user-reducer";
import {useAppDispatch, useAppSelector} from "../../hook/redux-hooks";
import {useSelector} from "react-redux";
import authStore, {RootState} from "../../store/auth-store";


const PasswordForm: React.FC<{ toggleForms: () => void, data: PasswordCombinationType | null }> = (props) => {
    let userAuth = useSelector<RootState,UserState>((state :RootState)=>state.userAuth)
    const [status, setStatus] = useState<number>(userAuth['status'])
    const navigate = useNavigate();
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
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
    }, [inputRefsArray, password, status, userAuth]);

    useEffect(() => {
        forceUpdate();
    }, [forceUpdate]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const pressedButton = e.key;
        if (pressedButton.length === 1 && pressedButton.match(/^[0-9A-Za-z]+$/)) {
            setCurrentIndex((prevIndex) => {
                let letterIndex = password!.indexOf(prevIndex)
                console.log(letterIndex);
                let nextIndex = letterIndex < password!.length - 1 ? letterIndex + 1 : letterIndex;
                console.log(nextIndex);
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
            setErrorMsg('Fill all cells')
            setIsErrorMessageOpen(true);
        } else {
           dispatch( login(props.data!.clientId, psw)).then(
               (response)=>{

                  const status = authStore.getState().userAuth['status']
                   if (status === 200) {
                       console.log('redirecting to transfers page ...')
                       navigate('/transfers', {replace: true})
                   }

                   if (status === 206) {
                       console.log('redirecting to otp verification page ...')
                       let url = '/login/verify?clientId=' + props.data?.clientId;
                       navigate(url, {replace: true})
                   }
               }
           )
                .catch((error) => {
                    setIsErrorMessageOpen(true);
                    setErrorMsg(error);
                    inputRefsArray.forEach(
                        (ref) => {
                            ref.current!.value = "";
                        }
                    )
                })


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
                <Spinner isLoading={userAuth['loading']}/>
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

