import Navbar from "./Navbar";
import React, {useState} from "react";
import ContainerContext from "../../store/container-context";
import {Box, Container, Grid} from "@mui/material";


export default function Layout(props: any) {


    const [hasContainer, setHasContainer] = useState(true);

    let style = {
        padding: '70px 180px 20px'
    }

    let historyStyle = {
        height : '100vh'
    }

    return (
        <>
            <Navbar/>
            <ContainerContext.Provider value={{hasContainer, setHasContainer}}>
                <main
                    style={hasContainer ? style : historyStyle}
                >

                    {props.children}

                </main>
            </ContainerContext.Provider>
        </>
    )
        ;
}
