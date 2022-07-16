import {Divider, Stack, Typography} from "@mui/material";

const DevicesPageInformation =()=>{
    return(
        <Stack spacing={3}>
            <Typography variant="h1"  color="primary.main" >Your devices</Typography>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec ornare dolor. Aliquam ornare
                purus id metus ullamcorper, at porta nisl consequat. Ut pharetra tincidunt risus, vestibulum lacinia
                urna imperdiet vitae. In laoreet orci vitae turpis sagittis blandit. Nullam ac mattis felis. Vivamus
                hendrerit imperdiet elementum. Proin id mattis odio. Praesent cursus varius nisl a ultricies. Morbi
                nec ullamcorper mi, vel varius enim. Praesent malesuada felis lectus, quis vestibulum augue
                ullamcorper et. Donec sit amet suscipit mauris. Ut rhoncus sollicitudin lacinia.
            </p>
            <Divider sx={{backgroundColor:'primary.main'}}/>
        </Stack>
    )

}
export default  DevicesPageInformation;