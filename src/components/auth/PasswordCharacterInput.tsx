import {OutlinedInput, Stack, SxProps, Theme, Typography} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, {RefObject, SetStateAction, useEffect} from "react";

const PasswordCharacterInput: React.FC<{ index: number, inputRef: RefObject<HTMLInputElement>, handleKeyPressed: (e: React.KeyboardEvent<HTMLInputElement>) => void,
                                         handleInputFocus: (index: number) => void }> = (props) => {
    let isRendered = !!props.inputRef;
    let isDisabled = props.inputRef.current?.disabled;
    let characterIndexProps, inputProps: SxProps<Theme> | undefined;
    if (isDisabled) {
        characterIndexProps = { color: grey[800] };
    } else {
        inputProps = { backgroundColor: '#333333' };
    }

    return (
        <Stack sx={{
                justifyContent: 'center',
                rowGap: '5px'
            }}>
                <OutlinedInput sx={inputProps} inputRef={props.inputRef} type="password" disabled={props.inputRef.current?.disabled}
                               onKeyUp={props.handleKeyPressed}
                               onFocus={() => props.handleInputFocus(props.index)}
                               autoComplete="off"
                               inputProps={{
                                   min: 0, maxLength: 1,
                                   style: {textAlign: 'center'},
                                   autoComplete: 'off',
                               }}
                />
                <Typography sx={characterIndexProps}>{props.index + 1}</Typography>
            </Stack>

    );
}

export default PasswordCharacterInput;