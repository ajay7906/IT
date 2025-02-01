import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [bannerData, setBannerData] = useState(null); // State to hold banner data
  const API_URL = 'http://localhost:5000/api/banner/getAll'; // Backend API endpoint

  // Fetch banner data from the API
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data && response.data.length > 0) {
          setBannerData(response.data[0]); // Use the first banner in the array
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBanner();
  }, []);

  // Render a loading state until data is fetched
  if (!bannerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Banner Section */}
      <section
        className="relative h-64 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url('http://localhost:5000/${bannerData.backgroundImage.replace(
            '\\',
            '/'
          )}')`, // Use the dynamic background image
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text Content */}
        <div className="relative z-10 text-white px-4 w-full text-center">
          <h1 className="text-3xl font-bold">{bannerData.title.replace(/"/g, '')}</h1>
        </div>
      </section>

      {/* About Us Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap gap-8">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={`http://localhost:5000/${bannerData.backgroundImage.replace(
                '\\',
                '/'
              )}`} // Use the same background image for featured image
              alt="About Us"
              className="rounded-lg shadow-md w-full h-80"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">{bannerData.subTitle.replace(/"/g, '')}</h2>
            <p className="text-[#00BFB3] font-medium">{bannerData.description.replace(/"/g, '')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
