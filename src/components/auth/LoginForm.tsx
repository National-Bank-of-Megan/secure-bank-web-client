import React, {useEffect, useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm from "./UsernameForm";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {useLocation} from "react-router-dom";

const LoginForm = () => {
    const [loginBasicData, setLoginBasicData] = useState<PasswordCombinationType | null>(null);
    const [usernameFormVisible, setUsernameFormVisible] = useState(true);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);
    const [clientId, setClientId] = useState<string>('');
    const [infoAlertState, setInfoAlertState] = useState<AlertState>({
        isOpen: false,
        message: ""
    });

    const location = useLocation();

    useEffect(() => {
        const sessionExpiredInfoAlertState = location.state as AlertState;
        if (sessionExpiredInfoAlertState) {
            setInfoAlertState(sessionExpiredInfoAlertState);
        }
    }, [location.state]);

    const toggleFormsVisibility = () => {
        setUsernameFormVisible(!usernameFormVisible);
        setPasswordFormVisible(!passwordFormVisible);
    }

    return (
        <>
            <AlertSnackBar severity={"info"}
                           alertState={{"state": infoAlertState, "setState": setInfoAlertState}} />
            {usernameFormVisible &&
                <UsernameForm toggleForms={toggleFormsVisibility} setLoginBasicData={setLoginBasicData}
                              savedClientIdState={{"state": clientId, "setState": setClientId}}
                />}
            {passwordFormVisible && <PasswordForm data={loginBasicData} toggleForms={toggleFormsVisibility}/>}
        </>
    );
};

export default LoginForm;
