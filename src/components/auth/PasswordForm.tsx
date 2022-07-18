import {Box, Button, Paper, Stack, Typography,} from "@mui/material";
import {createRef, useEffect, useState} from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";

const PasswordForm: React.FC<{ toggleForms: () => void, data: Object | null }> = (props) => {
    const numerOfInputs = 20;

    const [inputRefsArray] = useState(() =>
        Array.from({length: numerOfInputs}, () => createRef<HTMLInputElement>())
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    const [letters, setLetters] = useState(() =>
        Array.from({length: numerOfInputs}, () => "")
    );

    useEffect(() => {

        if (inputRefsArray?.[0]?.current) {
            inputRefsArray?.[0]?.current?.focus();
            console.log("lol");
        }

        window.addEventListener("keyup", handleKeyPress, false);
        return () => {
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, []);

    const handleKeyPress = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex < numerOfInputs - 1 ? prevIndex + 1 : 0;
            const nextInput = inputRefsArray?.[nextIndex]?.current;
            nextInput!.focus();
            //   nextInput!.select();
            return nextIndex;
        });
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
                                            active={true}
                                            index={index}
                                            setLetters={setLetters}
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
                            <Button variant="contained" color="secondary" size="medium"
                                    onClick={props.toggleForms}
                                    sx={{
                                        width: "100px",
                                        color: "white"
                                    }}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
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
