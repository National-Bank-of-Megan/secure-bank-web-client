import {OutlinedInput, Stack, Typography} from "@mui/material";
import {RefObject, SetStateAction} from "react";

const PasswordCharacterInput: React.FC<{ index: number,  inputRef: RefObject<HTMLInputElement>}> = (props) => {

    return (
        <Stack sx={{
            justifyContent: 'center',
            rowGap: '5px'
        }}>
            <OutlinedInput inputRef={props.inputRef} type="password" disabled={props.inputRef.current?.disabled}
                           inputProps={{
                               min: 0, maxLength: 1, style: {textAlign: 'center'}
                           }}
            />
            <Typography>{props.index + 1}</Typography>
        </Stack>
    );
}

export default PasswordCharacterInput;