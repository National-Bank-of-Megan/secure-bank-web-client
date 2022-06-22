import Navbar from "./Navbar";

export default function Layout(props :any) {
    return (
        <div className="vh-100">

            <Navbar/>
            <main
                // style={{
                //     height: "100vh",
                //     width: "100%",
                //     justifyContent: "center",
                // }}
            >
                {props.children}
            </main>
        </div>

    );
}
