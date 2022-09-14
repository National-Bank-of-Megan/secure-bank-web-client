import { CompareArrows } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AnyIfEmpty } from "react-redux";
import TransferNotificationClass from "../../../models/TransferNotificationClass";
import { notificationType } from "../../layout/Navbar";

const TransferNotification: React.FC<{
  transferData: notificationType;
  decrementNotificationCounter: () => void;
}> = ({ transferData, decrementNotificationCounter }) => {
  let data = transferData.contents as TransferNotificationClass;
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "30px",
        alignItems: "center",
        width: "100%",
      }}
      onClick={() => {
        if(!transferData.wasViewed){
        transferData.wasViewed = true;
        decrementNotificationCounter();
        }
      }}
    >
      <CompareArrows
        sx={{ color: transferData.wasViewed ? "primary" : "primary.main" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography color="primary">{data.title}</Typography>
        <Typography>
          {data.senderFirstname +
            " " +
            data.senderLastname +
            " just ordered transfer for you."}
        </Typography>
        <Typography>
          {"Transfered amount:  " +
            data.currency +
            " " +
            data.amount.toFixed(2)}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {
            data.arrivalDate.toLocaleDateString("en-us", {
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
