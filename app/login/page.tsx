"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        role,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: response.data.message,
          confirmButtonText: "Go to Dashboard",
        }).then(() => {
          // Redirect to role-specific dashboard
          switch (role) {
            case "Admin":
              router.push("/admin_dashboard");
              break;
            case "Customer":
              router.push("/customer_dashboard");
              break;
            case "Developer":
              router.push("/developer_dashboard");
              break;
            case "Account Manager":
              router.push("/account_manager_dashboard");
              break;
            default:
              router.push("/"); // Default fallback route
          }
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : "Something went wrong. Please try again later.";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              <option value="Developer">Developer</option>
              <option value="Account Manager">Account Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            onClick={() => router.push("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
}
