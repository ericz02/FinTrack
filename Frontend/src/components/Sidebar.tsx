// src/components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-[#4a61ff] text-neutral-100 flex flex-col h-screen">
      <div className="p-20 flex-grow">
        <ul className="list-none">
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <BarChartIcon className="mr-2" />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <FormatListBulletedIcon className="mr-2"/>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <ReceiptIcon className="mr-2" />
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <AccountBoxIcon className="mr-2"/>
            <Link to="/customer">Customer</Link>
          </li>

          <p className="mt-8 mb-2 text-[14px] text-[#D4D4D4]">Other Information</p>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <MonetizationOnIcon className="mr-2"/>
            <Link to="/budgets">Budgets</Link>
          </li>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <HelpIcon className="mr-2"/>
            <Link to="/help">Help</Link>
          </li>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <InfoIcon className="mr-2"/>
            <Link to="/about">About</Link>
          </li>
          <p className="mt-8 mb-2 text-[14px] text-[#D4D4D4]">Settings</p>
          <li className="mb-4 hover:text-blue-200 flex items-center">
            <SettingsIcon className="mr-2"/>
            <Link to="/settings">Personal Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
