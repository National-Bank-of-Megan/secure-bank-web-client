import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm, {PasswordCombination} from "./UsernameForm";

const LoginForm = () => {
    const [loginBasicData, setLoginBasicData ] = useState<PasswordCombination | null>(null );
    const [usernameFormVisible, setUsernameFormVisible] = useState(true);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);

    const toggleFormsVisibility = () => {
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);
    }

    return (
        <>
            {usernameFormVisible && <UsernameForm toggleForms={toggleFormsVisibility}  setLoginBasicData={setLoginBasicData}/>}
            {passwordFormVisible && <PasswordForm data={loginBasicData} toggleForms={toggleFormsVisibility}/>}
        </>
    );
};

export default LoginForm;
