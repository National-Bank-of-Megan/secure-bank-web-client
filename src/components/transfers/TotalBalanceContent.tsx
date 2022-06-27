import {
  Add,
  ArrowForward,
  Cached,
  Favorite,
  MoveToInbox,
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
  Divider,
  Drawer,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import FriendAccountData from "../../models/friendAccount";
import buttonStyles from "../../styles/ButtonStyles";
import FriendAccount from "./FriendAccount";
import MyContactsDrawer from "./MyContactsDrawer";
import TransferDialog from "./dialog/TransferDialog";
import AddMoneyDialog from "./dialog/AddMoneyDialog";
import AddFriendDialog from "./dialog/AddFriendDialog";

export const currencies = [
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

const TotalBalanceContent = () => {
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [openAddMoneyDialog, setOpenAddMoneyDialog] = useState(false);
  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);

  const [currency, setCurrency] = useState("EUR");
  
  const handleTransferDialogOpen = () => {
    setOpenTransferDialog(true);
  };

  const handleAddMoneyDialogOpen = () => {
    setOpenAddMoneyDialog(true);
  };

  const handleAddFriendDialogOpen = () => {
    setOpenAddFriendDialog(true);
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
          <InputLabel>Select subaccount</InputLabel>
          <Select value="age" label="Age">
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
              onClick={handleAddMoneyDialogOpen}
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
              onClick={handleTransferDialogOpen}
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
              onClick={handleAddFriendDialogOpen}
            >
              <Favorite sx={{ mr: 1 }} />
              Add Friend
            </Fab>
          </Box>
        </Box>
      </Box>

      <TransferDialog
        openTransferDialog={openTransferDialog}
        setOpenTransferDialog={setOpenTransferDialog}
        currency={currency}
        setCurrency={setCurrency}
      />
      <AddMoneyDialog
        openAddMoneyDialog={openAddMoneyDialog}
        setOpenAddMoneyDialog={setOpenAddMoneyDialog}
        currency={currency}
        setCurrency={setCurrency}
      />
      <AddFriendDialog
        openAddFriendDialog={openAddFriendDialog}
        setOpenAddFriendDialog={setOpenAddFriendDialog}
      />
    </>
  );
};

export default TotalBalanceContent;
