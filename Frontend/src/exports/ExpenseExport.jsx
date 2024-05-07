import axios from "axios";
import { toast } from "react-toastify";

const exportExpense = async (userId) => {
  try {
    const response = await axios({
      url: `http://localhost:3000/users/${userId}/expenses/export`,
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "Expenses.xlsx"); // Name the file
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    toast.success("Expenses exported successfully!");
  } catch (error) {
    console.error("Error downloading the file:", error);
    toast.error("Failed to download Expenses");
  }
};

export default exportExpense;
