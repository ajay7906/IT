import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TabSection() {
  const [tabsData, setTabsData] = useState([]); // To store tabs data from API
  const [activeTab, setActiveTab] = useState(null); // Active tab
  const API_URL = 'http://localhost:5000/api/products/tabGetAll'; // Backend API endpoint

  // Fetch tabs data from the API
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get(API_URL);

        if (response.data.length > 0) {
          setTabsData(response.data[0].tabs); // Assuming the first object has the tabs
          setActiveTab(response.data[0].tabs[0]); // Set the first tab as active
        }
      } catch (error) {
        console.error('Error fetching tabs data:', error);
      }
    };

    fetchTabs();
  }, []);

  // Render loading state until data is fetched
  if (!tabsData.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-start space-x-4 border-b-2 border-[#00BFB3] mb-8">
          {tabsData.map((tab) => (
            <button
              key={tab._id}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab && activeTab._id === tab._id
                  ? 'bg-[#00BFB3] text-white border-[#00BFB3]'
                  : 'text-gray-600 hover:bg-gray-100 border-transparent'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab && (
          <div className="flex flex-wrap lg:flex-nowrap gap-6">
            {/* Left Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={`http://localhost:5000/${activeTab.image.replace('\\', '/')}`} // Convert backslashes to forward slashes
                alt={activeTab.title}
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold">{activeTab.title}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {activeTab.description}
              </p>
              <button className="text-[#00BFB3] hover:text-[#008F86] font-medium">
                READ MORE →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TabSection;
