import {Divider, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {FavoriteReceiverResponse} from "./TotalBalanceContent";
import {Dispatch, SetStateAction} from "react";

const FriendAccount: React.FC<{
    favoriteTransfer: FavoriteReceiverResponse;
    writeAccountNumber: Dispatch<SetStateAction<string>>;
}> = (props) => {

    const handleWriteAccountNumber = () => {
        console.log("Clicked!");
        props.writeAccountNumber(props.favoriteTransfer.accountNumber);
    }

    return (
        <>
            <Divider sx={{
                display: 'none',

                "&:first-child": {
                    display: 'block'
                }
            }}/>
            <ListItem key={props.favoriteTransfer.id} onClick={handleWriteAccountNumber} disablePadding>
                <ListItemButton>
                    <ListItemText primary={props.favoriteTransfer.name} secondary={props.favoriteTransfer.accountNumber}/>
                </ListItemButton>
            </ListItem>
            <Divider/>
        </>
    );
};

export default FriendAccount;
