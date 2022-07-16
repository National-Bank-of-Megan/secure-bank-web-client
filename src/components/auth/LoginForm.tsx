import {useState} from "react";
import PasswordForm from "./PasswordForm";
import UsernameForm from "./UsernameForm";

const LoginForm = () => {
  const [usernameFormVisible, setUsernameFormVisible] = useState(true);
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);

  const toggleFormsVisibility = () => {
    setUsernameFormVisible(!usernameFormVisible);
    setPasswordFormVisible(!passwordFormVisible);
  }

  return (
    <>
      {usernameFormVisible && <UsernameForm toggleForms={toggleFormsVisibility} />}
      {passwordFormVisible && <PasswordForm toggleForms={toggleFormsVisibility} />}
    </>
  );
};

export default LoginForm;
