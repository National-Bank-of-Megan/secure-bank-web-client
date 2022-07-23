import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm from "./UsernameForm";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";

const LoginForm = () => {
    const [loginBasicData, setLoginBasicData ] = useState<PasswordCombinationType | null>(null );
    const [usernameFormVisible, setUsernameFormVisible] = useState(true);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);
    const [clientId, setClientId] = useState<string>('');

    const toggleFormsVisibility = () => {
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);
    }

    return (
        <>
            {usernameFormVisible && <UsernameForm toggleForms={toggleFormsVisibility}  setLoginBasicData={setLoginBasicData}
                                                  savedClientIdState = {{"state" :clientId, "setState": setClientId}}
            />}
            {passwordFormVisible && <PasswordForm data={loginBasicData} toggleForms={toggleFormsVisibility}/>}
        </>
    );
};

export default LoginForm;
