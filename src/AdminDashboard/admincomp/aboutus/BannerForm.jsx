import React, { useState, useEffect } from 'react';

const BannerForm = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    backgroundImage: null
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banner/getAll');
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching banners' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'backgroundImage' && files) {
      setFormData(prev => ({ ...prev, backgroundImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subTitle', formData.subTitle);
    formDataToSend.append('description', formData.description);
    if (formData.backgroundImage) {
      formDataToSend.append('backgroundImage', formData.backgroundImage);
    }

    try {
      if (editingId) {
        await fetch(`/api/banner/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Banner updated successfully' });
      } else {
        await fetch('/api/banner/add', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Banner created successfully' });
      }
      
      setFormData({ title: '', subTitle: '', description: '', backgroundImage: null });
      setEditingId(null);
      fetchBanners();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving banner' });
    }
  };

  const handleEdit = (banner) => {
    setFormData({
      title: banner.title,
      subTitle: banner.subTitle,
      description: banner.description,
      backgroundImage: null
    });
    setEditingId(banner._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await fetch(`/api/banner/delete/${id}`, {
          method: 'DELETE',
        });
        setMessage({ type: 'success', text: 'Banner deleted successfully' });
        fetchBanners();
      } catch (error) {
        setMessage({ type: 'error', text: 'Error deleting banner' });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Banner' : 'Create New Banner'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Image
            </label>
            <input
              type="file"
              name="backgroundImage"
              onChange={handleInputChange}
              accept="image/*"
              required={!editingId}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Banner' : 'Create Banner'}
          </button>
        </form>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'error' 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          <p>{message.text}</p>
        </div>
      )}

      {/* Banners List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Banners</h2>
        <div className="space-y-4">
          {banners.map((banner) => (
            <div 
              key={banner._id} 
              className="p-4 border border-gray-200 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-medium">{banner.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{banner.subTitle}</p>
                <p className="text-sm text-gray-500 mt-1">{banner.description}</p>
                {banner.backgroundImage && (
                  <img
                    src={banner.backgroundImage}
                    alt={banner.title}
                    className="mt-2 h-32 w-full object-cover rounded"
                  />
                )}
              </div>
              <div className="ml-4 space-x-2 flex-shrink-0">
                <button 
                  onClick={() => handleEdit(banner)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(banner._id)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerForm;