import { People } from "@mui/icons-material";
import { Dialog, Paper, Box, Typography, DialogContent, FormControl, InputLabel, Input, InputAdornment, IconButton, DialogActions, Button } from "@mui/material";
import { useState } from "react";

const TransferDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
    );
}

export default TransferDialog;