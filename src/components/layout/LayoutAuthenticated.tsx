import NavbarAuthenticated from './NavbarAuthenticated'
export default function LayoutAuthenticated(props :any) {
    return(
        <div className="vh-100">

        <NavbarAuthenticated/>
        <main
            style={{
                padding: '70px 200px'
            }}
        >
            {props.children}
        </main>
    </div>

    )
};
