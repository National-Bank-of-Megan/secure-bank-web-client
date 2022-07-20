import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm, {PasswordCombination} from "./UsernameForm";

const LoginForm = () => {
    const [loginKnownDeviceData , setLoginKnownDeviceData ] = useState<PasswordCombination | null>(null );
    const [usernameFormVisible, setUsernameFormVisible] = useState(true);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);

    const toggleFormsVisibility = () => {
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);
    }
    //known device
    //data = clientID, password letter combination
    const toggleToPasswordForm = (data: PasswordCombination) => {
        setLoginKnownDeviceData(data);
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);

    }

    const submitPassword = (psw :string) =>{
       console.log(psw)
    }

    return (
        <>
            {usernameFormVisible && <UsernameForm toggleForms={toggleToPasswordForm}/>}
            {passwordFormVisible && <PasswordForm data={loginKnownDeviceData} toggleForms={submitPassword}/>}
        </>
    );
};

export default LoginForm;
