import {ArrowDropDown} from "@mui/icons-material";
import {
    Paper,
    Tabs,
    Tab,
    Box,
    FormControl,
    OutlinedInput,
    Button, TabsActions,
} from "@mui/material";
import React from "react";
import {jsx} from "@emotion/react";


//todo poprawic typ handleBrowsingChange
const HistoryNavigation: React.FC<{ currentlyBrowsing: string, handleBrowsingChange: any }> = ({currentlyBrowsing, handleBrowsingChange}) => {


    return (
        <>
            <Paper sx={{bgcolor: "background.paper"}}>
                <Tabs
                    value={currentlyBrowsing}
                    onChange={handleBrowsingChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="inherit"
                >
                    <Tab label="Transfers" value={'transfers'}/>
                    <Tab label="Exchanges" value={'exchanges'}/>
                </Tabs>
            </Paper>

            <Box
                sx={{
                    display: "flex",
                    margin: "50px 0 35px 0",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                <FormControl
                    variant="outlined"
                    sx={{
                        width: "50%",
                    }}
                >
                    <OutlinedInput placeholder="Search..."/>
                </FormControl>
                <Button
                    variant="contained"
                    endIcon={<ArrowDropDown sx={{transform: "scale(1.5)"}}/>}
                    sx={{
                        width: "130px",
                        height: "40px",
                    }}
                >
                    Date
                </Button>
            </Box>
        </>
    );
};

export default HistoryNavigation;
