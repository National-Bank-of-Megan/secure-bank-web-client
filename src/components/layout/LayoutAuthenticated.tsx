import NavbarAuthenticated from './NavbarAuthenticated'
export default function LayoutAuthenticated(props :any) {
    return(
        <div className="vh-100">

        <NavbarAuthenticated/>
        <main
            style={{
                height: "100vh",
                width: "100%",
                justifyContent: "center",
            }}
        >
            {props.children}
        </main>
    </div>

    )
};
