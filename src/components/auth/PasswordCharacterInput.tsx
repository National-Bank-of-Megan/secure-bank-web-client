import { Stack, OutlinedInput, Typography } from "@mui/material";
import { RefObject, SetStateAction, useRef } from "react";
import { findDOMNode } from "react-dom";

const PasswordCharacterInput: React.FC<{ index: number, active: boolean, setLetters: React.Dispatch<SetStateAction<string[]>>, inputRef: RefObject<HTMLInputElement> }> = (props) => {

    return (
        <Stack sx={{
            justifyContent: 'center',
            rowGap: '5px'
        }}>
            <OutlinedInput ref={props.inputRef} type="password" disabled={!props.active} inputProps={{
                min: 0, maxLength: 1, style: { textAlign: 'center' }
            }}
            onChange={(e) => {
                const { value } = e.target;
                props.setLetters((letters) =>
                  letters.map((letter, letterIndex) =>
                    letterIndex === props.index ? value : letter
                  )
                );
              }}

            />
            <Typography>{props.index+1}</Typography>
        </Stack>
    );
}

export default PasswordCharacterInput;