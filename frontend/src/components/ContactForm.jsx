import { useState } from "react";
import axios from "axios";
import contactImage from "../assets/imgg/contactus.png";
import { axiosInstance } from "../lib/axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/connections/", formData);
      console.log("✅ Message sent:", response.data);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white  py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Contact Image */}
        <div className="flex justify-center">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full max-w-[550px] h-auto object-contain"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full text-base">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Get In Touch</h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-[#1CA59A]"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-[#1CA59A]"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-[#1CA59A]"
          />

          <button
            type="submit"
            className="bg-[#269092] text-white px-6 py-2 rounded hover:bg-[#16897A]"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm mt-2">Your message has been sent!</p>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
