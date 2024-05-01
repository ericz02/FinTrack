import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'; // Currently unused, remove if not needed later
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth(); // Removed login since it's not used

    const handleLogout = () => {
        logout();
        navigate('/'); // Ensures the user is redirected to the homepage after logout
    };

    return (
        <div className="flex justify-between items-center text-[25px] pt-5 pb-5 bg-[#E5E5E5]">
            <div className="ml-10">
                <Link to="/" className="flex items-center">
                    <QueryStatsIcon />
                    <div className="text-[#4a61ff]">
                        <strong className="ml-3">Fin</strong>Arc
                    </div>
                </Link>
            </div>
            <div className="mr-10">
                {user ? (
                    <>
                        <span className="inline-block relative mr-6">{user.name}</span>
                        <button onClick={handleLogout} className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="inline-block relative mr-6">
                            <span className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">Sign Up</span>
                        </Link>
                        <Link to="/login" className="inline-block relative">
                            <span className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">Log In</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
