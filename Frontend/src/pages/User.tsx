import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

interface UserData {
  name: string;
  email: string;
  address?: string;
  phone_number?: string;
  gender?: string;
}

interface UserProps {
  userId: string | undefined;
}

const User: React.FC<UserProps> = ({ userId, }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(`http://localhost:3000/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">User Information</h2>
      {userData && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg text-gray-900 font-semibold">Name: {userData.name}</h3>
          <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
          {userData.address && (
            <p className="text-gray-600"><strong>Address:</strong> {userData.address}</p>
          )}
          {userData.phone_number && (
            <p className="text-gray-600"><strong>Phone Number:</strong> {userData.phone_number}</p>
          )}
          {userData.gender && (
            <p className="text-gray-600"><strong>Gender:</strong> {userData.gender}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
