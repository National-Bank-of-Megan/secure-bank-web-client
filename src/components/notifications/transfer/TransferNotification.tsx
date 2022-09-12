import { CompareArrows } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TransferNotificationClass from "../../../models/TransferNotificationClass";

const TransferNotification: React.FC<{
  transferData: TransferNotificationClass;
  wasViewed: boolean;
}> = ({ transferData, wasViewed }) => {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "30px",
      }}
    >
      <CompareArrows sx={{ color: wasViewed ? "" : "red" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>{transferData.title}</Typography>
        <Typography>
          {transferData.senderFirstname + " " + transferData.senderLastname}{" "}
          just ordered transfer for you. Transfered amount:{" "}
        </Typography>
        <Typography>
          {transferData.currency + " " + transferData.amount.toFixed(2)}
        </Typography>
       <Typography
          color="text.secondary"
          sx={{
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
         {"Arraving on " +
            transferData.arrivalDate.toLocaleDateString("en-us", {
              year: "numeric",
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
            })}
        </Typography>
      </Box>
    </Box>
  );
};

export default TransferNotification;
