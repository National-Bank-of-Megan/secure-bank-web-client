import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import {currencies} from "../TotalBalanceContent";

const AddMoneyDialog: React.FC<{
  openAddMoneyDialog: boolean;
  setOpenAddMoneyDialog: (isOpen: boolean) => void;
  currency: string;
  setCurrency: (currency: string) => void; }> = (props) => {

  const handleDialogClose = () => {
    props.setOpenAddMoneyDialog(false);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setCurrency(event.target.value);
  };

  return (
    <Dialog
      open={props.openAddMoneyDialog}
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
            Add Money
          </Typography>
          <DialogContent
            sx={{
              width: "55%",
              padding: "65px 5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              rowGap: "15px",
            }}
          >
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
                  value={props.currency}
                  onChange={handleCurrencyChange}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    position: "absolute",
                    width: "11.5%",
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
                Currency balance after money load: 320,84 $
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "12px",
                }}
              >
                Total balance after money load: 15.253,51 PLN
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
              Add money
            </Button>
          </DialogActions>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default AddMoneyDialog;
