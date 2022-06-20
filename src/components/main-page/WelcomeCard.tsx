import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import buttonStyles from "../../styles/ButtonStyles";
import cardStyles from "../../styles/CardStyles";

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const card = (
    <React.Fragment >
      <CardContent sx={{
        margin:'auto'
      }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
         National Bank of Megan
        </Typography>
        <Typography variant="h5" component="div" color="text.primary">
            We have your money and there’s nothing you can do about it.
        </Typography>


        <Typography variant="h4" component="div" color="text.primary">
           Join us !!!
        </Typography>

        <Button size="large" sx={buttonStyles} variant="outlined" style={{width:'100%'}}>Sign up</Button>
      </CardContent>
    </React.Fragment>
  );
  
  export default function WelcomeCard(){
    return (
      <Box sx={{
          maxWidth: 750,
          minHeight:160,
          margin:'auto'
      }}>
        <Card variant="outlined" sx={cardStyles}
              style={{
                  border :'none'
              }} >{card}</Card>
      </Box>
    );
}