import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactUs() {
  const [contactData, setContactData] = useState(null);

  // Fetch contact data from the API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact/getAll");
        if (response.data && response.data.length > 0) {
          setContactData(response.data[0]); // Assuming only one contact section exists
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, []);

  // Render loading state if data is not yet available
  if (!contactData) {
    return <div>Loading...</div>;
  }

  const { header, addresses, phones, fax } = contactData;

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="relative h-64 bg-gray-900 text-white">
          <img
            src={`http://localhost:5000/${header.image.replace("\\", "/")}`} // Header image URL
            alt="Contact Background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold">{header.title}</h1>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Google Map Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509423!2d-74.40806258468268!3d40.59833027934498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzgnMzYnMjQuMSJOIDc0wrAyNCcyOS4xIlc!5e0!3m2!1sen!2sus!4v1692033745798!5m2!1sen!2sus"
              title="Google Map"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Image Section with Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
            {/* Address Section */}
            <div>
              <img
                src="https://softstandard.com/wp-content/uploads/2016/05/icon1.jpg"
                alt="Address"
                className="mx-auto w-20 h-20"
              />
              <h3 className="text-lg font-semibold mt-2">Address</h3>
              <div className="mt-4 text-left">
                {addresses.map((address, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-bold">{address.title}:</h4>
                    <p>{address.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Section */}
            <div>
              <img
                src="https://softstandard.com/wp-content/uploads/2016/05/icon2.jpg"
                alt="Phone"
                className="mx-auto w-20 h-20"
              />
              <h3 className="text-lg font-semibold mt-2">Phone</h3>
              <div className="mt-4 text-left">
                {phones.map((phone, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-bold">{phone.title}:</h4>
                    <p>{phone.number}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fax Section */}
            <div>
              <img
                src="https://softstandard.com/wp-content/uploads/2016/05/icon3.jpg"
                alt="Fax"
                className="mx-auto w-20 h-20"
              />
              <h3 className="text-lg font-semibold mt-2">Fax</h3>
              <div className="mt-4 text-left">
                <h4 className="font-bold">Fax:</h4>
                <p>{fax}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name (required)"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
              <input
                type="email"
                placeholder="Email (required)"
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Website"
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <textarea
              placeholder="Comment..."
              className="border border-gray-300 rounded-lg p-2 w-full h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-600 transition"
            >
              SUBMIT FORM
            </button>
          </form>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[#00BFB3] text-white text-center py-8">
        <p className="text-lg font-medium max-w-4xl mx-auto">
          Theplacify demonstrates its commitment to quality and cost, not
          just by <span className="font-bold italic">“words”</span>, but by
          actions and results.
        </p>
      </div>
    </>
  );
}

export default ContactUs;
