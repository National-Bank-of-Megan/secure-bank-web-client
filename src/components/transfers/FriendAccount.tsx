import { MoveToInbox } from "@mui/icons-material";
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FriendAccountData from "../../models/friendAccount";

const FriendAccount: React.FC<{ friendAccount: FriendAccountData }> = (props) => {
  return (
    <>
    <Divider sx={{
        display: 'none',

        "&:first-child": {
            display: 'block'
        }
    }}/>
    <ListItem key={props.friendAccount.name} disablePadding>
      <ListItemButton>
        <ListItemText primary={props.friendAccount.name} secondary={props.friendAccount.account} />
      </ListItemButton>
    </ListItem>
    <Divider />
    </>
  );
};

export default FriendAccount;
