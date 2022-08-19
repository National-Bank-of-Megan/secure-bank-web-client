import History from "../components/history/History";
import React, {useContext, useLayoutEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import ContainerContext from "../store/container-context";

const HistoryPage = () => {
    const [currentlyBrowsing, setCurrentlyBrowsing] = useState('transfers');

    const handleBrowsingChange = (event: React.SyntheticEvent, newCurrent: string) => {
        setCurrentlyBrowsing(newCurrent);
    };
    // @ts-ignore
    const {setHasContainer}: boolean = useContext(ContainerContext);

    // componentWillMount
    useLayoutEffect(() => {
        setHasContainer(false);

    }, []);

    // componentWillUnmount
    useLayoutEffect(() => {
       return ()=>{ setHasContainer(true);}

    }, []);


    return (
        <Grid sx={{height :'100%'}}>
            <History currentlyBrowsing={currentlyBrowsing} handleBrowsingChange={handleBrowsingChange}/>
        </Grid>)

}
export default HistoryPage;
