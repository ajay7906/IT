import React from 'react';

function FeatureCard({ title, description, bgImage }) {
  return (
    <div
      className="relative bg-black text-white rounded-lg overflow-hidden shadow-md flex flex-col justify-between h-full"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
      }}
    >
      {/* Content Section */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>

      {/* Read More Section */}
      <div className="p-4 border-t border-gray-600">
        <button className="text-[#00BFB3] hover:text-[#008F86] font-medium text-sm">
          READ MORE →
        </button>
      </div>
    </div>
  );
}

export default FeatureCard;
