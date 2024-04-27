import { Link } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const Navbar = () => {
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
      <Link to="/" className="inline-block relative">
          <span className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">Home</span>
        </Link>
        <Link to="/about" className="inline-block relative">
          <span className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">About</span>
        </Link>
      <div className="mr-10">
        <Link to="/register" className="inline-block relative mr-6">
          <span className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">Sign Up</span>
        </Link>
        <Link to="/login" className="inline-block relative">
          <span className="text-sm text-gray-800 bg-slate-400 rounded-full py-4 px-3 hover:bg-slate-500">Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
