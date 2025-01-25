"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function DeveloperDashboard() {
  const [developers, setDevelopers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [accountManagers, setAccountManagers] = useState([]);

  // Fetch Developers, Admins, Customers, and Account Managers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const developerResponse = await axios.get(
          "http://localhost:3000/developer"
        );
        setDevelopers(developerResponse.data);

        const adminResponse = await axios.get("http://localhost:3000/admin");
        setAdmins(adminResponse.data);

        const customerResponse = await axios.get(
          "http://localhost:3000/customer"
        );
        setCustomers(customerResponse.data);

        const managerResponse = await axios.get(
          "http://localhost:3000/account_manager"
        );
        setAccountManagers(managerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /** -------------------- CRUD Operations for Developers -------------------- **/

  const deleteDeveloper = async (developerId) => {
    try {
      await axios.delete(`http://localhost:3000/developer/${developerId}`);
      Swal.fire("Success", "Developer deleted successfully!", "success");
      setDevelopers((prev) =>
        prev.filter((dev) => dev.DEVELOPER_ID !== developerId)
      );
    } catch (error) {
      console.error("Error deleting developer:", error);
      Swal.fire("Error", "Failed to delete developer.", "error");
    }
  };

  const updateDeveloper = async (developerId, updatedDeveloper) => {
    try {
      await axios.put(
        `http://localhost:3000/developer/${developerId}`,
        updatedDeveloper
      );
      Swal.fire("Success", "Developer updated successfully!", "success");
      setDevelopers((prev) =>
        prev.map((dev) =>
          dev.DEVELOPER_ID === developerId
            ? { ...dev, ...updatedDeveloper }
            : dev
        )
      );
    } catch (error) {
      console.error("Error updating developer:", error);
      Swal.fire("Error", "Failed to update developer.", "error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Developer Dashboard
      </h1>

      {/* Developer Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Developer Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Assigned Project
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {developers.map((dev) => (
              <tr key={dev.DEVELOPER_ID}>
                <td className="border border-gray-300 px-4 py-2">
                  {dev.FIRST_NAME} {dev.LAST_NAME}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dev.EMAIL}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dev.ASSIGNED_PROJECT}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Update Developer",
                        html: `
                          <input id="first_name" type="text" value="${dev.FIRST_NAME}" class="swal2-input" placeholder="First Name">
                          <input id="last_name" type="text" value="${dev.LAST_NAME}" class="swal2-input" placeholder="Last Name">
                          <input id="email" type="email" value="${dev.EMAIL}" class="swal2-input" placeholder="Email">
                          <input id="assigned_project" type="text" value="${dev.ASSIGNED_PROJECT}" class="swal2-input" placeholder="Assigned Project">
                        `,
                        showCancelButton: true,
                        confirmButtonText: "Update",
                        preConfirm: () => {
                          const first_name =
                            document.getElementById("first_name").value;
                          const last_name =
                            document.getElementById("last_name").value;
                          const email = document.getElementById("email").value;
                          const assigned_project =
                            document.getElementById("assigned_project").value;

                          if (
                            !first_name ||
                            !last_name ||
                            !email ||
                            !assigned_project
                          ) {
                            Swal.showValidationMessage(
                              "All fields are required!"
                            );
                          }

                          return {
                            first_name,
                            last_name,
                            email,
                            assigned_project,
                          };
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          updateDeveloper(dev.DEVELOPER_ID, result.value);
                        }
                      });
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteDeveloper(dev.DEVELOPER_ID)}
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

      {/* Admin, Customer, and Account Manager Tables */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">View All Users</h2>

        {/* Admin Table */}
        <h3 className="text-lg font-semibold mb-2">Admins</h3>
        <table className="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.ADMIN_ID}>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.FIRST_NAME} {admin.LAST_NAME}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.PHONE_NUMBER}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.EMAIL}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.ROLE}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Customer and Account Manager Tables... */}

        {/* Customer Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.CUSTOMER_ID}>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer.FIRST_NAME} {customer.LAST_NAME}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer.PHONE_NUMBER}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer.EMAIL}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer.ADDRESS}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Account Manager Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Account Manager Management
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {accountManagers.map((manager) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
