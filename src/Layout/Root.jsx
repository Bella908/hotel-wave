import { Outlet } from "react-router-dom";
import Navbar from "../Home/Home/Navbar";
import Footer from "../Home/Footer";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;