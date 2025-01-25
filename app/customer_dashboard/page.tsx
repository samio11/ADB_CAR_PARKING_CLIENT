"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CustomerDashboard() {
  const [customerData, setCustomerData] = useState({});
  const [reservations, setReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch customer details
    const fetchCustomerDetails = async () => {
      try {
        const customerId = 1; // Replace this with the logged-in customer ID dynamically
        const customerResponse = await axios.get(
          `http://localhost:3000/customers/${customerId}`
        );
        setCustomerData(customerResponse.data);

        // Fetch reservations for the customer
        const reservationResponse = await axios.get(
          `http://localhost:3000/reservations/${customerId}`
        );
        setReservations(reservationResponse.data);

        // Fetch vehicles for the customer
        const vehicleResponse = await axios.get(
          `http://localhost:3000/vehicles/${customerId}`
        );
        setVehicles(vehicleResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomerDetails();
  }, []);
  console.log(reservations);
  // Add New Reservation
  const addReservation = async (reservation) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/reservations",
        reservation
      );
      Swal.fire("Success", "Reservation added successfully!", "success");
      setReservations([...reservations, response.data]);
    } catch (error) {
      console.error("Error adding reservation:", error);
      Swal.fire("Error", "Failed to add reservation.", "error");
    }
  };

  // Update Reservation
  const updateReservation = async (reservationId, updatedReservation) => {
    try {
      await axios.put(
        `http://localhost:3000/reservations/${reservationId}`,
        updatedReservation
      );
      Swal.fire("Success", "Reservation updated successfully!", "success");
      setReservations((prev) =>
        prev.map((r) =>
          r.reservation_id === reservationId
            ? { ...r, ...updatedReservation }
            : r
        )
      );
    } catch (error) {
      console.error("Error updating reservation:", error);
      Swal.fire("Error", "Failed to update reservation.", "error");
    }
  };

  // Delete Reservation
  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:3000/reservations/${reservationId}`);
      Swal.fire("Success", "Reservation deleted successfully!", "success");
      setReservations((prev) =>
        prev.filter((r) => r.reservation_id !== reservationId)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
      Swal.fire("Error", "Failed to delete reservation.", "error");
    }
  };

  // Add New Vehicle
  const addVehicle = async (vehicle) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/vehicles",
        vehicle
      );
      Swal.fire("Success", "Vehicle added successfully!", "success");
      setVehicles([...vehicles, response.data]);
    } catch (error) {
      console.error("Error adding vehicle:", error);
      Swal.fire("Error", "Failed to add vehicle.", "error");
    }
  };

  // Update Vehicle
  const updateVehicle = async (vehicleId, updatedVehicle) => {
    try {
      await axios.put(
        `http://localhost:3000/vehicles/${vehicleId}`,
        updatedVehicle
      );
      Swal.fire("Success", "Vehicle updated successfully!", "success");
      setVehicles((prev) =>
        prev.map((v) =>
          v.vehicle_id === vehicleId ? { ...v, ...updatedVehicle } : v
        )
      );
    } catch (error) {
      console.error("Error updating vehicle:", error);
      Swal.fire("Error", "Failed to update vehicle.", "error");
    }
  };

  // Delete Vehicle
  const deleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:3000/vehicles/${vehicleId}`);
      Swal.fire("Success", "Vehicle deleted successfully!", "success");
      setVehicles((prev) => prev.filter((v) => v.vehicle_id !== vehicleId));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      Swal.fire("Error", "Failed to delete vehicle.", "error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Customer Dashboard
      </h1>

      {/* Customer Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <p>
          <strong>Name:</strong> {customerData.first_name}{" "}
          {customerData.last_name}
        </p>
        <p>
          <strong>Email:</strong> {customerData.email}
        </p>
        <p>
          <strong>Phone:</strong> {customerData.phone_number}
        </p>
        <p>
          <strong>Address:</strong> {customerData.address}
        </p>
      </div>

      {/* Reservations */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Reservations</h2>
        {reservations.map((reservation) => (
          <div key={reservation.reservation_id} className="mb-4">
            <p>
              <strong>Reservation ID:</strong> {reservation.reservation_id}
            </p>
            <p>
              <strong>Date:</strong> {reservation.reservation_date}
            </p>
            <p>
              <strong>Start Time:</strong> {reservation.start_time}
            </p>
            <p>
              <strong>End Time:</strong> {reservation.end_time}
            </p>
            <p>
              <strong>Parking Slot:</strong> {reservation.slot_number}
            </p>
            <button
              onClick={() => deleteReservation(reservation.reservation_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Vehicles */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
        {vehicles.map((vehicle) => (
          <div key={vehicle.vehicle_id} className="mb-4">
            <p>
              <strong>Vehicle ID:</strong> {vehicle.vehicle_id}
            </p>
            <p>
              <strong>License Plate:</strong> {vehicle.license_plate}
            </p>
            <p>
              <strong>Model:</strong> {vehicle.model}
            </p>
            <p>
              <strong>Color:</strong> {vehicle.color}
            </p>
            <button onClick={() => deleteVehicle(vehicle.vehicle_id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
