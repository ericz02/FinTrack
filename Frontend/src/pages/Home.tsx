import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Home: React.FC = () => {
  return (
    <div className="relative">
      <img
        src="src/assets/8524544.jpg"
        alt="home"
        className="w-full"
      />

      <div className="absolute top-[250px] left-[90px]">
        <h1 className="text-white text-[50px] font-bold">Save money, without</h1>
        <h1 className="text-white text-[50px] font-bold"> thinking about it.</h1>
        <Link to="/signup">
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
