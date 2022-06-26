import { People } from "@mui/icons-material";
import { Dialog, Paper, Box, Typography, DialogContent, FormControl, InputLabel, Input, InputAdornment, IconButton, DialogActions, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import MyContactsDrawer from "./MyContactsDrawer";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const TransferDialog: React.FC<{ openTransferDialog: boolean, setOpenTransferDialog: (isOpen: boolean) => void }> = (props) => {
  const [friendsDrawerOpen, setFriendsDrawerOpen] = useState(false);
  const [currency, setCurrency] = useState("EUR");

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleDialogClose = () => {
    props.setOpenTransferDialog(false);
    setFriendsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setFriendsDrawerOpen(!friendsDrawerOpen);
  };

    return (
      <Dialog open={props.openTransferDialog} onClose={handleDialogClose} fullWidth maxWidth="md">
      <Paper
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "35px 0",
            rowGap: "15px 40px",
          }}
        >
          <Typography variant="h2" color="primary">
            New transfer
          </Typography>
          <DialogContent
            sx={{
              width: "55%",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              rowGap: "15px",
            }}
          >
            <FormControl fullWidth variant="standard">
              <InputLabel>Receiver</InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton id="drawerButton" onClick={toggleDrawer}>
                      <People />
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel>Title</InputLabel>
              <Input fullWidth />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  position: "relative",
                }}
              >
                <InputLabel>Amount</InputLabel>
                <Input
                  sx={{
                    width: "100%",
                  }}
                />
                <TextField
                  select
                  value={currency}
                  onChange={handleCurrencyChange}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    position: "absolute",
                    width: "7.5%",
                    right: "0%",
                    "& .MuiSelect-select:focus": {
                      background: "none",
                    },
                  }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                Currency balance after transfer: 320,84 ${" "}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "12px",
                }}
              >
                Total balance after transfer: 15.253,51 PLN
              </Typography>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="large"
              onClick={handleDialogClose}
              sx={{
                margin: "0 0 30px",
                width: "250px",
              }}
            >
              Transfer money
            </Button>
          </DialogActions>
        </Box>
        <MyContactsDrawer friendsDrawerOpen={friendsDrawerOpen} setFriendsDrawerOpen={setFriendsDrawerOpen}/>
      </Paper>
    </Dialog>
    );
}

export default TransferDialog;