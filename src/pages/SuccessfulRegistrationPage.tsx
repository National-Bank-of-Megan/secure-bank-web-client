import {useLocation, useNavigate} from "react-router-dom";
import RegistrationSuccess from "../components/registration/RegistrationSuccess";
import {SuccessfulRegistration} from "../components/registration/IdentificationForm";
import {useEffect} from "react";


const SuccessfulRegistrationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const registrationData = location.state as SuccessfulRegistration;

    useEffect(() => {
        if (!registrationData) {
            console.log('gówno')
            navigate('/', { replace: true });
        }
    }, [])

    return (
        <>
            {registrationData && <RegistrationSuccess registrationResponseData={registrationData} />}
        </>
    );
}

export default SuccessfulRegistrationPage;