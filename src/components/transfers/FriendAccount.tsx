import {Divider, ListItem, ListItemButton, ListItemText} from "@mui/material";
import FriendAccountData from "../../models/friendAccount";
import {FavoriteReceiverResponse} from "./TotalBalanceContent";

const FriendAccount: React.FC<{ favoriteTransfer: FavoriteReceiverResponse }> = (props) => {
    return (
        <>
            <Divider sx={{
                display: 'none',

                "&:first-child": {
                    display: 'block'
                }
            }}/>
            <ListItem key={props.favoriteTransfer.id} disablePadding>
                <ListItemButton>
                    <ListItemText primary={props.favoriteTransfer.name} secondary={props.favoriteTransfer.accountNumber}/>
                </ListItemButton>
            </ListItem>
            <Divider/>
        </>
    );
};

export default FriendAccount;
