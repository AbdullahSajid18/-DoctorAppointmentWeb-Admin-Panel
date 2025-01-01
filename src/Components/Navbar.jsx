import { useNavigate } from 'react-router-dom';
import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    adminToken && setAdminToken('');
    adminToken && localStorage.removeItem('adminToken');
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b sm:px-10">
      <div className="flex items-center gap-2 text-xs">
        <img className="cursor-pointer w-36" src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{adminToken ? "Admin" : "Doctor"} </p>
      </div>
      <button onClick={logout} className='px-10 py-2 text-sm text-white rounded-full bg-primary '>Logout</button>
    </div>
  );
};

export default Navbar;
