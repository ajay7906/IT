import React, { useEffect, useState } from 'react';
import TabbedContent from './TabbedContent';

const TechnologyTrainings = () => {
  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/application/technology/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTrainingData(data[0]); // Assuming the API returns an array with one object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-64 bg-gray-200">
          <img
            src={`http://localhost:5000/${trainingData.header.image}`}
            alt={trainingData.header.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold">{trainingData.header.title}</h1>
          </div>
        </div>
        <div className="p-6 md:flex">
          <div className="md:w-1/3">
            <img
              src={`http://localhost:5000/${trainingData.content.image}`}
              alt={trainingData.content.title}
              className="rounded-md shadow-md mb-4 md:mb-0"
            />
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h2 className="text-2xl font-bold text-gray-800">{trainingData.content.title}</h2>
            <p className="mt-4 text-gray-600">{trainingData.content.description}</p>
            <h3 className="mt-6 text-lg font-semibold text-gray-800">Training Highlights</h3>
            <ul className="mt-4 text-gray-600 list-disc list-inside">
              <li>We have state-of-the-art training centers in various locations.</li>
              <li>Our Trainers are best in the industry with vast experience.</li>
              <li>Extensive course material provided to all trainees.</li>
              <li>Placement Assistance for students and professionals.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[#00BFB3] text-white text-center py-8">
        <p className="text-lg font-medium max-w-4xl mx-auto">
          Theplacify demonstrates its commitment to quality and cost, not just by{' '}
          <span className="font-bold italic">“words”</span>, but by actions and results.
        </p>
      </div>
    </>
  );
};

export default TechnologyTrainings;
