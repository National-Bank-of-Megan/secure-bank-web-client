import { Container } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout(props :any) {
    return (
        <>

            <Navbar/>
            <main
             style={{
                height: "100vh",
                padding: '70px 200px'
              }}
            >
                <Container>
                    {props.children}
                </Container>
            </main>
        </>

    );
}
