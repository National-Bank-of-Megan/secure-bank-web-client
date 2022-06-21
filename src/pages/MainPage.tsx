import { Grid } from "@mui/material";
import WelcomeCard from "../components/main-page/WelcomeCard";

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
