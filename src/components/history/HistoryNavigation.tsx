import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
} from "@mui/material";
import React from "react";
import {UseStateType} from "../../models/custom-types/UseStateType";

const sortingTypes: string[] = [
    'None', 'Newest to oldest', 'Oldest to newest'
]


//todo poprawic typ handleBrowsingChange
const HistoryNavigation: React.FC<{ currentlyBrowsing: string, handleBrowsingChange: any, state: UseStateType<string> }> = ({
                                                                                                                                currentlyBrowsing,
                                                                                                                                handleBrowsingChange,
                                                                                                                                state
                                                                                                                            }) => {

    return (
        <Box>
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
                <FormControl>
                    <InputLabel id="sortBy">Sort</InputLabel>
                    <Select
                        sx={{width: '200px'}}
                        labelId="Sort by"
                        id="sortBy"
                        value={state.state}
                        onChange={(e: SelectChangeEvent) => {
                            state.setState(e.target.value)
                        }}
                    >
                        {
                            sortingTypes.map((type, index) => {
                                return <MenuItem key={index} value={type}>{type}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default HistoryNavigation;
