import { Link } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const Navbar = () => {
  return (
    <div className="text-[25px] pt-5 pb-5 bg-[#E5E5E5]">
      <div className="ml-10">

        
        <Link to="/" className="flex items-center">
          <QueryStatsIcon />
          <div className="text-[#4a61ff]">
            <strong className="ml-3">Fin</strong>Arc
          </div>
        </Link>

      </div>

    </div>
  );
};

export default Navbar;
