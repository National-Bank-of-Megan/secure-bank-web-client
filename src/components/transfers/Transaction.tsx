import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

const Transaction = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
        <Box>
            <Typography variant="h5">Spotify subscription</Typography>
            <Typography variant="body2" color="text.secondary">May 21, 2022</Typography>
        </Box>
        <Box sx={{
            alignSelf: 'center'
        }}>
            <Typography variant="body1" color="text.primary">-20.00 PLN</Typography>
        </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Transaction;
