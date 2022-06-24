import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransactionDetailed = () => {
  return (
    <Accordion
      disableGutters
      sx={{
        padding: "12px",
        borderRadius: "4px",

        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h5">Spotify subscription</Typography>
            <Typography variant="body2" color="text.secondary">
              May 21, 2022
            </Typography>
          </Box>
          <Box
            sx={{
              alignSelf: "center",
              marginRight: "15px",
            }}
          >
            <Typography variant="body1" color="text.primary">
              -20.00 PLN
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px"
            }}
          >
            <Typography>
              Status
            </Typography>
            <Typography>
              Amount
            </Typography>
            <Typography>
              Receiver
            </Typography>
            <Typography>
              Date
            </Typography>
            <Typography>
              Balance after transfer
            </Typography>
          </Box>
          <Box sx={{
         
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              rowGap: "20px"
            }}>
            <Typography>
              Completed
            </Typography>
            <Typography>
              -PLN 54.87
            </Typography>
            <Typography>
            14 1234 5678 1234 4567
            </Typography>
            <Typography>
            May 21, 2022
            </Typography>
            <Typography>
            PLN 1090.67
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TransactionDetailed;
