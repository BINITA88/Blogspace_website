import { useState } from "react";
import contactImage from "../assets/imgg/image.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-white py-12 border-t border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Contact Image */}
        <div className="flex justify-center">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full max-w-md h-auto object-contain" // image max width about 320px (md = 28rem)
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full text-base"> 
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h2>

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
            className="bg-[#1CA59A] text-white px-6 py-2 rounded hover:bg-[#16897A]"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm mt-2">Your message has been sent!</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
