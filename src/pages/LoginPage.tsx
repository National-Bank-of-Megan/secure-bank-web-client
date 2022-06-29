import { Box, Typography } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
    return (
        <Box>
            <Typography variant="h3" textAlign="center" color="primary">Login in</Typography>
            <LoginForm />  
        </Box>
    );
}

export default LoginPage;