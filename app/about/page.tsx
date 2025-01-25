import Link from "next/link";

export default function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("s1.jpeg")' }}
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

      {/* About Content */}
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-black bg-opacity-50 px-6">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          We are dedicated to providing a seamless car parking experience for
          all users. Our system ensures optimal space allocation, real-time
          updates, and secure parking solutions. Whether you're a customer
          looking for a parking spot or a parking lot owner managing multiple
          spaces, our platform has the tools you need.
        </p>
      </div>
    </div>
  );
}
