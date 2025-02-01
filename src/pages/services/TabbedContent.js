import React from 'react';

const TabbedContent = ({ tabs }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tabs.map((tab, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={`http://localhost:5000/${tab.image}`}
                            alt={tab.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">{tab.title}</h3>
                            <p className="mt-4 text-gray-600">{tab.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabbedContent;
