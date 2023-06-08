import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

const MainLayout = () => {
    return (
        <div className="bg-white text-darkNavyBlue dark:text-white dark:bg-darkNavyBlue" >
            <Header />              
                <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;