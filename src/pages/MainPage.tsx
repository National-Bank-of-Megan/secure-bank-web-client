import { Grid } from "@mui/material";
import WelcomeCard from "../components/mainpage/WelcomeCard";

export default function MainPage() {
  return (
    <Grid container
      style={{
        height: "100vh"
      }}
    >
      <WelcomeCard/>
    </Grid>
  );
}
