import React, { useState, useEffect } from "react";
import axios from "axios";

function Career() {
  const [careerData, setCareerData] = useState(null); // State to hold career data
  const API_URL = "http://localhost:5000/api/carears/getAll";

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await axios.get(API_URL);
        setCareerData(response.data[0]); // Assuming the first object is relevant
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    };

    fetchCareerData();
  }, []);

  if (!careerData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="relative h-64 bg-gray-900 text-white">
          <img
            src={`http://localhost:5000/${careerData.headerImage.replace("\\", "/")}`}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold">{careerData.title.replace(/"/g, "")}</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          {careerData.sections.map((section, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10"
            >
              {/* Left Image */}
              <div>
                <img
                  src={`http://localhost:5000/${section.image.replace("\\", "/")}`}
                  alt={section.title}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Right Text */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                <p className="text-gray-700 mt-4">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Current Job Openings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerData.jobs.map((job, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg bg-white p-4 shadow-md hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.category}</p>
                <p className="text-sm text-gray-500">{job.type}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <p className="text-sm text-gray-500">{job.salary}</p>
                <a
                  href="#"
                  className="text-teal-500 mt-2 block hover:underline"
                >
                  More Details →
                </a>
              </div>
            ))}
          </div>
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

export default Career;
