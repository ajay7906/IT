import React, { useEffect, useState } from 'react';
import TabbedContent from './TabbedContent';
import axios from 'axios';

const ApplicationServices = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/application/application/getAll');
                if (response.data.length > 0) {
                    setData(response.data[0]); // Assuming single data entry for application services
                }
            } catch (error) {
                console.error('Error fetching application services data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available for Application Services.</div>;
    }

    const { header, content, tabs } = data;

    return (
        <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="relative h-64 bg-gray-200">
                    <img
                        src={`http://localhost:5000/${header.image}`}
                        alt={header.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h1 className="text-white text-3xl md:text-5xl font-bold">{header.title}</h1>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={`http://localhost:5000/${content.secondaryImage}`}
                            alt={content.title}
                            className="rounded-md shadow-md mb-4 md:mb-0"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-6">
                        <h2 className="text-2xl font-bold text-gray-800">{content.title}</h2>
                        <p className="mt-4 text-gray-600">{content.description}</p>
                    </div>
                </div>
            </div>

            {/* Tabbed Content */}
            <TabbedContent tabs={tabs} />

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
};

export default ApplicationServices;
