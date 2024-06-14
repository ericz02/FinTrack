import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

interface Debt {
  id: string;
  amount: string;
  creditor: string;
  debtor: string;
}

const Debts: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const { user } = useAuth();
  const userId = user?.id;

  const [newDebt, setNewDebt] = useState<Debt>({
    amount: "",
    creditor: "",
    debtor: "",
    id: ""
  });

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const response = await axios.get<Debt[]>(`http://localhost:3000/users/${userId}/debts`);
        setDebts(response.data);
      } catch (error) {
        console.error("Error fetching debts:", error);
        toast.error("Failed to fetch debts");
      }
    };

    fetchDebts();
  }, [userId]);

  const addDebt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<Debt>(`http://localhost:3000/users/${userId}/debts`, { debt: newDebt });
      setDebts([...debts, response.data]);
      setNewDebt({ amount: "", creditor: "", debtor: "", id: "" });
      toast.success("Debt added successfully!");
    } catch (error) {
      console.error("Failed to add debt:", error.response);
      toast.error("Failed to add debt");
    }
  };

  const deleteDebt = async (debtId: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}/debts/${debtId}`);
      setDebts(debts.filter(debt => debt.id !== debtId));
      toast.success("Debt deleted successfully!");
    } catch (error) {
      console.error("Failed to delete debt:", error);
      toast.error("Failed to delete debt");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDebt(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">Debt Management</h2>
      <div className="flex justify-center">
        <form onSubmit={addDebt} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input type="number" name="amount" value={newDebt.amount} onChange={handleChange} placeholder="Amount" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="creditor">
                Creditor
              </label>
              <input type="text" name="creditor" value={newDebt.creditor} onChange={handleChange} placeholder="Creditor" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="debtor">
                Debtor
              </label>
              <input type="text" name="debtor" value={newDebt.debtor} onChange={handleChange} placeholder="Debtor" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            <div className="w-full px-3 mt-6">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Add Debt
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {debts.map(debt => (
            <div key={debt.id} className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <h3 className="text-lg text-gray-900 font-semibold">${debt.amount}</h3>
              <p className="text-gray-600"><strong>Creditor:</strong> {debt.creditor}</p>
              <p className="text-gray-600"><strong>Debtor:</strong> {debt.debtor}</p>
              <button onClick={() => deleteDebt(debt.id)} className="text-red-500 hover:text-red-700 font-bold py-1 px-3 rounded">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Debts;
