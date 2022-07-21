import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm, {PasswordCombination} from "./UsernameForm";

const LoginForm = () => {
    const [loginKnownDeviceData, setLoginKnownDeviceData ] = useState<PasswordCombination | null>(null );
    const [usernameFormVisible, setUsernameFormVisible] = useState(true);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);

    const [clientId, setClientId] = useState<string>('');

    const toggleFormsVisibility = () => {
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);
    }
    //known device
    //data = clientID, password letter combination
    const toggleToPasswordForm = (data: PasswordCombination) => {
        setLoginKnownDeviceData(data);
        toggleFormsVisibility();
    }

    const submitPassword = (psw :string) =>{
       console.log(psw)
    }

    return (
        <>
            {usernameFormVisible && <UsernameForm toggleForms={toggleFormsVisibility} toggleToPasswordForm={toggleToPasswordForm} savedClientId={clientId} setSavedClientId={setClientId} />}
            {passwordFormVisible && <PasswordForm data={loginKnownDeviceData} toggleForms={toggleFormsVisibility}/>}
        </>
    );
};

export default LoginForm;
