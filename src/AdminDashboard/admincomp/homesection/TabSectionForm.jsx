import React, { useState, useEffect } from 'react';

const TabSectionForm = () => {
  const [tabs, setTabs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    heading: '',
    description: '',
    image: null
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchTabs();
  }, []);

  const fetchTabs = async () => {
    try {
      const response = await fetch('/api/tabs/getAll');
      const data = await response.json();
      setTabs(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching tabs' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('heading', formData.heading);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (editingId) {
        await fetch(`/api/tabs/update${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Tab updated successfully' });
      } else {
        await fetch('/api/tabs/addTab', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Tab created successfully' });
      }
      
      setFormData({
        title: '',
        heading: '',
        description: '',
        image: null
      });
      setPreviewUrl(null);
      setEditingId(null);
      fetchTabs();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving tab' });
    }
  };

  const handleEdit = (tab) => {
    setEditingId(tab._id);
    setFormData({
      title: tab.title,
      heading: tab.heading,
      description: tab.description,
      image: null
    });
    setPreviewUrl(tab.image);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tabs/delete${id}`, {
        method: 'DELETE',
      });
      setMessage({ type: 'success', text: 'Tab deleted successfully' });
      fetchTabs();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting tab' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? 'Edit Tab' : 'Create New Tab'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-auto object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {editingId ? 'Update Tab' : 'Create Tab'}
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

      {/* Tabs List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Tabs</h3>
        {tabs.map((tab) => (
          <div key={tab._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-grow">
                <div>
                  <h4 className="text-lg font-medium">{tab.title}</h4>
                  <p className="text-gray-600 font-medium">{tab.heading}</p>
                  <p className="text-gray-600 mt-2">{tab.description}</p>
                </div>
                {tab.image && (
                  <img
                    src={tab.image}
                    alt={tab.title}
                    className="h-32 w-auto object-cover rounded-md"
                  />
                )}
              </div>
              <div className="ml-4 space-x-2">
                <button
                  onClick={() => handleEdit(tab)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tab._id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSectionForm;