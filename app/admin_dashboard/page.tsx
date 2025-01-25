"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [admins, setAdmins] = useState([]);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [payments, setPayments] = useState([]);

  // Fetch Admins, Parking Slots, and Payments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get("http://localhost:3000/admin");
        setAdmins(adminResponse.data);

        const parkingResponse = await axios.get(
          "http://localhost:3000/parking_slot"
        );
        setParkingSlots(parkingResponse.data);

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

  /** -------------------- CRUD for Admins -------------------- **/

  const updateAdmin = async (adminId, currentAdmin) => {
    try {
      const result = await Swal.fire({
        title: "Update Admin",
        html: `
          <input id="first_name" class="swal2-input" placeholder="First Name" value="${currentAdmin.FIRST_NAME}">
          <input id="last_name" class="swal2-input" placeholder="Last Name" value="${currentAdmin.LAST_NAME}">
          <input id="phone_number" class="swal2-input" placeholder="Phone Number" value="${currentAdmin.PHONE_NUMBER}">
          <input id="email" class="swal2-input" placeholder="Email" value="${currentAdmin.EMAIL}">
          <input id="role" class="swal2-input" placeholder="Role" value="${currentAdmin.ROLE}">
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        preConfirm: () => {
          const first_name = document.getElementById("first_name").value;
          const last_name = document.getElementById("last_name").value;
          const phone_number = document.getElementById("phone_number").value;
          const email = document.getElementById("email").value;
          const role = document.getElementById("role").value;
          return { first_name, last_name, phone_number, email, role };
        },
      });

      if (result.isConfirmed) {
        await axios.put(`http://localhost:3000/admin/${adminId}`, result.value);
        Swal.fire("Success", "Admin updated successfully!", "success");
        setAdmins((prev) =>
          prev.map((admin) =>
            admin.ADMIN_ID === adminId ? { ...admin, ...result.value } : admin
          )
        );
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      Swal.fire("Error", "Failed to update admin.", "error");
    }
  };

  /** -------------------- CRUD for Parking Slots -------------------- **/

  const updateParkingSlot = async (slotId, currentSlot) => {
    try {
      const result = await Swal.fire({
        title: "Update Parking Slot",
        html: `
          <input id="location" class="swal2-input" placeholder="Location" value="${currentSlot.LOCATION}">
          <input id="floor" class="swal2-input" placeholder="Floor" value="${currentSlot.FLOOR}">
          <input id="section" class="swal2-input" placeholder="Section" value="${currentSlot.SECTION}">
          <input id="slot_number" class="swal2-input" placeholder="Slot Number" value="${currentSlot.SLOT_NUMBER}">
          <input id="status" class="swal2-input" placeholder="Status" value="${currentSlot.STATUS}">
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        preConfirm: () => {
          const location = document.getElementById("location").value;
          const floor = document.getElementById("floor").value;
          const section = document.getElementById("section").value;
          const slot_number = document.getElementById("slot_number").value;
          const status = document.getElementById("status").value;
          return { location, floor, section, slot_number, status };
        },
      });

      if (result.isConfirmed) {
        await axios.put(
          `http://localhost:3000/parking_slot/${slotId}`,
          result.value
        );
        Swal.fire("Success", "Parking slot updated successfully!", "success");
        setParkingSlots((prev) =>
          prev.map((slot) =>
            slot.SLOT_ID === slotId ? { ...slot, ...result.value } : slot
          )
        );
      }
    } catch (error) {
      console.error("Error updating parking slot:", error);
      Swal.fire("Error", "Failed to update parking slot.", "error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Admin Management */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Admin Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => updateAdmin(admin.ADMIN_ID, admin)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteAdmin(admin.ADMIN_ID)}
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

      {/* Parking Slot Management */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Parking Slot Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Floor</th>
              <th className="border border-gray-300 px-4 py-2">Section</th>
              <th className="border border-gray-300 px-4 py-2">Slot Number</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parkingSlots.map((slot) => (
              <tr key={slot.SLOT_ID}>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.LOCATION}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.FLOOR}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.SECTION}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.SLOT_NUMBER}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.STATUS}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => updateParkingSlot(slot.SLOT_ID, slot)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteParkingSlot(slot.SLOT_ID)}
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
