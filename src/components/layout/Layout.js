import Navbar from "./Navbar";

export default function Layout(props){
    return(
        <div className='vh-100'>
            <Navbar/>
            <main>{props.children}</main>

        </div>
    )
}