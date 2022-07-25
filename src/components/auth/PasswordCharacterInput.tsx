import {OutlinedInput, Stack, SxProps, Theme, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import React, {RefObject} from "react";

const PasswordCharacterInput: React.FC<{ index: number, inputRef: RefObject<HTMLInputElement> }> = (props) => {
    let isDisabled = props.inputRef.current?.disabled;
    let characterIndexProps, inputProps: SxProps<Theme> | undefined;
    if (isDisabled) {
        characterIndexProps = {color: grey[800]};
    } else {
        inputProps = {backgroundColor: '#333333'};
    }

    return (
        <Stack sx={{
            justifyContent: 'center',
            rowGap: '5px'
        }}>
            <OutlinedInput sx={inputProps} inputRef={props.inputRef} type="password"
                           disabled={props.inputRef.current?.disabled}
                           inputProps={{
                               min: 0, maxLength: 1, style: {textAlign: 'center'}
                           }}
            />
            <Typography sx={characterIndexProps}>{props.index + 1}</Typography>
        </Stack>
    );
}

export default PasswordCharacterInput;