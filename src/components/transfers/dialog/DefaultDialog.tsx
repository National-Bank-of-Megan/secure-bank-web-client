import {Box, Dialog, DialogContent, Paper, Typography} from "@mui/material";

const DefaultDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
}> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
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
            {props.title}
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
            {props.children}
          </DialogContent>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default DefaultDialog;
