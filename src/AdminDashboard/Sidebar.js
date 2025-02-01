import React, { useState } from 'react';
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  ReadOutlined,
  PhoneOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const Sidebar = ({ onNavigate }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="w-64 bg-[#00BFB3] text-black flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-yellow-700">
        Dashboard
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        {/* Home */}
        <div>
          <button
            onClick={() => toggleDropdown('home')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <HomeOutlined className="mr-3 text-lg" />
            Home
          </button>
          {activeDropdown === 'home' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('home/sub1')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Sub Home 1
              </button>
              <button
                onClick={() => onNavigate('home/sub2')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Sub Home 2
              </button>
            </div>
          )}
        </div>

        {/* About Us */}
        <div>
          <button
            onClick={() => toggleDropdown('aboutUs')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <InfoCircleOutlined className="mr-3 text-lg" />
            About Us
          </button>
          {activeDropdown === 'aboutUs' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('aboutUs/mission')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Mission
              </button>
              <button
                onClick={() => onNavigate('aboutUs/vision')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Vision
              </button>
            </div>
          )}
        </div>

        {/* Services */}
        <div>
          <button
            onClick={() => toggleDropdown('services')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <AppstoreOutlined className="mr-3 text-lg" />
            Services
          </button>
          {activeDropdown === 'services' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('services/application')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Application Services
              </button>
              <button
                onClick={() => onNavigate('services/consulting')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Consulting
              </button>
            </div>
          )}
        </div>

        {/* Products */}
        <div>
          <button
            onClick={() => toggleDropdown('products')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <ShoppingCartOutlined className="mr-3 text-lg" />
            Products
          </button>
          {activeDropdown === 'products' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('products/new')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                New Products
              </button>
              <button
                onClick={() => onNavigate('products/popular')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Popular Products
              </button>
            </div>
          )}
        </div>

        {/* Career */}
        <div>
          <button
            onClick={() => toggleDropdown('career')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <SolutionOutlined className="mr-3 text-lg" />
            Career
          </button>
          {activeDropdown === 'career' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('career/jobs')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Job 
              </button>
              <button
                onClick={() => onNavigate('career/internships')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Internships
              </button>
            </div>
          )}
        </div>

        {/* Blog */}
        <div>
          <button
            onClick={() => toggleDropdown('blog')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <ReadOutlined className="mr-3 text-lg" />
            Blog
          </button>
          {activeDropdown === 'blog' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('blog/latest')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Latest Posts
              </button>
              <button
                onClick={() => onNavigate('blog/trending')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Trending Posts
              </button>
            </div>
          )}
        </div>

        {/* Contact Us */}
        <div>
          <button
            onClick={() => toggleDropdown('contactUs')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <PhoneOutlined className="mr-3 text-lg" />
            Contact Us
          </button>
          {activeDropdown === 'contactUs' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('contactUs/email')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Email Us
              </button>
              <button
                onClick={() => onNavigate('contactUs/call')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Call Us
              </button>
            </div>
          )}
        </div>

        {/* Shared */}
        <div>
          <button
            onClick={() => toggleDropdown('shared')}
            className="flex items-center py-2 px-4 rounded hover:bg-yellow-400 w-full text-left"
          >
            <ShareAltOutlined className="mr-3 text-lg" />
            Shared
          </button>
          {activeDropdown === 'shared' && (
            <div className="pl-8">
              <button
                onClick={() => onNavigate('navbar')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Navbar
              </button>
              <button
                onClick={() => onNavigate('footer')}
                className="block py-1 px-2 hover:text-yellow-700"
              >
                Footer
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
