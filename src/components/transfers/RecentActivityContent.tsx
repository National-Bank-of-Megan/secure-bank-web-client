import { Box, Typography } from "@mui/material";
import Transaction from "./Transaction";

const RecentActivityContent = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h3"
          color="primary.main"
          sx={{
            borderBottom: 1,
            borderColor: "primary.main",
            padding: "8px 0",
          }}
        >
          Recent activity
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "18px",
          // marginLeft: "205px",
          marginTop: "20px",
        }}
      >
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </Box>
    </>
  );
};

export default RecentActivityContent;
