import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashLayout from "../Layout/DashBoard/DashLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/Error/ErrorPage";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import AdminHome from "../Layout/DashBoard/DashPages/AdminPages/AdminHome";
import StudentsHome from "../Layout/DashBoard/DashPages/StudentPages/StudentsHome";
import InstructorHome from "../Layout/DashBoard/DashPages/InstructorPages/InstructorHome";
import Login from "../Pages/Register/Login";
import SignUp from "../Pages/Register/SignUp";
import PivateRoute from "./PivateRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
import ManageClasses from "../Layout/DashBoard/DashPages/AdminPages/ManageClasses";
import ManageUsers from "../Layout/DashBoard/DashPages/AdminPages/ManageUsers";
import AdminProfile from "../Layout/DashBoard/DashPages/AdminPages/AdminProfile";
import AddClass from "../Layout/DashBoard/DashPages/InstructorPages/AddClass";
import MyClasses from "../Layout/DashBoard/DashPages/InstructorPages/MyClasses";
import MyClass from "../Layout/DashBoard/DashPages/InstructorPages/MyClass";
import InstructorFeedback from "../Layout/DashBoard/DashPages/InstructorPages/InstructorFeedback";
import MySelectedClass from "../Layout/DashBoard/DashPages/StudentPages/MySelectedClass";
import MyEnrolledClass from "../Layout/DashBoard/DashPages/StudentPages/MyEnrolledClass";
import Payments from "../Layout/DashBoard/DashPages/StudentPages/Payments/Payments";
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
      // admin
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            {" "}
            <ManageUsers />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            {" "}
            <AdminProfile />{" "}
          </AdminRoute>
        ),
      },
      /** instructor route below */
      {
        path: "instructorHome",
        element: (
          <InstructorRoute>
            <InstructorHome />
          </InstructorRoute>
        ),
      },
      {
        path: "instructorFeedback",
        element: (
          <InstructorRoute>
            <InstructorFeedback />
          </InstructorRoute>
        ),
      },
      {
        path: "addClass",
        element: (
          <InstructorRoute>
            {" "}
            <AddClass />{" "}
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <InstructorRoute>
            {" "}
            <MyClasses />{" "}
          </InstructorRoute>
        ),
      },
      {
        path: "myClass",
        element: (
          <InstructorRoute>
            {" "}
            <MyClass />{" "}
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
      {
        path: "mySelectedClass",
        element: (
          <StudentRoute>
            <MySelectedClass />
          </StudentRoute>
        ),
      },
      {
        path: "myEnrolledClass",
        element: (
          <StudentRoute>
            <MyEnrolledClass />
          </StudentRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payments />
          </StudentRoute>
        ),
      },
    ],
  },
]);


export default router