import {Box, Drawer, List, Typography} from "@mui/material";
import FriendAccount from "./FriendAccount";
import {FavoriteReceiverResponse} from "./TotalBalanceContent";
import {Dispatch, SetStateAction} from "react";

const MyContactsDrawer: React.FC<{
    friendsDrawerOpen: boolean;
    setFriendsDrawerOpen: (isOpen: boolean) => void;
    favoriteReceivers: FavoriteReceiverResponse[];
    writeAccountNumber: Dispatch<SetStateAction<string>>;
}> = (props) => {

    const toggleDrawer = () => {
        props.setFriendsDrawerOpen(!props.friendsDrawerOpen);
    };

    const friendsList = (
        <Box sx={{width: 280}} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
                {props.favoriteReceivers.map((favoriteTransfer) => (
                    <FriendAccount favoriteTransfer={favoriteTransfer} writeAccountNumber={props.writeAccountNumber}/>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            sx={{
                zIndex: "3000",
            }}
            anchor="right"
            open={props.friendsDrawerOpen}
            onClose={() => props.setFriendsDrawerOpen(false)}
        >
            <Typography variant="h4" sx={{
                padding: "16px 16px 8px",
                textAlign: "center"
            }}>Your Contacts</Typography>
            {friendsList}
        </Drawer>
    );
}

export default MyContactsDrawer;