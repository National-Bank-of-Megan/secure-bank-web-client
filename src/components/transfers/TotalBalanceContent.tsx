import {
  Add,
  ArrowForward,
  Cached,
  Favorite,
  People,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import buttonStyles from "../../styles/ButtonStyles";

const TotalBalanceContent = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h2" color="primary.main">
        Total balance
      </Typography>
      <Typography variant="h2" fontWeight="200" sx={{ mt: "10px" }}>
        15.750,89 PLN
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "380px",
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            m: 1,
            minWidth: 120,
            marginTop: "88px",
            marginBottom: "88px",
          }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Select subaccount
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value="age"
            label="Age"
          >
            <MenuItem value="$ 1200.99">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Fab
              color="primary"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <Add sx={{ mr: 1 }} />
              Add money
            </Fab>
            <Fab
              color="error"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
              onClick={handleClickOpen}
            >
              <ArrowForward sx={{ mr: 1 }} />
              Transfer
            </Fab>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Fab
              color="primary"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <Cached sx={{ mr: 1 }} />
              Exchange
            </Fab>
            <Fab
              color="success"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <Favorite sx={{ mr: 1 }} />
              Add Friend
            </Fab>
          </Box>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <Paper
          sx={{
            bgcolor: "background.paper"
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "35px 0",
            rowGap: "15px 40px"
          }}>
            <Typography variant="h2" color="primary">
              New transfer
            </Typography>
            <DialogContent sx={{
              width: '55%',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "15px"
            }}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Receiver</InputLabel>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={alert}>
                        <People />
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel>Title</InputLabel>
                <Input
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel>Receiver</InputLabel>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={alert}>
                        <People />
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" size="large" onClick={handleClose} sx={{
                margin: '30px 0',
                width: '250px'
              }}>
                Transfer money
              </Button>
            </DialogActions>
          </Box>
        </Paper>
      </Dialog>
      {/* <Input
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          /> */}
    </>
  );
};

export default TotalBalanceContent;
