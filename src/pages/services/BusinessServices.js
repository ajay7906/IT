import React, { useEffect, useState } from 'react';

const BusinessServices = () => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchBusinessData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/application/business/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBusinessData(data[0]); // Assuming the API returns an array with one object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Prepend the server URL to image paths
  const headerImageUrl = `http://localhost:5000/${businessData.header.image.replace(/\\/g, '/')}`;
  const contentImageUrl = `http://localhost:5000/${businessData.content.image.replace(/\\/g, '/')}`;

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-64 bg-gray-200">
          <img
            src={headerImageUrl} // Corrected dynamic header image URL
            alt={businessData.header.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold">{businessData.header.title}</h1>
          </div>
        </div>
        <div className="p-6 md:flex">
          <div className="md:w-1/3">
            <img
              src={contentImageUrl} // Corrected dynamic content image URL
              alt={businessData.content.title}
              className="rounded-md shadow-md mb-4 md:mb-0"
            />
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h2 className="text-2xl font-bold text-gray-800">{businessData.content.title}</h2>
            <p className="mt-4 text-gray-600">
              <strong>Theplacify Solutions</strong> is a leading consulting in Business services.
            </p>
            <p className="mt-4 text-gray-600">{businessData.content.description}</p>
            <ul className="mt-4 text-gray-600 list-disc list-inside">
              {businessData.features.map((feature, index) => (
                <li key={index}>{feature}</li> // Render dynamic features
              ))}
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

export default BusinessServices;
