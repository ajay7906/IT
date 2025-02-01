import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeaturesSection() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/features/getAllFeatures');
        setFeatures(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to fetch features');
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature._id}
            title={feature.title}
            description={feature.description}
            bgImage={`http://localhost:5000${feature.bgImage}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, description, bgImage }) {
  return (
    <div
      className="relative bg-cover bg-center text-white rounded-md shadow-md overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: '200px', // Adjust the card height
      }}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="text-xs">{description}</p>
        </div>
        <div className="mt-auto">
          <button className="text-xs font-bold text-[#00BFB3] hover:text-[#008F86]">
            READ MORE &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
