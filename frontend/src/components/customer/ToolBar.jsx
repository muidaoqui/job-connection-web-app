import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import logo from '../../assets/logo.png';
import { SearchOutlined } from "@ant-design/icons";

function ToolBar() {
    const BASE_URL = "http://localhost:5000";
    const navigate = useNavigate();


    return (
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white flex justify-around items-center px-6 py-2 font-bold text-md h-30">
            {/* Logo */}
            <div className="flex-shrink-0">
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </Link>
            </div>
            <div className=" w-full max-w-lg">
                <div className="flex items-center rounded-full border border-blue-500 overflow-hidden">
                    <input
                        type="text"
                        placeholder="Vị trí tuyển dụng, công ty,..."
                        className="w-full px-6 h-16 focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-16">
                        <SearchOutlined style={{ fontSize: "20px" }} />
                    </button>
                </div>
            </div>

            {/* Menu */}
            <div className="hidden lg:flex items-center gap-6">
                <Link to="/domain" className="hover:text-blue-600 transition">0123456789</Link>
                <Link to="/hosting" className="hover:text-blue-600 transition">Đăng Nhập</Link>
                <Link to="/email" className="hover:text-blue-600 transition">VI | EN</Link>
            </div>
        </div>
    );
}

export default ToolBar;
