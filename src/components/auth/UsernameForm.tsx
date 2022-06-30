import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const UsernameForm: React.FC<{ toggleForms: () => void }> = (props) => {
    
  const handleNextClick = () => {
    props.toggleForms();
  };

  return (
    <Box
      sx={{
        width: "450px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px",
      }}
    >
      <Paper
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Stack
          alignItems="center"
          sx={{
            padding: "30px",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            color="primary"
            marginBottom="10px"
          >
            Log in
          </Typography>
          <TextField
            label="Username"
            size="small"
            variant="standard"
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              width: "200px",
              marginTop: "40px",
            }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UsernameForm;
