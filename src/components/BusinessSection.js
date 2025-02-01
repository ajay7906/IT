import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BusinessSection() {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessSection = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/businessSection/getAll');
        setSection(response.data[0]); // Assuming there's only one section returned
        setLoading(false);
      } catch (err) {
        console.error('Error fetching business section:', err);
        setError('Failed to fetch business section');
        setLoading(false);
      }
    };

    fetchBusinessSection();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  const { title, description, skillsHeading, skillsLeft, skillsRight } = section;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h2 className="text-3xl font-bold mb-6 ml-5">{title}</h2>
        <div className="max-w-4xl space-y-6 ml-5">
          {description.map((para, index) => (
            <p key={index} className="text-gray-600 leading-relaxed">{para}</p>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 ml-5">{skillsHeading}</h3>
          <div className="flex flex-wrap">
            {/* Left Skills */}
            <div className="w-full sm:w-1/2 lg:w-1/2 px-4">
              <ul className="list-none space-y-3 ml-5">
                {skillsLeft.map((skill, index) => (
                  <li key={index} className="text-[#00BFB3] text-sm hover:underline">
                    » {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Skills */}
            <div className="w-full sm:w-1/2 lg:w-1/2 px-4">
              <ul className="list-none space-y-3 ml-5">
                {skillsRight.map((skill, index) => (
                  <li key={index} className="text-[#00BFB3] text-sm hover:underline">
                    » {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessSection;
