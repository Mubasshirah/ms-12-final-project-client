import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [isAdmin] = useAdmin()

  const [cart] = useCart();


  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }
  return (
    <div className="navbar bg-black bg-opacity-30 text-white fixed z-10 max-w-screen-xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact text-black dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/order/salad">Order</Link></li>
            {
              user ?
                <>
                  <button onClick={handleLogOut} className="btn btn-ghost">Log out</button></>
                :
                <>

                  <li><Link to="/login">Login</Link></li>
                </>
            }
            <li><Link to="/register">Register</Link></li>

          </ul>
        </div>
        <a className="btn btn-ghost normal-case ">
          <p className="text-xl block">BISTRO BOSS</p>

        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/order/salad">Order</Link></li>
          {
            isAdmin ?
              <li><Link to="/dashboard/adminhome">Dashboard</Link></li>
              :

              <li><Link to= "/dashboard/userhome">Dashboard</Link></li>
          }

         


      <li><Link to="/dashboard/mycart">
        <button className="btn">
          <FaShoppingCart />
          <div className="badge">+{cart?.length || 0}</div>
        </button>
      </Link></li>









      {
        user ?
          <>
            <button onClick={handleLogOut} className="btn btn-ghost">Log out</button></>
          :
          <>

            <li><Link to="/login">Login</Link></li>
          </>
      }
      <li><Link to="/register">Register</Link></li>
    </ul>
      </div >
  <div className="navbar-end">
    <a className="btn">Get started</a>
  </div>
    </div >
  );
};

export default Navbar;