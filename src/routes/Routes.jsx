
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/order/Order";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoute from "./PrivateRoute";
import Secret from "../shared/Secret";
import DashBoard from "../layout/DashBoard";
import MyCart from "../pages/dashboard/MyCart";
import AllUser from "../pages/dashboard/AllUser";

import AddItem from "../pages/dashboard/AddItem";
import AdminRoute from "./AdminRoute";
import Manageitem from "../pages/dashboard/Manageitem";
import Payment from "../pages/dashboard/Payment";
import UserHome from "../pages/dashboard/UserHome";
import AdminHome from "../pages/dashboard/AdminHome";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/menu",
          element:<Menu></Menu>
        },
        {
          path:"/order",
          element:<Order></Order>
        },
        {
          path:"/order/:category",
          element:<Order></Order>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/secret",
          element:<PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children:[
        {
          path:'mycart',
          element:<MyCart></MyCart>
        },
        {
          path:'userhome',
          element:<UserHome></UserHome>
        },
        {
          path:'adminhome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:'alluser',
          element:<AdminRoute><AllUser></AllUser></AdminRoute>
        },
        {
          path:'additem',
          element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path:'manageitem',
          element:<AdminRoute><Manageitem></Manageitem></AdminRoute>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        }
      ]
    }
  ]);