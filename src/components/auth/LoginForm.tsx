import { OutlinedInput, Stack } from "@mui/material";
import { useState, createRef, useEffect } from "react";
import PasswordCharacterInput from "./PasswordCharacterInput";

const LoginForm = () => {
  const numerOfInputs = 20;

  const [inputRefsArray] = useState(() =>
    Array.from({ length: numerOfInputs }, () => createRef<HTMLInputElement>())
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const [letters, setLetters] = useState(() =>
  Array.from({ length: numerOfInputs }, () => "")
);


  useEffect(() => {
    if (inputRefsArray?.[0]?.current) {
      inputRefsArray?.[0]?.current?.focus();
      console.log('lol')
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
      <Stack
        direction="row"
        sx={{
          marginTop: "40px",
          width: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          columnGap: "5px",
        }}
      >
        {inputRefsArray.map((ref, index) => {
            return <PasswordCharacterInput index={index} setCurrentIndex={setCurrentIndex} setLetters={setLetters} inputRef={ref} />
        })}
      </Stack>
    </form>
  );
};

export default LoginForm;
