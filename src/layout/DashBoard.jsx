import { FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const DashBoard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
 
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center ">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[grey]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full  text-base-content">
                    {
                        isAdmin  ? <>
                        <li><NavLink to='/dashboard/adminhome'>Admin Home</NavLink></li>
                        <li><NavLink to='/dashboard/additem'>Add item</NavLink></li>
                        <li><NavLink to='/dashboard/manageitem'>Manage item
                        </NavLink></li>
                        <li><NavLink to='/dashboard/booking'>Manage booking</NavLink></li>
                        <li><NavLink to='/dashboard/alluser'>All user</NavLink></li>
                        
                        </> : 
                        <>
                        
                        <li><NavLink to='/dashboard/userhome'>User Home</NavLink></li>
                        <li><NavLink to='/dashboard/reservation'>Reservation</NavLink></li>
                        <li><NavLink to='/dashboard/mycart'>My cart
                            <button className="btn">
                                <FaShoppingCart />
                                <div className="badge">+{cart?.length || 0}</div>
                            </button>
                        </NavLink></li>
                        <li><NavLink to='/dashboard/payment'>Payment History</NavLink></li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/menu">Menu</NavLink></li>
                    <li><NavLink to="/order/salad">Order</NavLink></li>
                    <li><NavLink to="/secret">Secret</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default DashBoard;