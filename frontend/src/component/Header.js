import React, { useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import logo from '../assest/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const userData = useSelector((state) => state.user);
    const cartItemNumber = useSelector((state) => state.product.cartItem);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowMenu = () => {
        setShowMenu(preve => !preve);
    };

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logout Successfully");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
            {/** Desktop **/}
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-14'>
                        <img src={logo} className="h-full" />
                    </div>
                </Link>
                <div className="flex items-center gap-4 md:gap-7">
                    <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm..."
                            className="bg-transparent outline-none px-2 py-1"
                        />
                        <button type="submit" className="text-gray-600 px-2">
                            Tìm kiếm
                        </button>
                    </form>
                    <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                        <Link to={""}>Home</Link>
                        <Link to={"menu/66213c76fd4f86edcdfdd011"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative">
                        <Link to={"cart"}>
                            <BsCartFill />
                            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div className="text-slate-600" onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                            {userData.image ? <img src={userData.image} className="h-full w-full" /> : <HiOutlineUserCircle />}
                        </div>
                        {showMenu && (
                            <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                               <Link to={"ordercart"} className="whitespace-nowrap cursor-pointer px-2">Order Cart</Link>
                                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <>
                                        <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer px-2">New product</Link>
                                    
                                        <Link to={"productlist/66213c76fd4f86edcdfdd011"} className="whitespace-nowrap cursor-pointer px-2">Product List </Link>
                                    </>
                                )}
                                {userData.image ? (
                                    
                                    <p className="cursor-pointer text-white px-2 bg-red-500" onClick={handleLogout}>Logout({userData.firstName})</p>
                                ) : (
                                 
                                    <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">Login</Link>
                                )}
                                <nav className="text-base md:text-lg flex flex-col md:hidden">
                                    <Link to={""} className="px-2 py-1">Home</Link>
                                    <Link to={"menu/66213c76fd4f86edcdfdd011"} className="px-2 py-1">Menu</Link>
                                    <Link to={"about"} className="px-2 py-1">About</Link>
                                    <Link to={"contact"} className="px-2 py-1">Contact</Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/** Mobile **/}
        </header>
    );
};

export default Header;
