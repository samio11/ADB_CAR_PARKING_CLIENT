import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://www.carpro.com/hs-fs/hubfs/2023-Chevrolet-Corvette-Z06-credit-chevrolet.jpeg?width=1020&name=2023-Chevrolet-Corvette-Z06-credit-chevrolet.jpeg")',
      }}
    >
      {/* Navbar */}
      <nav className="bg-black bg-opacity-50 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Car Parking Management
        </h1>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold">
          Welcome to Our Car Parking Management System
        </h1>
        <p className="mt-4 text-lg">
          Efficient, convenient, and secure parking management.
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/login">
            <button className="btn btn-active btn-neutral">Login</button>
          </Link>
          <Link href="/register">
            <button className="btn btn-active btn-neutral">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
