import {Box, Drawer, List, Typography} from "@mui/material";
import FriendAccountData from "../../models/friendAccount";
import FriendAccount from "./FriendAccount";

const friends = [
    new FriendAccountData("Kaczor Donald", "14 1234 5678 1234 4567"),
    new FriendAccountData("Michał Wójcik", "14 1234 5678 1234 4567"),
    new FriendAccountData("Katarzyna Grygorowicz", "14 1234 5678 1234 4567"),
    new FriendAccountData("Kolega", "14 1234 5678 1234 4567"),
];

const MyContactsDrawer: React.FC<{ friendsDrawerOpen: boolean, setFriendsDrawerOpen: (isOpen: boolean) => void }> = (props) => {

    const toggleDrawer = () => {
        props.setFriendsDrawerOpen(!props.friendsDrawerOpen);
    };

    const friendsList = (
        <Box sx={{width: 280}} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
                {friends.map((friend) => (
                    <FriendAccount friendAccount={friend}/>
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