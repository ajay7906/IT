import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';

function Header() {
  const [headerData, setHeaderData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/headers/getAll');
        if (response.data && response.data.length > 0) {
          setHeaderData(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };

    fetchHeaderData();
  }, []);

  if (!headerData) {
    return (
      <header className="w-full relative z-50">
        <div className="bg-[#00BFB3] text-white py-2 text-center">
          <span>Loading...</span>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full relative z-50">
      {/* Top Bar */}
      <div className="bg-[#00BFB3] text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <span className="text-sm font-light">Toll Free: {headerData.tollFree || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-light">Follow us :</span>
            <div className="flex gap-2">
              <a
                href={headerData.socialLinks.facebook || '#'}
                className="opacity-90 hover:opacity-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={16} className="hover:text-gray-300" />
              </a>
              <a
                href={headerData.socialLinks.twitter || '#'}
                className="opacity-90 hover:opacity-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={16} className="hover:text-gray-300" />
              </a>
              <a
                href={headerData.socialLinks.linkedin || '#'}
                className="opacity-90 hover:opacity-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={16} className="hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={`http://localhost:5000${headerData.logo || '/default-logo.png'}`}
              alt="Logo"
              width="60"
              height="60"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex gap-8">
            <Link to="/" className="text-gray-600 hover:text-[#00BFB3]">
              Home
            </Link>
            <Link to="/about-us" className="text-gray-600 hover:text-[#00BFB3]">
              About us
            </Link>

            {/* Static Dropdown for Services */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-600 hover:text-[#00BFB3] focus:outline-none"
              >
                Services
              </button>
              {dropdownOpen && (
                <div className="absolute top-full mt-1 w-48 bg-white shadow-md rounded-md z-50">
                  <Link
                    to="/application-services"
                    className="block px-4 py-2 text-gray-600 hover:text-[#00BFB3] hover:bg-gray-100"
                  >
                    Application Services
                  </Link>
                  <Link
                    to="/business-services"
                    className="block px-4 py-2 text-gray-600 hover:text-[#00BFB3] hover:bg-gray-100"
                  >
                    Business Services
                  </Link>
                  <Link
                    to="/technology-trainings"
                    className="block px-4 py-2 text-gray-600 hover:text-[#00BFB3] hover:bg-gray-100"
                  >
                    Technology Trainings
                  </Link>
                  <Link
                    to="/globalStaffing"
                    className="block px-4 py-2 text-gray-600 hover:text-[#00BFB3] hover:bg-gray-100"
                  >
                    Global Staffing
                  </Link>
                  <Link
                    to="/staffAugmentation"
                    className="block px-4 py-2 text-gray-600 hover:text-[#00BFB3] hover:bg-gray-100"
                  >
                    Staff Augmentation
                  </Link>
                </div>
              )}
            </div>

            <Link to="/products" className="text-gray-600 hover:text-[#00BFB3]">
              Products
            </Link>
            <Link to="/career" className="text-gray-600 hover:text-[#00BFB3]">
              Career
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-[#00BFB3]">
              Blog
            </Link>
            <Link to="/contact-us" className="text-gray-600 hover:text-[#00BFB3]">
              Contact us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
