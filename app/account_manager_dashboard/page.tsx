"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AccountManagerDashboard() {
  const [managers, setManagers] = useState([]);
  const [payments, setPayments] = useState([]);

  // Fetch Account Managers and Payments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const managerResponse = await axios.get(
          "http://localhost:3000/account_manager"
        );
        setManagers(managerResponse.data);

        const paymentResponse = await axios.get(
          "http://localhost:3000/payment"
        );
        setPayments(paymentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /** -------------------- CRUD Operations -------------------- **/

  const addManager = async (manager) => {
    try {
      await axios.post("http://localhost:3000/account_manager", manager);
      Swal.fire("Success", "Account Manager added successfully!", "success");
      setManagers([...managers, manager]);
    } catch (error) {
      console.error("Error adding account manager:", error);
      Swal.fire("Error", "Failed to add account manager.", "error");
    }
  };

  const updateManager = async (managerId, currentManager) => {
    try {
      const result = await Swal.fire({
        title: "Update Account Manager",
        html: `
          <input id="first_name" class="swal2-input" placeholder="First Name" value="${currentManager.FIRST_NAME}">
          <input id="last_name" class="swal2-input" placeholder="Last Name" value="${currentManager.LAST_NAME}">
          <input id="email" class="swal2-input" placeholder="Email" value="${currentManager.EMAIL}">
          <input id="role" class="swal2-input" placeholder="Role" value="${currentManager.ROLE}">
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        preConfirm: () => {
          const first_name = document.getElementById("first_name").value;
          const last_name = document.getElementById("last_name").value;
          const email = document.getElementById("email").value;
          const role = document.getElementById("role").value;
          return { first_name, last_name, email, role };
        },
      });

      if (result.isConfirmed) {
        await axios.put(
          `http://localhost:3000/account_manager/${managerId}`,
          result.value
        );
        Swal.fire(
          "Success",
          "Account Manager updated successfully!",
          "success"
        );
        setManagers((prev) =>
          prev.map((manager) =>
            manager.MANAGER_ID === managerId
              ? { ...manager, ...result.value }
              : manager
          )
        );
      }
    } catch (error) {
      console.error("Error updating account manager:", error);
      Swal.fire("Error", "Failed to update account manager.", "error");
    }
  };

  const deleteManager = async (managerId) => {
    try {
      await axios.delete(`http://localhost:3000/account_manager/${managerId}`);
      Swal.fire("Success", "Account Manager deleted successfully!", "success");
      setManagers((prev) => prev.filter((m) => m.MANAGER_ID !== managerId));
    } catch (error) {
      console.error("Error deleting account manager:", error);
      Swal.fire("Error", "Failed to delete account manager.", "error");
    }
  };

  const deletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:3000/payment/${paymentId}`);
      Swal.fire("Success", "Payment deleted successfully!", "success");
      setPayments((prev) => prev.filter((p) => p.PAYMENT_ID !== paymentId));
    } catch (error) {
      console.error("Error deleting payment:", error);
      Swal.fire("Error", "Failed to delete payment.", "error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Account Manager Dashboard
      </h1>

      {/* Account Manager Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Account Managers</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.MANAGER_ID}>
                <td className="border border-gray-300 px-4 py-2">
                  {manager.FIRST_NAME} {manager.LAST_NAME}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {manager.EMAIL}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {manager.ROLE}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => updateManager(manager.MANAGER_ID, manager)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteManager(manager.MANAGER_ID)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Payments</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              <th className="border border-gray-300 px-4 py-2">Method</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.PAYMENT_ID}>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.PAYMENT_ID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.PAYMENT_METHOD}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.TRANSACTION_STATUS}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.PAYMENT_AMOUNT || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deletePayment(payment.PAYMENT_ID)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
