import React, { useState, useEffect } from 'react';

const ApplicationServicesForm = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    header: {
      title: '',
      subtitle: '',
      description: '',
      image: null
    },
    content: {
      title: '',
      description: '',
      secondaryImage: null
    },
    tabs: [
      { title: '', description: '', image: null }
    ]
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services/application/getAll');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching services' });
    }
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value
      }
    }));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value
      }
    }));
  };

  const handleTabChange = (index, field, value) => {
    setFormData(prev => {
      const newTabs = [...prev.tabs];
      newTabs[index] = {
        ...newTabs[index],
        [field]: value
      };
      return { ...prev, tabs: newTabs };
    });
  };

  const addTab = () => {
    setFormData(prev => ({
      ...prev,
      tabs: [...prev.tabs, { title: '', description: '', image: null }]
    }));
  };

  const removeTab = (index) => {
    setFormData(prev => ({
      ...prev,
      tabs: prev.tabs.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e, type, index = null) => {
    const file = e.target.files[0];
    if (type === 'header') {
      setFormData(prev => ({
        ...prev,
        header: { ...prev.header, image: file }
      }));
    } else if (type === 'secondary') {
      setFormData(prev => ({
        ...prev,
        content: { ...prev.content, secondaryImage: file }
      }));
    } else if (type === 'tab') {
      setFormData(prev => {
        const newTabs = [...prev.tabs];
        newTabs[index] = { ...newTabs[index], image: file };
        return { ...prev, tabs: newTabs };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Add header data
    formDataToSend.append('header', JSON.stringify({
      title: formData.header.title,
      subtitle: formData.header.subtitle,
      description: formData.header.description
    }));
    if (formData.header.image) {
      formDataToSend.append('headerImage', formData.header.image);
    }

    // Add content data
    formDataToSend.append('content', JSON.stringify({
      title: formData.content.title,
      description: formData.content.description
    }));
    if (formData.content.secondaryImage) {
      formDataToSend.append('secondaryImage', formData.content.secondaryImage);
    }

    // Add tabs data
    formData.tabs.forEach((tab, index) => {
      if (tab.image) {
        formDataToSend.append('tabImages', tab.image);
      }
    });
    formDataToSend.append('tabs', JSON.stringify(formData.tabs.map(tab => ({
      title: tab.title,
      description: tab.description
    }))));

    try {
      if (editingId) {
        await fetch(`/api/services/application/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Service updated successfully' });
      } else {
        await fetch('/api/services/application/add', {
          method: 'POST',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Service created successfully' });
      }
      
      setFormData({
        header: { title: '', subtitle: '', description: '', image: null },
        content: { title: '', description: '', secondaryImage: null },
        tabs: [{ title: '', description: '', image: null }]
      });
      setEditingId(null);
      fetchServices();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving service' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? 'Edit Application Service' : 'Create Application Service'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">Header Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.header.title}
                  onChange={handleHeaderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.header.subtitle}
                  onChange={handleHeaderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.header.description}
                  onChange={handleHeaderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Image
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, 'header')}
                  accept="image/*"
                  className="w-full"
                  required={!editingId}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">Content Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.content.title}
                  onChange={handleContentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.content.description}
                  onChange={handleContentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Image
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, 'secondary')}
                  accept="image/*"
                  className="w-full"
                  required={!editingId}
                />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Tabs</h3>
              <button
                type="button"
                onClick={addTab}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Tab
              </button>
            </div>
            
            {formData.tabs.map((tab, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Tab {index + 1}</h4>
                  {formData.tabs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTab(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={tab.title}
                      onChange={(e) => handleTabChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={tab.description}
                      onChange={(e) => handleTabChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tab Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, 'tab', index)}
                      accept="image/*"
                      className="w-full"
                      required={!editingId}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingId ? 'Update Service' : 'Create Service'}
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
    </div>
  );
};

export default ApplicationServicesForm;