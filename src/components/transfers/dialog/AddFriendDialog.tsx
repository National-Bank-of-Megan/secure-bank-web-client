import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography,
} from "@mui/material";

const AddFriendDialog: React.FC<{
    openAddFriendDialog: boolean;
    setOpenAddFriendDialog: (isOpen: boolean) => void;
    setIsErrorMessageOpen: (isOpen: boolean) => void;
    setIsSuccessMessageOpen: (isOpen: boolean) => void;
}> = (props) => {
    const handleDialogClose = () => {
        props.setOpenAddFriendDialog(false);
    };

    return (
        <Dialog
            open={props.openAddFriendDialog}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
        >
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
                        Add friend
                    </Typography>
                    <DialogContent
                        sx={{
                            width: "55%",
                            padding: "65px 0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            rowGap: "15px",
                        }}
                    >
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Account number</InputLabel>
                            <Input fullWidth/>
                        </FormControl>
                        <FormControl fullWidth variant="standard">
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    position: "relative",
                                }}
                            >
                                <InputLabel>Name</InputLabel>
                                <Input
                                    fullWidth
                                />
                            </Box>
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
                            Add to contacts
                        </Button>
                    </DialogActions>
                </Box>
            </Paper>
        </Dialog>
    );
};

export default AddFriendDialog;
