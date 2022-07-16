import DevicesPageInformation from "../components/devices/DevicesPageInformation";
import {Grid} from "@mui/material";
import DevicesTable from "../components/devices/DevicesTable";

const DevicesPage = () => {
    return (
        <Grid container gap={5}>
           <DevicesPageInformation/>
            <DevicesTable/>

        </Grid>
    )
}

export default DevicesPage;