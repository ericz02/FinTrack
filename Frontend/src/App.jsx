import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Import all pages
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import About from "./pages/About";


// Separate layout for home page
const HomeLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="flex-grow">{children}</div>
  </>
);

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Home page without sidebar */}
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />

        {/* Other pages with sidebar */}
        <Route
          path="/help"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Help />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Settings />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Dashboard />
                </div>
              </div>
            </>
          }
        />
        {/* Add routes for other pages */}
        <Route
          path="/expenses"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Expenses />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/budgets"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Budgets />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/transactions"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Transactions />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <SignUp />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Login />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/customer"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Customer />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <About />
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
