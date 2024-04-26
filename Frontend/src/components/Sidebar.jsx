import { Link } from "react-router-dom";

import InboxIcon from '@mui/icons-material/Inbox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-[#4a61ff] text-neutral-100 p-20 flex flex-col justify-between h-screen">
        <div>
          <ul className="list-none">
            <li className="mb-4 hover:text-blue-200">
              <AccountBoxIcon className="mr-2"/>
              <Link to="/">Customer</Link>
            </li>
            <li className="mb-4 hover:text-blue-200">
              <InboxIcon className="mr-2"/>
              <Link to="/">Inbox</Link>
            </li>
            <li className="mb-4 hover:text-blue-200">
              <BarChartIcon className="mr-2" />
              <Link to="/">Dashboard</Link>
            </li>

            <p className="mt-8 ml-[-20px] mb-2 text-[14px] text-[#D4D4D4]">Other Information</p>
            <li className="mb-4 hover:text-blue-200">
              <LocalOfferIcon className="mr-2"/>
              <Link to="/">Pricing</Link>
            </li>
            <li className="mb-4 hover:text-blue-200">
              <HelpIcon className="mr-2"/>
              <Link to="/">Help</Link>
            </li>

            <p className="mt-8 ml-[-20px] mb-2 text-[14px] text-[#D4D4D4]">Settings</p>
            <li className="mb-4 hover:text-blue-200">
              <SettingsIcon className="mr-2"/>
              <Link to="/">Personal Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
