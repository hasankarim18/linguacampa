import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashLayout from "../Layout/DashBoard/DashLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/Error/ErrorPage";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import AdminHome from "../Layout/DashBoard/DashPages/DashHome/AdminHome";
import StudentsHome from "../Layout/DashBoard/DashPages/DashHome/StudentsHome";
import InstructorHome from "../Layout/DashBoard/DashPages/DashHome/InstructorHome";
import Login from "../Pages/Register/Login";
import SignUp from "../Pages/Register/SignUp";
import PivateRoute from "./PivateRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
// import RegisterRoute from "./RegisterRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PivateRoute>
        <DashLayout />
      </PivateRoute>
    ),
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "instructorHome",
        element: (
          <InstructorRoute>
            {" "}
            <InstructorHome />{" "}
          </InstructorRoute>
        ),
      },
      {
        path: "studentHome",
        element: (
          <StudentRoute>
            <StudentsHome />
          </StudentRoute>
        ),
      },
    ],
  },
]);


export default router