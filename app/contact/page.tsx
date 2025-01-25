"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS configuration: replace these placeholders with actual credentials
    emailjs
      .sendForm(
        "service_p2ifpic", // Replace with your EmailJS Service ID
        "template_fi3p1tk", // Replace with your EmailJS Template ID
        e.target, // Form data (automatically takes values from form inputs)
        "e0BkME0-a_SVd9ae6" // Replace with your EmailJS User ID (API Key)
      )
      .then(
        (result) => {
          setIsSubmitting(false);
          setResponseMessage("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Clear form
        },
        (error) => {
          setIsSubmitting(false);
          setResponseMessage("There was an error sending your message.");
          console.error(error.text);
        }
      );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("s2.jpg")' }}
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

      {/* Contact Form */}
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-black bg-opacity-50 px-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Have any questions or feedback? We'd love to hear from you! Fill out
          the form below or reach out to us through our contact details.
        </p>

        {/* Contact Form */}
        <form
          className="mt-8 space-y-4 max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <div className="mt-4 text-lg text-white">{responseMessage}</div>
        )}
      </div>
    </div>
  );
}
