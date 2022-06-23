import {
    Avatar,
  Box,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import cardStyles from "../../styles/CardStyles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import exchangeCurrencyCardStyles from "../../styles/exchangeCurrencyCardStyles";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function CurrencyExchangeForm() {
  const [age, setAge] = React.useState("PLN");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const exchangeCard = ()=>{
      return (
        <Card sx={exchangeCurrencyCardStyles}>

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl fullWidth variant="standard">
              <Select
                sx={{
                  fontSize: "34px",
                }}
                size="medium"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={"PLN"}>PLN</MenuItem>
                <MenuItem value={"CHF"}>CHF</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "20px" }}
            >
              May 21, 2022
            </Typography>
          </Box>
          <Stack
            sx={{
              direction: "column",
              justifyContent: "center",
              backgroundColor: "violet",
            }}
          >
            <TextField
              id="standard-basic"
              variant="standard"
              type="number"
              defaultValue="13.98"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+</InputAdornment>
                ),
                disableUnderline: true,
                style: { fontSize: 40 },
              }}
            />
          </Stack>
        </CardContent>
      </Card>
      )
  }

  return (
    <>
    <Box gap={2} sx={{display:'flex', flexDirection:'column', backgroundColor:'blue'}}>
     {exchangeCard()}
    <Avatar  sx={{ bgcolor: "background.paper" }}>
        <ArrowDownwardIcon sx={{ color: "primary.main"}}/>
    </Avatar> 
    {exchangeCard()}
    </Box>
    </>
  );
}
