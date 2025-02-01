import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import NavbarForm from './Shared/Navbar';
import FooterForm from './Shared/FooterForm'; // Adjust the path if needed
import AboutUsForm from './admincomp/aboutus/AboutForm';
import BannerForm from './admincomp/aboutus/BannerForm';
import ApplicationServicesForm from './admincomp/services/ApplicationServicesForm';

function AdminDashboard() {
  const [view, setView] = useState('dashboard'); // Manage the current view

  const handleViewChange = (viewName) => {
    setView(viewName); // Update view based on the clicked menu
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar onNavigate={handleViewChange} />
      <div className="flex-1 flex flex-col">
        <Navbar username="Admin" />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="py-12 sm:px-6 lg:px-8">
            {view === 'dashboard' && (
              <div id="dashboard" className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                  Welcome, Admin!
                </h2>
              </div>
            )}

            {view === 'navbar' && (
              <div id="navbar" className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <NavbarForm /> {/* Render Navbar form component here */}
              </div>
            )}
            {view === 'footer' && (
              <div id="footer" className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <FooterForm /> {/* Render Navbar form component here */}
              </div>
            )}
            {view === 'aboutUs/mission' && (
              <div className="flex-1 p-8">
                <AboutUsForm />
              </div>
            )}
            {view === 'aboutUs/vision' && (
              <div className="flex-1 p-8">
                <BannerForm />
              </div>
            )}
            {view === 'services/application' && (
              <div className="flex-1 p-8">
                <ApplicationServicesForm/>
              </div>
            )}

            {/* You can add other views here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
