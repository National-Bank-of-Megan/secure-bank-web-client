import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm from "./UsernameForm";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";

const LoginForm = () => {
    const [loginBasicData, setLoginBasicData ] = useState<PasswordCombinationType | null>(null );
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
