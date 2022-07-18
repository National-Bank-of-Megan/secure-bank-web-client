import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm from "./UsernameForm";

const LoginForm = () => {
    const [loginKnownDeviceData , setLoginKnownDeviceData ] = useState<Object | null>(null );
    const [usernameFormVisible, setUsernameFormVisible] = useState(true);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);

    const toggleFormsVisibility = () => {
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);
    }
    //known device
    //data = clientID, password letter combination
    const toggleToPasswordForm = (data: Object) => {
        setLoginKnownDeviceData(data);
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);

    }

    return (
        <>
            {usernameFormVisible && <UsernameForm toggleForms={toggleToPasswordForm}/>}
            {passwordFormVisible && <PasswordForm data={loginKnownDeviceData} toggleForms={toggleFormsVisibility}/>}
        </>
    );
};

export default LoginForm;
