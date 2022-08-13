import Spinner from "../components/common/Spinner";
import AlertSnackBar, {AlertState} from "../components/notifications/AlertSnackBar";
import React, {useState} from "react";
import ChangePasswordForm from "../components/account/ChangePasswordForm";

const ChangePasswordPage = () => {
    const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });

    return (
        <>
            <Spinner isLoading={isChangingPassword} />
            <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                           severity="error" />
            <ChangePasswordForm setErrorAlertState={setErrorAlertState} setIsChangingPassword={setIsChangingPassword} />
        </>
    );
}

export default ChangePasswordPage;