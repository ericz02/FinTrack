import React from 'react';

const About = () => {
  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center px-5">
      <h1 className="text-4xl text-[#4a61ff] font-bold text-center mb-6">About FinArc</h1>
      
      <div className="text-center">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4">Empowering Financial Freedom</h2>
        <p className="text-gray-600 text-lg max-w-prose mx-auto">
          At FinArc, we believe managing personal finances should be simple and stress-free. Our platform provides
          comprehensive tools to track, manage, and budget your expenses, empowering you to make informed
          financial decisions. Whether you're planning for the future or just trying to make ends meet, FinArc is
          here to help you achieve your financial goals.
        </p>
        <p className="text-gray-600 text-lg mt-4 max-w-prose mx-auto">
          Our user-friendly dashboard and visual reports make it easy to see where your money goes, set spending
          goals, and track your progress. Join us and take the first step towards financial literacy and independence!
        </p>
      </div>
    </div>
  );
};

export default About;
