import { Outlet } from "react-router-dom";
import DashOutLet from "./DashOutLet";
import { FaBars, FaWindowClose } from "react-icons/fa";
import DashMenu from "./DashMenu/DashMenu";
import TopNav from "../../Pages/Shared/Header/TopNav";
import { Helmet } from "react-helmet-async";



const DashLayout = () => {
    return (
      <>
        <TopNav />
        <Helmet>
          <title>Dashboard | LinguaCampa</title>
        </Helmet>
        <div className=" mx-auto">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-4 flex flex-col items-cente justify-left">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className=" text-4xl cursor-pointer  drawer-button lg:hidden"
              >
                <FaBars />
              </label>
              <DashOutLet>
                <Outlet />
              </DashOutLet>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <div className="p-4 w-80 h-full bg-darkNavyBlue text-base-content">
                <div className="my-4 w-full flex justify-end">
                  <label
                    htmlFor="my-drawer-2"
                    className=" drawer-button lg:hidden cursor-pointer text-rose-400 text-3xl"
                  >
                    <FaWindowClose />
                  </label>
                </div>
                <div>
                  <img src="/4.png" alt="" />
                </div>
                {/* dash menu */}
                <DashMenu />
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default DashLayout;